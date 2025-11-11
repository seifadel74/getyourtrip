import { Tour } from '../types/tour';

const allTours: Tour[] = [
  // Existing tours (1-12)
  {
    id: 1,
    title: 'Orange Bay Island',
    location: 'Red Sea, Egypt',
    duration: '8 hours',
    price: 43.80,
    rating: 4.5,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/orange-bay-island-hurghada.jpg',
    featured: true,
    type: 'island',
    groupSize: 'Small Group',
    description: 'Join us for an unforgettable experience that includes hassle-free hotel transfers, a yacht sailing adventure, and snorkeling at two stunning Red Sea spots. Enjoy a delectable open buffet lunch on the boat and relax on Orange Bay Island\'s enchanting white sandy beach for 2 hours.',
    highlights: [
      'Look out over stunning turquoise waters and marvel at the beauty of the Red Sea',
      'Explore the Reef and the tropical fish that live there while snorkeling',
      'Enjoy the sunset views from the deck of the boat',
      'Relax on the beautiful white sandy beach',
      'Enjoy a delicious open buffet lunch on board'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Transportation by air-conditioned vehicle',
      'Lunch and non-alcoholic drinks on board',
      'Life jacket and safety equipment',
      'Two stops for snorkeling',
      'Snorkeling guide',
      'Entry fees',
      'Spend about two hours on the beach',
      'A stop for water sports'
    ]
  },
  {
    id: 2,
    title: 'Paradise Island',
    location: 'Red Sea, Egypt',
    duration: '8 hours',
    price: 45.00,
    rating: 4.6,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/paradise-island-hurghada.jpg',
    featured: true,
    type: 'island',
    groupSize: 'Small Group',
    description: 'Experience the beauty of Paradise Island with its crystal-clear waters and white sandy beaches. Enjoy snorkeling, swimming, and relaxing under the sun.',
    highlights: [
      'Snorkeling in the crystal-clear waters of the Red Sea',
      'Relax on the beautiful white sandy beach',
      'Enjoy a delicious open buffet lunch on board',
      'Explore the vibrant marine life',
      'Comfortable transportation to and from your hotel'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Boat trip to Paradise Island',
      'Snorkeling equipment',
      'Lunch and soft drinks',
      'Beach umbrella and sunbeds',
      'Professional guide'
    ]
  },
  {
    id: 3,
    title: 'Safari Adventure in Hurghada',
    location: 'Hurghada Desert, Egypt',
    duration: '6 hours',
    price: 35.00,
    rating: 4.7,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/safari-adventure-hurghada.jpg',
    featured: true,
    type: 'adventure',
    groupSize: 'Small Group',
    description: 'Experience the thrill of a desert safari with quad biking, camel riding, and a traditional Bedouin dinner under the stars.',
    highlights: [
      'Quad biking in the desert',
      'Camel riding experience',
      'Traditional Bedouin dinner',
      'Sunset views in the desert',
      'Traditional entertainment show'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Quad bike for 30 minutes',
      'Camel ride',
      'Traditional Bedouin dinner',
      'Mineral water and soft drinks',
      'Professional guide'
    ]
  },
  {
    id: 4,
    title: 'Hula Hula Island',
    location: 'Red Sea, Egypt',
    duration: '8 hours',
    price: 42.50,
    rating: 4.6,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/hula-hula-island-hurghada.jpg',
    featured: true,
    type: 'island',
    groupSize: 'Small Group',
    description: 'Discover the hidden gem of the Red Sea with Tito Tours on an unforgettable trip to Hula Hula Island. Enjoy a day of relaxation and adventure on this tropical paradise, often referred to as the "Egyptian Maldives".',
    highlights: [
      'Swim in crystal-clear waters',
      'Explore vibrant coral reefs',
      'Relax on pristine white sandy beaches',
      'Enjoy a delicious buffet lunch on board',
      'Experience the beauty of the Egyptian Maldives'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Transportation by air-conditioned vehicle',
      'Lunch and non-alcoholic drinks on board',
      'Life jacket and safety equipment',
      'Two stops for snorkeling',
      'Snorkeling guide',
      'Entry fees',
      'Beach time (about 2 hours)',
      'Water sports activities'
    ]
  },
  {
    id: 5,
    title: 'Dolphin House Snorkeling',
    location: 'Red Sea, Egypt',
    duration: '6 hours',
    price: 38.00,
    rating: 4.8,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/dolphin-house-hurghada.jpg',
    featured: true,
    type: 'snorkeling',
    groupSize: 'Small Group',
    description: 'Swim with dolphins in their natural habitat at Dolphin House, one of the best snorkeling spots in the Red Sea. Enjoy the crystal-clear waters and vibrant marine life.',
    highlights: [
      'Swim with dolphins in their natural environment',
      'Explore colorful coral reefs',
      'See a variety of tropical fish',
      'Enjoy a delicious lunch on board',
      'Professional guides and safety equipment provided'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Boat trip to Dolphin House',
      'Snorkeling equipment',
      'Lunch and soft drinks',
      'Life jacket',
      'Professional guide',
      'All safety equipment'
    ]
  },
  {
    id: 6,
    title: 'Luxury Sunset Cruise',
    location: 'Hurghada, Egypt',
    duration: '4 hours',
    price: 55.00,
    rating: 4.9,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/sunset-cruise-hurghada.jpg',
    featured: true,
    type: 'cruise',
    groupSize: 'Small Group',
    description: 'Experience a magical evening on a luxury sunset cruise along the Red Sea coast. Enjoy breathtaking views, delicious dinner, and live entertainment.',
    highlights: [
      'Stunning sunset views over the Red Sea',
      'Gourmet dinner with international cuisine',
      'Live music and entertainment',
      'Unlimited soft drinks',
      'Romantic atmosphere'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Welcome drink',
      'Gourmet dinner',
      'Unlimited soft drinks',
      'Live entertainment',
      'Professional crew',
      'All taxes and service charges'
    ]
  },
  // Additional tours (7-20)
  {
    id: 7,
    title: 'Eden Island',
    location: 'Red Sea, Egypt',
    duration: '8 hours',
    price: 45.00,
    rating: 4.7,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/eden-island-hurghada.jpg',
    featured: true,
    type: 'island',
    groupSize: 'Small Group',
    description: 'Escape to the pristine beauty of Eden Island, a tropical paradise with crystal-clear waters and white sandy beaches. Perfect for snorkeling, swimming, and relaxation.',
    highlights: [
      'Snorkeling in crystal-clear waters',
      'Relax on white sandy beaches',
      'Buffet lunch on board',
      'Explore vibrant coral reefs',
      'Comfortable boat transfer'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Boat trip to Eden Island',
      'Snorkeling equipment',
      'Buffet lunch and soft drinks',
      'Beach umbrella and sunbeds',
      'Professional guide',
      'All entrance fees'
    ]
  },
  {
    id: 8,
    title: 'Magawish Island',
    location: 'Red Sea, Egypt',
    duration: '8 hours',
    price: 44.00,
    rating: 4.6,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/magawish-island-hurghada.jpg',
    featured: true,
    type: 'island',
    groupSize: 'Small Group',
    description: 'Discover the unspoiled beauty of Magawish Island, known for its pristine beaches and excellent snorkeling spots. A perfect day trip for nature lovers and beach enthusiasts.',
    highlights: [
      'Snorkeling in crystal-clear waters',
      'Relax on unspoiled beaches',
      'Buffet lunch on board',
      'Explore colorful marine life',
      'Comfortable boat transfer'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Boat trip to Magawish Island',
      'Snorkeling equipment',
      'Buffet lunch and soft drinks',
      'Beach umbrella and sunbeds',
      'Professional guide',
      'All entrance fees'
    ]
  },
  {
    id: 9,
    title: 'Mahmya Island',
    location: 'Red Sea, Egypt',
    duration: '8 hours',
    price: 48.00,
    rating: 4.8,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/mahmya-island-hurghada.jpg',
    featured: true,
    type: 'island',
    groupSize: 'Small Group',
    description: 'Experience the beauty of Mahmya Island, a protected natural reserve with pristine beaches and excellent snorkeling opportunities in the Red Sea.',
    highlights: [
      'Snorkeling in protected waters',
      'Relax on pristine beaches',
      'Buffet lunch on board',
      'Explore diverse marine life',
      'Comfortable boat transfer'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Boat trip to Mahmya Island',
      'Snorkeling equipment',
      'Buffet lunch and soft drinks',
      'Beach umbrella and sunbeds',
      'Professional guide',
      'All entrance fees',
      'Conservation fee'
    ]
  },
  {
    id: 10,
    title: 'Abo Dabab Snorkeling',
    location: 'Marsa Alam, Egypt',
    duration: '8 hours',
    price: 42.00,
    rating: 4.7,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/abo-dabab-hurghada.jpg',
    featured: false,
    type: 'snorkeling',
    groupSize: 'Small Group',
    description: 'Explore the rich marine life of Abo Dabab, home to sea turtles and dugongs. A perfect spot for snorkeling and swimming in the Red Sea.',
    highlights: [
      'Swim with sea turtles',
      'Chance to see dugongs',
      'Colorful coral reefs',
      'Buffet lunch',
      'Comfortable transfer'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Transportation',
      'Snorkeling equipment',
      'Buffet lunch',
      'Mineral water',
      'Professional guide',
      'All entrance fees'
    ]
  },
  {
    id: 11,
    title: 'Sharm El Naga',
    location: 'Safaga, Egypt',
    duration: '8 hours',
    price: 40.00,
    rating: 4.5,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/sharm-el-naga-hurghada.jpg',
    featured: false,
    type: 'snorkeling',
    groupSize: 'Small Group',
    description: 'Discover the beautiful bay of Sharm El Naga, known for its crystal-clear waters and vibrant coral reefs. Perfect for snorkeling and relaxation.',
    highlights: [
      'Excellent snorkeling spots',
      'Crystal-clear waters',
      'Vibrant coral reefs',
      'Beach relaxation',
      'Buffet lunch'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Transportation',
      'Snorkeling equipment',
      'Buffet lunch',
      'Mineral water',
      'Professional guide',
      'Beach facilities'
    ]
  },
  {
    id: 12,
    title: 'Dolphin World Show',
    location: 'Hurghada, Egypt',
    duration: '3 hours',
    price: 30.00,
    rating: 4.4,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/dolphin-world-show-hurghada.jpg',
    featured: false,
    type: 'entertainment',
    groupSize: 'Medium Group',
    description: 'Enjoy an amazing dolphin show at Hurghada\'s Dolphin World. Watch these intelligent creatures perform incredible tricks and stunts.',
    highlights: [
      'Live dolphin show',
      'Professional trainers',
      'Interactive experience',
      'Great for families',
      'Photo opportunities'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Entrance ticket',
      'Show performance',
      'Professional guide',
      'All taxes and service charges'
    ]
  },
  {
    id: 13,
    title: 'Semi Submarine Hurghada',
    location: 'Hurghada, Egypt',
    duration: '2 hours',
    price: 25.00,
    rating: 4.2,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/semi-submarine-hurghada.jpg',
    featured: false,
    type: 'marine',
    groupSize: 'Medium Group',
    description: 'Explore the underwater world of the Red Sea without getting wet on this semi-submarine tour. Perfect for non-swimmers and families with children.',
    highlights: [
      'Underwater viewing from air-conditioned cabin',
      'See colorful coral reefs',
      'Spot tropical fish and marine life',
      'Informative commentary',
      'Great for all ages'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Semi-submarine tour',
      'Professional guide',
      'Bottled water',
      'All taxes and fees'
    ]
  },
  {
    id: 14,
    title: 'City Tour Hurghada',
    location: 'Hurghada, Egypt',
    duration: '4 hours',
    price: 20.00,
    rating: 4.3,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/city-tour-hurghada.jpg',
    featured: false,
    type: 'sightseeing',
    groupSize: 'Small Group',
    description: 'Discover the charm of Hurghada with our comprehensive city tour, visiting local markets, mosques, and the famous Marina Boulevard.',
    highlights: [
      'Visit El Mina Mosque',
      'Explore local bazaars',
      'Stroll along Marina Boulevard',
      'Learn about local culture',
      'Photo opportunities'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Professional guide',
      'Entrance fees',
      'Bottled water',
      'All taxes and fees'
    ]
  },
  {
    id: 15,
    title: 'Horseback Riding Tour',
    location: 'Hurghada Desert, Egypt',
    duration: '3 hours',
    price: 35.00,
    rating: 4.6,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/horse-riding-hurghada.jpg',
    featured: false,
    type: 'adventure',
    groupSize: 'Small Group',
    description: 'Experience the beauty of the Egyptian desert on horseback. Suitable for all riding levels, from beginners to experienced riders.',
    highlights: [
      'Desert riding experience',
      'Suitable for all levels',
      'Beautiful desert landscapes',
      'Professional instructors',
      'Safety equipment provided'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Horse and equipment',
      'Professional guide',
      'Safety briefing',
      'Bottled water'
    ]
  },
  {
    id: 16,
    title: 'Red Sea Diving Experience',
    location: 'Red Sea, Egypt',
    duration: '6 hours',
    price: 65.00,
    rating: 4.8,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/diving-hurghada.jpg',
    featured: true,
    type: 'diving',
    groupSize: 'Small Group',
    description: 'Dive into the crystal-clear waters of the Red Sea and discover its vibrant marine life and stunning coral reefs.',
    highlights: [
      'Two diving spots',
      'Professional PADI instructors',
      'Vibrant coral reefs',
      'Rich marine life',
      'Small group experience'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Professional diving guide',
      'Full diving equipment',
      'Lunch and drinks',
      'Diving insurance',
      'All necessary equipment'
    ]
  },
  {
    id: 17,
    title: 'Private Boat Tour',
    location: 'Red Sea, Egypt',
    duration: '8 hours',
    price: 350.00,
    rating: 5.0,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/private-boat-hurghada.jpg',
    featured: true,
    type: 'private',
    groupSize: 'Private',
    description: 'Enjoy a private boat tour tailored to your preferences. Choose your own itinerary and enjoy the Red Sea in complete privacy.',
    highlights: [
      'Fully customizable itinerary',
      'Private boat with crew',
      'Snorkeling equipment',
      'Delicious lunch on board',
      'Flexible schedule'
    ],
    included: [
      'Private boat with captain and crew',
      'Fuel and all boat fees',
      'Snorkeling equipment',
      'Lunch and soft drinks',
      'Towels and fresh water shower',
      'Hotel pickup and drop-off'
    ]
  },
  {
    id: 18,
    title: 'Pirates Sailing Boat',
    location: 'Red Sea, Egypt',
    duration: '8 hours',
    price: 50.00,
    rating: 4.7,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/pirates-boat-hurghada.jpg',
    featured: false,
    type: 'boat',
    groupSize: 'Medium Group',
    description: 'Set sail on a pirate-themed adventure aboard our traditional wooden sailing boat. Perfect for families and groups looking for a fun day at sea.',
    highlights: [
      'Pirate-themed sailing experience',
      'Two snorkeling stops',
      'Delicious buffet lunch',
      'Music and entertainment',
      'Water sports activities'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Welcome drink',
      'Buffet lunch',
      'Soft drinks and water',
      'Snorkeling equipment',
      'Professional crew'
    ]
  },
  {
    id: 19,
    title: 'Nefertari Boat Trip',
    location: 'Red Sea, Egypt',
    duration: '8 hours',
    price: 45.00,
    rating: 4.6,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/nefertari-boat-hurghada.jpg',
    featured: false,
    type: 'boat',
    groupSize: 'Medium Group',
    description: 'Experience the beauty of the Red Sea aboard the comfortable Nefertari boat, with excellent snorkeling and a delicious lunch on board.',
    highlights: [
      'Two snorkeling stops',
      'Spacious sun deck',
      'Delicious buffet lunch',
      'Professional guides',
      'Relaxing atmosphere'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Buffet lunch',
      'Soft drinks and water',
      'Snorkeling equipment',
      'Professional guide',
      'All safety equipment'
    ]
  },
  {
    id: 20,
    title: 'Parasailing Adventure',
    location: 'Hurghada, Egypt',
    duration: '1 hour',
    price: 40.00,
    rating: 4.8,
    image: 'https://tito-hurghadatours.com/wp-content/uploads/2023/05/parasailing-hurghada.jpg',
    featured: false,
    type: 'adventure',
    groupSize: 'Small Group',
    description: 'Soar above the Red Sea and enjoy breathtaking views of the coastline on this thrilling parasailing adventure.',
    highlights: [
      'Breathtaking aerial views',
      'Professional instructors',
      'Safety briefing',
      'Photo opportunities',
      'Thrilling experience'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Safety equipment',
      'Professional instructor',
      'Life jacket',
      'Safety briefing'
    ]
  }
  // More tours can be added as needed
];

export default allTours;
