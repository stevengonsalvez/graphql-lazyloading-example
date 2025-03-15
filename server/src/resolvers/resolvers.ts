import { 
  currentUserMock, 
  topTasksMock, 
  promotionsMock, 
  categoriesMock, 
  discoverItemsMock, 
  userDevicesMock,
  delay
} from '../mocks/data';

export const resolvers = {
  Query: {
    // Get current user information
    currentUser: async () => {
      return currentUserMock;
    },
    
    // Get top tasks
    topTasks: async () => {
      // Simulate a 300ms delay for the initial data
      await delay(300);
      return topTasksMock;
    },
    
    // Get promotional content
    promotions: async () => {
      // Simulate a 500ms delay for promotions
      await delay(500);
      return promotionsMock;
    },
    
    // Get product categories
    categories: async () => {
      // Simulate a 400ms delay for categories
      await delay(400);
      return categoriesMock;
    },
    
    // Get discover items
    discoverItems: async () => {
      // Simulate a 1.5s delay for discover items
      await delay(1500);
      return discoverItemsMock;
    },
    
    // Get user devices
    userDevices: async () => {
      // Simulate a 2s delay for user devices
      await delay(2000);
      return userDevicesMock;
    },
    
    // Search functionality
    search: async (_: any, { query }: { query: string }) => {
      // Simulate a search operation
      await delay(800);
      return {
        devices: query ? userDevicesMock.filter(d => 
          d.name.toLowerCase().includes(query.toLowerCase())
        ) : [],
        plans: query ? 
          categoriesMock
            .find(c => c.name === 'SIMs')?.products
            .filter(p => p.name.toLowerCase().includes(query.toLowerCase())) || [] 
          : [],
        accessories: query ? 
          categoriesMock
            .find(c => c.name === 'Tech')?.products
            .filter(p => p.name.toLowerCase().includes(query.toLowerCase())) || [] 
          : [],
        helpArticles: []
      };
    }
  },
  
  User: {
    // Deferred loading of recommendations
    recommendations: async () => {
      // Simulate a longer delay for recommendations
      await delay(5000);
      return currentUserMock.recommendations;
    },
    // Account updates with streaming
    accountUpdates: async function* () {
      for (const update of currentUserMock.accountUpdates) {
        await delay(500); // Simulate delay between items
        yield update;
      }
    }
  },
  
  BillInformation: {
    // Deferred loading of bill history
    historyDetails: async () => {
      // Simulate a delay for bill history
      await delay(3500);
      return currentUserMock.billInformation.historyDetails;
    }
  },
  
  Promotion: {
    // Deferred loading of promotion details
    details: async (parent: any) => {
      // Simulate a delay for promotion details
      await delay(1200);
      return parent.details;
    }
  },
  
  PromotionDetails: {
    // Stream benefits
    benefits: async function* (parent: any) {
      for (const benefit of parent.benefits) {
        await delay(350); // Simulate delay between benefits
        yield benefit;
      }
    }
  },
  
  Category: {
    // Stream products in categories
    products: async function* (parent: any) {
      for (const product of parent.products) {
        await delay(600); // Simulate delay between products
        yield product;
      }
    }
  },
  
  Product: {
    // Deferred loading of product details
    details: async (parent: any) => {
      // Simulate a delay for product details
      await delay(4200);
      return parent.details;
    }
  },
  
  ProductDetails: {
    // Stream specifications
    specifications: async function* (parent: any) {
      for (const spec of parent.specifications) {
        await delay(250); // Simulate delay between specs
        yield spec;
      }
    },
    // Stream reviews
    reviews: async function* (parent: any) {
      for (const review of parent.reviews) {
        await delay(700); // Simulate delay between reviews
        yield review;
      }
    },
    // Stream related products
    relatedProducts: async function* (parent: any) {
      for (const product of parent.relatedProducts) {
        await delay(450); // Simulate delay between related products
        yield product;
      }
    }
  },
  
  DiscoverItem: {
    // Deferred loading of additional info
    additionalInfo: async (parent: any) => {
      // Simulate a delay for additional info
      await delay(2800);
      return parent.additionalInfo;
    }
  },
  
  Device: {
    // Deferred loading of device technical details
    technicalDetails: async (parent: any) => {
      // Simulate a delay for technical details
      await delay(6000);
      return parent.technicalDetails;
    }
  },
  
  DeviceDetails: {
    // Stream support options
    supportOptions: async function* (parent: any) {
      for (const option of parent.supportOptions) {
        await delay(400); // Simulate delay between support options
        yield option;
      }
    }
  },
  
  SearchResults: {
    // Stream devices in search results
    devices: async function* (parent: any) {
      for (const device of parent.devices) {
        await delay(300); // Simulate delay between devices
        yield device;
      }
    },
    // Stream plans in search results
    plans: async function* (parent: any) {
      for (const plan of parent.plans) {
        await delay(550); // Simulate delay between plans
        yield plan;
      }
    },
    // Stream accessories in search results
    accessories: async function* (parent: any) {
      for (const accessory of parent.accessories) {
        await delay(400); // Simulate delay between accessories
        yield accessory;
      }
    },
    // Stream help articles in search results
    helpArticles: async function* (parent: any) {
      for (const article of parent.helpArticles) {
        await delay(500); // Simulate delay between help articles
        yield article;
      }
    }
  }
};
