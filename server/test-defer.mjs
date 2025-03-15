import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const query = fs.readFileSync(path.join(__dirname, 'test-defer.graphql'), 'utf8');

async function testDefer() {
  try {
    console.log('Testing @defer directive with GraphQL Yoga...');
    console.log('Query:', query);
    
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'multipart/mixed; deferSpec=20220824, application/json',
      },
      body: JSON.stringify({
        query,
        operationName: 'TestDefer',
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response type:', response.headers.get('content-type'));
    
    if (response.headers.get('content-type')?.includes('multipart')) {
      console.log('Multipart response detected - incremental delivery is working!');
      
      // Process the multipart response
      const body = await response.text();
      console.log('Response body (first 500 chars):', body.slice(0, 500));
      
      // Split by boundary
      const boundary = response.headers.get('content-type')?.split('boundary=')[1];
      if (boundary) {
        const parts = body.split(`--${boundary}`).filter(part => part.trim() !== '' && !part.includes('--'));
        
        console.log(`Found ${parts.length} parts in the response`);
        
        // Process each part
        parts.forEach((part, i) => {
          const jsonStartIndex = part.indexOf('{');
          if (jsonStartIndex !== -1) {
            try {
              const jsonData = JSON.parse(part.slice(jsonStartIndex));
              console.log(`Part ${i + 1}:`, JSON.stringify(jsonData, null, 2).slice(0, 200) + '...');
            } catch (e) {
              console.error(`Error parsing part ${i + 1}:`, e);
            }
          }
        });
      }
    } else {
      // Regular JSON response
      const data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2));
      console.log('IMPORTANT: No incremental delivery - @defer is not working!');
    }
  } catch (error) {
    console.error('Error testing @defer:', error);
  }
}

testDefer(); 