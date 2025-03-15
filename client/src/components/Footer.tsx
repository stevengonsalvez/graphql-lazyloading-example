import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gray-700 font-bold mb-3">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Contact us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Find a store</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Coverage checker</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">EE Community</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Orders and returns</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Track in</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-700 font-bold mb-3">Our websites & apps</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Small business</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Large business</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">BT Group</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Download the EE app</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-700 font-bold mb-3">Digital Security</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Privacy and sustainability</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Digital accessibility</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">EE Gender Pay gap</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Scam awareness</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-700 font-bold mb-3">Our company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">About us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Students and key workers</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Newsroom</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-ee-teal">Here for you - Supporting your needs</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-gray-500 mb-4 md:mb-0">
            © 2025 EE LIMITED
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-xs text-gray-500 hover:text-ee-teal">Terms and conditions</a>
            <a href="#" className="text-xs text-gray-500 hover:text-ee-teal">Privacy notice</a>
            <a href="#" className="text-xs text-gray-500 hover:text-ee-teal">Cookie settings</a>
            <a href="#" className="text-xs text-gray-500 hover:text-ee-teal">Cookie options</a>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-ee-teal">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-ee-teal">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-ee-teal">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
