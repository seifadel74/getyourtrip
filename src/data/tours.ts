import { Tour } from '../types/tour';

const tours: Tour[] = [
  {
    id: 100,
    title: 'Four Seasons Resort Sharm El Sheikh',
    location: 'Sharm El Sheikh, Egypt',
    duration: '7',
    price: 450,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    type: 'luxury',
    groupSize: 'Private',
    description: 'Luxurious beachfront resort with private beaches, world-class diving, and stunning Red Sea views.',
    highlights: [
      'Private beach access',
      'Multiple swimming pools',
      'Fine dining restaurants',
      'Kids club',
      'World-class spa'
    ],
    included: [
      'Luxury suite with sea view',
      'All-inclusive premium package',
      'Airport transfers',
      'Diving center access',
      'Daily activities'
    ]
  },
  {
    id: 101,
    title: 'The Ritz-Carlton, Sharm El Sheikh',
    location: 'Sharm El Sheikh, Egypt',
    duration: '7',
    price: 520,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    type: 'luxury',
    groupSize: 'Private',
    description: 'Elegant resort offering private beaches, a luxury spa, and multiple dining options with Red Sea views.',
    highlights: [
      'Infinity pools',
      'Marina view',
      'Luxury spa',
      'Water sports center',
      'Fine dining restaurants'
    ],
    included: [
      'Luxury room with balcony',
      'Half board',
      'Beach access',
      'Fitness center',
      'Kids activities'
    ]
  },
  {
    id: 102,
    title: 'Hilton Marsa Alam Nubian Resort',
    location: 'Marsa Alam, Egypt',
    duration: '7',
    price: 380,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1520250497591-112f5d3f1e31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    type: 'beach',
    groupSize: 'Private',
    description: 'Luxury resort with a private beach, multiple pools, and access to exceptional diving sites.',
    highlights: [
      'Private beach',
      'Dolphin house reef',
      'Multiple pools',
      'Water sports',
      'Diving center'
    ],
    included: [
      'Deluxe room',
      'All-inclusive',
      'Diving center access',
      'Kids club',
      'Evening entertainment'
    ]
  },
  {
    id: 103,
    title: 'The Oberoi Beach Resort, Sahl Hasheesh',
    location: 'Hurghada, Egypt',
    duration: '7',
    price: 680,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2d5f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    type: 'luxury',
    groupSize: 'Private',
    description: 'Ultra-luxury resort offering private pools, butler service, and pristine beaches on the Red Sea.',
    highlights: [
      'Private pools',
      'Luxury spa',
      'Fine dining',
      'Exclusive beach',
      'Butler service'
    ],
    included: [
      'Private pool villa',
      'Full board',
      'Butler service',
      'Airport transfers',
      'Premium amenities'
    ]
  },
  {
    id: 104,
    title: 'Stella Di Mare Beach Hotel & Spa',
    location: 'Hurghada, Egypt',
    duration: '7',
    price: 410,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    type: 'luxury',
    groupSize: 'Private',
    description: '5-star luxury resort with a private marina, diving center, and extensive spa facilities.',
    highlights: [
      'Private marina',
      'Luxury spa',
      'Multiple restaurants',
      'Water sports',
      'Private beach'
    ],
    included: [
      'Luxury room with sea view',
      'Half board',
      'Spa access',
      'Private beach',
      'Fitness center'
    ]
  },
  {
    id: 1,
    title: 'Luxury Red Sea Cruise',
    location: 'Hurghada',
    duration: '7',
    price: 899,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1552733407-9d000c897dd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    featured: true,
    type: 'cruise',
    groupSize: 'Small Group',
    description: 'Experience the ultimate luxury cruise on the Red Sea with stunning views and world-class service.',
    highlights: [
      'Private beach access',
      'All-inclusive meals and drinks',
      'Snorkeling and diving trips',
      'Sunset dinners on deck'
    ],
    included: [
      '7 nights accommodation',
      'All meals and drinks',
      'Airport transfers',
      'Guided tours',
      'Water sports equipment'
    ]
  },
  {
    id: 2,
    title: 'Pyramids & Nile Cruise',
    location: 'Cairo & Luxor',
    duration: '5',
    price: 749,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1503177119279-aa258b946e0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    featured: true,
    type: 'cultural',
    groupSize: 'Small Group',
    description: 'Discover the ancient wonders of Egypt with a luxury Nile cruise and guided tours of the pyramids.',
    highlights: [
      'Guided tour of the Giza Pyramids',
      'Nile River cruise',
      'Luxor Temple visit',
      'Valley of the Kings'
    ],
    included: [
      '5 nights accommodation',
      'Breakfast and dinner',
      'Entrance fees',
      'Professional guide',
      'All transportation'
    ]
  },
  {
    id: 3,
    title: 'Desert Safari Adventure',
    location: 'Sahara Desert',
    duration: '3',
    price: 499,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    featured: false,
    type: 'adventure',
    groupSize: 'Private',
    description: 'An unforgettable adventure in the heart of the Sahara Desert with overnight camping under the stars.',
    highlights: [
      'Desert safari by 4x4',
      'Camel riding',
      'Traditional Bedouin dinner',
      'Overnight desert camping'
    ],
    included: [
      '2 nights camping',
      'All meals',
      'Transportation',
      'Camping equipment',
      'Guide'
    ]
  },
  {
    id: 4,
    title: 'Red Sea Diving Experience',
    location: 'Sharm El Sheikh',
    duration: '4',
    price: 649,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    featured: false,
    type: 'diving',
    groupSize: 'Small Group',
    description: 'Explore the stunning underwater world of the Red Sea with professional diving instructors.',
    highlights: [
      'Daily diving trips',
      'Coral reef exploration',
      'Underwater photography',
      'Marine life spotting'
    ],
    included: [
      '3 nights accommodation',
      'Breakfast and lunch',
      'Diving equipment',
      'Certified instructor',
      'Dive insurance'
    ]
  }
];

export default tours;
