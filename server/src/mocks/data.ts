// Mock data generators for our GraphQL server

// Helper function to log and delay
export const delay = async (ms: number) => {
  console.log(`Delaying response for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Current user mock data
export const currentUserMock = {
  id: '1',
  name: 'STEVEN',
  phoneNumber: '07732 502 509',
  loyaltyPoints: 245,
  accountUpdates: [
    {
      id: '1',
      type: 'info',
      message: 'Check changes to see your phone renewal and ensure you\'re set up to date',
      date: '2025-03-10',
      isRead: false
    },
    {
      id: '2',
      type: 'alert',
      message: 'Your bill is ready to view',
      date: '2025-03-01',
      isRead: true
    },
    {
      id: '3',
      type: 'promo',
      message: 'Upgrade eligible: Check out our latest deals',
      date: '2025-02-25',
      isRead: false
    }
  ],
  billInformation: {
    amount: 40.83,
    dueDate: '2025-03-28',
    isPaid: true,
    unlimitedData: true,
    historyDetails: [
      { date: '2025-02-28', amount: 40.83, status: 'Paid' },
      { date: '2025-01-28', amount: 40.83, status: 'Paid' },
      { date: '2024-12-28', amount: 38.99, status: 'Paid' },
      { date: '2024-11-28', amount: 38.99, status: 'Paid' }
    ]
  },
  recommendations: [
    {
      id: '1',
      title: 'Smart watch offers',
      description: 'Check out the latest smartwatch offers for your plan',
      imageUrl: '/watches.jpg',
      actionUrl: '/offers/smartwatches'
    },
    {
      id: '2',
      title: 'Home broadband deals',
      description: 'Exclusive discounts for mobile customers',
      imageUrl: '/broadband.jpg',
      actionUrl: '/broadband/deals'
    },
    {
      id: '3',
      title: 'Device protection',
      description: 'Protect your device against damage and theft',
      imageUrl: '/protection.jpg',
      actionUrl: '/services/device-protection'
    }
  ]
};

// Top tasks
export const topTasksMock = [
  {
    id: '1',
    title: 'Latest bill',
    description: 'View your latest bill',
    actionUrl: '/bill',
    iconType: 'bill'
  },
  {
    id: '2',
    title: 'Roam on 4G',
    description: 'Check your roaming status and options',
    actionUrl: '/roaming',
    iconType: 'roaming'
  },
  {
    id: '3',
    title: 'View your phone',
    description: 'Check details about your device',
    actionUrl: '/device',
    iconType: 'phone'
  },
  {
    id: '4',
    title: 'Data usage',
    description: 'Monitor your data consumption',
    actionUrl: '/data-usage',
    iconType: 'data'
  }
];

// Promotions
export const promotionsMock = [
  {
    id: '1',
    title: 'Upgrade to the Galaxy S25 Series',
    description: 'Get up to £450 when you trade in your device at our retail store',
    imageUrl: '/samsung-s25.jpg',
    actionUrl: '/upgrade/galaxy-s25',
    details: {
      termsAndConditions: 'Terms and conditions apply. Trade-in value depends on device condition.',
      validUntil: '2025-04-30',
      eligibility: 'Available for customers with eligible devices',
      benefits: [
        'Fast delivery options',
        'Expert setup assistance',
        'Free accessories worth £50',
        '24-month warranty'
      ]
    }
  },
  {
    id: '2',
    title: 'Time for something new?',
    description: 'Don\'t wait until your SIM-only plan ends, get a shiny new device now',
    imageUrl: '/new-device.jpg',
    actionUrl: '/upgrade/devices',
    details: {
      termsAndConditions: 'Early upgrade fees may apply. Subject to credit check.',
      validUntil: '2025-05-15',
      eligibility: 'Available for SIM-only customers',
      benefits: [
        'Choose from the latest devices',
        'Flexible payment options',
        'Keep your current number',
        'Free next-day delivery'
      ]
    }
  },
  {
    id: '3',
    title: 'Add 25GB SIM for £12',
    description: 'Get our extra 25GB SIM to put in your 2nd device for just £12 a month',
    imageUrl: '/25gb-sim.jpg',
    actionUrl: '/sim-only/25gb',
    details: {
      termsAndConditions: '12-month minimum contract. Standard rates apply after promotional period.',
      validUntil: '2025-04-10',
      eligibility: 'Available for existing customers only',
      benefits: [
        '5G ready',
        'Unlimited texts and calls',
        'EU roaming included',
        'Add to your existing bill'
      ]
    }
  },
  {
    id: '4',
    title: 'Introducing the new iPhone',
    description: 'iPhone 15 is here! See Apple\'s latest tech in action with free AirPods when you buy',
    imageUrl: '/iphone15.jpg',
    actionUrl: '/iphone15',
    details: {
      termsAndConditions: 'Free AirPods offer valid while stocks last. 24-month contract required.',
      validUntil: '2025-04-30',
      eligibility: 'Available for new and upgrading customers',
      benefits: [
        'Choose from all colors',
        'Trade in your old device',
        'Expert setup in-store',
        'Extended AppleCare available'
      ]
    }
  }
];

// Product categories
export const categoriesMock = [
  {
    id: '1',
    name: 'Gaming',
    iconUrl: '/icons/gaming.png',
    products: [
      {
        id: '101',
        name: 'PlayStation 5',
        description: 'Next-gen gaming console',
        imageUrl: '/products/ps5.jpg',
        price: 499.99,
        details: {
          specifications: [
            { name: 'CPU', value: 'AMD Zen 2' },
            { name: 'GPU', value: 'AMD RDNA 2' },
            { name: 'Storage', value: '825GB SSD' },
            { name: 'Resolution', value: 'Up to 8K' }
          ],
          reviews: [
            { id: '1001', author: 'GameFan84', rating: 5, comment: 'Amazing performance!', date: '2025-02-15' },
            { id: '1002', author: 'TechGuru', rating: 4, comment: 'Great but expensive', date: '2025-01-20' }
          ],
          relatedProducts: []
        }
      },
      {
        id: '102',
        name: 'Xbox Series X',
        description: 'Microsoft\'s powerful gaming console',
        imageUrl: '/products/xbox.jpg',
        price: 479.99,
        details: {
          specifications: [
            { name: 'CPU', value: 'AMD Zen 2' },
            { name: 'GPU', value: 'AMD RDNA 2' },
            { name: 'Storage', value: '1TB SSD' },
            { name: 'Resolution', value: 'Up to 8K' }
          ],
          reviews: [
            { id: '1003', author: 'XboxFan', rating: 5, comment: 'Best Xbox ever!', date: '2025-02-18' }
          ],
          relatedProducts: []
        }
      }
    ]
  },
  {
    id: '2',
    name: 'Tech',
    iconUrl: '/icons/tech.png',
    products: [
      {
        id: '201',
        name: 'MacBook Pro M4',
        description: 'Apple\'s latest professional laptop',
        imageUrl: '/products/macbook.jpg',
        price: 1999.99,
        details: {
          specifications: [
            { name: 'CPU', value: 'Apple M4' },
            { name: 'RAM', value: '16GB' },
            { name: 'Storage', value: '512GB SSD' },
            { name: 'Display', value: '14-inch Liquid Retina XDR' }
          ],
          reviews: [
            { id: '2001', author: 'AppleFan', rating: 5, comment: 'Revolutionary performance!', date: '2025-03-01' }
          ],
          relatedProducts: []
        }
      },
      {
        id: '202',
        name: 'iPad Pro',
        description: 'Professional tablet from Apple',
        imageUrl: '/products/ipad.jpg',
        price: 999.99,
        details: {
          specifications: [
            { name: 'CPU', value: 'Apple M2' },
            { name: 'RAM', value: '8GB' },
            { name: 'Storage', value: '256GB' },
            { name: 'Display', value: '12.9-inch Liquid Retina XDR' }
          ],
          reviews: [
            { id: '2002', author: 'TabletPro', rating: 4, comment: 'Great for artists', date: '2025-02-25' }
          ],
          relatedProducts: []
        }
      }
    ]
  },
  {
    id: '3',
    name: 'Broadband',
    iconUrl: '/icons/broadband.png',
    products: [
      {
        id: '301',
        name: 'Fiber Broadband 100Mbps',
        description: 'High-speed internet for home',
        imageUrl: '/products/broadband.jpg',
        price: 29.99,
        details: {
          specifications: [
            { name: 'Speed', value: '100Mbps' },
            { name: 'Contract', value: '18 months' },
            { name: 'Setup Fee', value: '£20' },
            { name: 'Router', value: 'Included' }
          ],
          reviews: [
            { id: '3001', author: 'FastSurfer', rating: 4, comment: 'Reliable connection', date: '2025-02-10' }
          ],
          relatedProducts: []
        }
      },
      {
        id: '302',
        name: 'Fiber Broadband 500Mbps',
        description: 'Ultra-fast internet for heavy users',
        imageUrl: '/products/broadband-ultra.jpg',
        price: 49.99,
        details: {
          specifications: [
            { name: 'Speed', value: '500Mbps' },
            { name: 'Contract', value: '18 months' },
            { name: 'Setup Fee', value: '£10' },
            { name: 'Router', value: 'Advanced Router Included' }
          ],
          reviews: [
            { id: '3002', author: 'GamerGirl', rating: 5, comment: 'Perfect for streaming and gaming', date: '2025-02-22' }
          ],
          relatedProducts: []
        }
      }
    ]
  },
  {
    id: '4',
    name: 'Security',
    iconUrl: '/icons/security.png',
    products: [
      {
        id: '401',
        name: 'Device Protection',
        description: 'Insurance for your devices',
        imageUrl: '/products/insurance.jpg',
        price: 9.99,
        details: {
          specifications: [
            { name: 'Coverage', value: 'Accidental damage & theft' },
            { name: 'Excess', value: '£50' },
            { name: 'Claims', value: 'Up to 2 per year' },
            { name: 'Contract', value: 'Monthly rolling' }
          ],
          reviews: [
            { id: '4001', author: 'CarefulUser', rating: 5, comment: 'Saved me when I dropped my phone!', date: '2025-01-15' }
          ],
          relatedProducts: []
        }
      },
      {
        id: '402',
        name: 'Norton 360',
        description: 'Complete digital protection',
        imageUrl: '/products/norton.jpg',
        price: 19.99,
        details: {
          specifications: [
            { name: 'Devices', value: 'Up to 5' },
            { name: 'Features', value: 'Antivirus, VPN, Password Manager' },
            { name: 'Cloud Backup', value: '50GB included' },
            { name: 'Contract', value: '12 months' }
          ],
          reviews: [
            { id: '4002', author: 'SecurityExpert', rating: 4, comment: 'Comprehensive protection', date: '2025-02-05' }
          ],
          relatedProducts: []
        }
      }
    ]
  },
  {
    id: '5',
    name: 'Mobile',
    iconUrl: '/icons/mobile.png',
    products: [
      {
        id: '501',
        name: 'iPhone 15 Pro',
        description: 'Apple\'s latest flagship smartphone',
        imageUrl: '/products/iphone15.jpg',
        price: 999.99,
        details: {
          specifications: [
            { name: 'Display', value: '6.1-inch Super Retina XDR' },
            { name: 'Processor', value: 'A17 Pro chip' },
            { name: 'Camera', value: 'Triple 48MP system' },
            { name: 'Storage', value: '128GB' }
          ],
          reviews: [
            { id: '5001', author: 'iPhoneLover', rating: 5, comment: 'Best iPhone yet!', date: '2025-03-05' }
          ],
          relatedProducts: []
        }
      },
      {
        id: '502',
        name: 'Samsung Galaxy S25 Ultra',
        description: 'Samsung\'s premium smartphone',
        imageUrl: '/products/galaxy-s25.jpg',
        price: 1199.99,
        details: {
          specifications: [
            { name: 'Display', value: '6.8-inch Dynamic AMOLED 2X' },
            { name: 'Processor', value: 'Snapdragon 8 Gen 3' },
            { name: 'Camera', value: 'Quad 200MP system' },
            { name: 'Storage', value: '256GB' }
          ],
          reviews: [
            { id: '5002', author: 'AndroidFan', rating: 5, comment: 'Amazing camera system!', date: '2025-03-10' }
          ],
          relatedProducts: []
        }
      }
    ]
  },
  {
    id: '6',
    name: 'SIMs',
    iconUrl: '/icons/sim.png',
    products: [
      {
        id: '601',
        name: '5GB SIM Only',
        description: 'Essential data plan',
        imageUrl: '/products/sim.jpg',
        price: 7.99,
        details: {
          specifications: [
            { name: 'Data', value: '5GB' },
            { name: 'Calls', value: 'Unlimited' },
            { name: 'Texts', value: 'Unlimited' },
            { name: 'Contract', value: '12 months' }
          ],
          reviews: [
            { id: '6001', author: 'BasicUser', rating: 4, comment: 'Perfect for my needs', date: '2025-02-28' }
          ],
          relatedProducts: []
        }
      },
      {
        id: '602',
        name: '25GB SIM Only',
        description: 'Premium data plan',
        imageUrl: '/products/25gb-sim.jpg',
        price: 12.00,
        details: {
          specifications: [
            { name: 'Data', value: '25GB' },
            { name: 'Calls', value: 'Unlimited' },
            { name: 'Texts', value: 'Unlimited' },
            { name: 'Contract', value: '12 months' }
          ],
          reviews: [
            { id: '6002', author: 'DataUser', rating: 5, comment: 'Great value for the data amount', date: '2025-03-01' }
          ],
          relatedProducts: []
        }
      }
    ]
  }
];

// Discover items
export const discoverItemsMock = [
  {
    id: '1',
    title: 'Samsung OLED Smart TV bundle with TNT Sports',
    description: 'Unlimited entertainment for just £75/month',
    imageUrl: '/discover/tv-bundle.jpg',
    price: 75.00,
    actionUrl: '/tv/samsung-bundle',
    type: 'TV',
    additionalInfo: 'Includes full HD TNT Sports channels, Netflix, and Disney+ for 24 months.'
  },
  {
    id: '2',
    title: 'Dime beats studio',
    description: 'Save £100 on Beats Studio Pro, now £199 down from £299',
    imageUrl: '/discover/beats.jpg',
    price: 199.00,
    actionUrl: '/accessories/beats',
    type: 'Audio',
    additionalInfo: 'Premium sound quality with noise cancellation and up to 40 hours of battery life.'
  },
  {
    id: '3',
    title: 'Save £50 on Ray-Ban Meta Wayfarer Glasses',
    description: 'A perfect blend of iconic design and cutting edge tech, from £299',
    imageUrl: '/discover/rayban.jpg',
    price: 299.00,
    actionUrl: '/accessories/rayban',
    type: 'Wearable',
    additionalInfo: 'Smart glasses with built-in camera and speakers for an immersive experience.'
  },
  {
    id: '4',
    title: 'Why pay more for that new phone?',
    description: 'Refurbished phones from £125',
    imageUrl: '/discover/refurbished.jpg',
    price: 125.00,
    actionUrl: '/phones/refurbished',
    type: 'Phone',
    additionalInfo: 'All refurbished phones come with a 12-month warranty and are thoroughly tested.'
  }
];

// User devices
export const userDevicesMock = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    type: 'Smartphone',
    imageUrl: '/devices/iphone14.jpg',
    technicalDetails: {
      serialNumber: 'IMEI: 355423987654321',
      model: 'A2650',
      purchaseDate: '2024-05-15',
      warrantyEnd: '2026-05-15',
      supportOptions: [
        'Software updates',
        'Technical support',
        'Apple Care+',
        'Trade-in options'
      ]
    }
  },
  {
    id: '2',
    name: 'iPad Air',
    type: 'Tablet',
    imageUrl: '/devices/ipad-air.jpg',
    technicalDetails: {
      serialNumber: 'SN: C6KTP9A7PLCY',
      model: 'A2588',
      purchaseDate: '2023-11-20',
      warrantyEnd: '2025-11-20',
      supportOptions: [
        'Software updates',
        'Technical support',
        'Screen repair',
        'Battery replacement'
      ]
    }
  }
];
