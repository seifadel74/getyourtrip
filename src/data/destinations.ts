import { Destination, Tour } from '../types';

// Extend the base Destination interface to include our custom properties
export interface CustomDestination extends Omit<Destination, 'reviews'> {
  reviews: number; // Number of reviews
  isPopular: boolean;
  reviewsList?: Array<{
    id: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

// Helper function to convert our custom destination to the expected Tour type
export const convertToTour = (destination: CustomDestination): Tour => {
  return {
    ...destination,
    id: destination.id,
    name: destination.name,
    country: destination.country,
    image: destination.image,
    price: destination.price,
    rating: destination.rating,
    description: destination.description || '',
    duration: destination.duration || '',
    included: destination.included || [],
    notIncluded: destination.notIncluded || [],
    highlights: destination.highlights || [],
    reviews: destination.reviewsList || [],
    location: destination.country, // Using country as location for simplicity
    title: destination.name,
  };
};

export const destinations: CustomDestination[] = [
  {
    id: 1,
    name: 'Four Seasons Resort Sharm El Sheikh',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 450,
    rating: 4.9,
    reviews: 1542,
    isPopular: true,
    description: 'Luxurious beachfront resort with private beaches, world-class diving, and stunning Red Sea views.',
    duration: '7 days / 6 nights',
    included: ['Luxury suite with sea view', 'All-inclusive premium package', 'Airport transfers', 'Diving center access'],
    notIncluded: ['Spa treatments', 'Premium excursions', 'Flight tickets'],
    highlights: ['Private beach', 'Multiple swimming pools', 'Fine dining restaurants', 'Kids club']
  },
  {
    id: 2,
    name: 'The Ritz-Carlton, Sharm El Sheikh',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 520,
    rating: 4.8,
    reviews: 1320,
    isPopular: true,
    description: 'Elegant resort offering private beaches, a luxury spa, and multiple dining options with Red Sea views.',
    duration: '7 days / 6 nights',
    included: ['Luxury room with balcony', 'Half board', 'Beach access', 'Fitness center'],
    notIncluded: ['Spa services', 'Diving trips', 'Airport transfer'],
    highlights: ['Infinity pools', 'Marina view', 'Luxury spa', 'Water sports center']
  },
  {
    id: 3,
    name: 'Jaz Fanara Resort & Residence',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 280,
    rating: 4.5,
    reviews: 876,
    isPopular: true,
    description: 'Beachfront resort with direct access to the Red Sea and vibrant coral reefs just steps away.',
    duration: '7 days / 6 nights',
    included: ['Sea view room', 'All-inclusive package', 'Beach access', 'Evening entertainment'],
    notIncluded: ['Premium drinks', 'Spa services', 'Excursions'],
    highlights: ['House reef', 'Family-friendly', 'Multiple restaurants', 'Animation team']
  },
  {
    id: 4,
    name: 'Hilton Marsa Alam Nubian Resort',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1520250497591-112f5d3f1e31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 380,
    rating: 4.6,
    reviews: 945,
    isPopular: false,
    description: 'Luxury resort with a private beach, multiple pools, and access to exceptional diving sites.',
    duration: '7 days / 6 nights',
    included: ['Deluxe room', 'All-inclusive', 'Diving center access', 'Kids club'],
    notIncluded: ['Spa treatments', 'Premium excursions', 'Airport transfer'],
    highlights: ['Private beach', 'Dolphin house reef', 'Multiple pools', 'Water sports']
  },
  {
    id: 5,
    name: 'Stella Di Mare Beach Hotel & Spa',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 410,
    rating: 4.7,
    reviews: 1103,
    isPopular: true,
    description: '5-star luxury resort with a private marina, diving center, and extensive spa facilities.',
    duration: '7 days / 6 nights',
    included: ['Luxury room with sea view', 'Half board', 'Spa access', 'Private beach'],
    notIncluded: ['Premium drinks', 'Diving courses', 'Airport transfer'],
    highlights: ['Private marina', 'Luxury spa', 'Multiple restaurants', 'Water sports']
  },
  {
    id: 6,
    name: 'The Oberoi Beach Resort, Sahl Hasheesh',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2d5f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 680,
    rating: 4.9,
    reviews: 892,
    isPopular: true,
    description: 'Ultra-luxury resort offering private pools, butler service, and pristine beaches on the Red Sea.',
    duration: '7 days / 6 nights',
    included: ['Private pool villa', 'Full board', 'Butler service', 'Airport transfers'],
    notIncluded: ['Spa treatments', 'Premium excursions', 'Premium beverages'],
    highlights: ['Private pools', 'Luxury spa', 'Fine dining', 'Exclusive beach']
  },
  {
    id: 7,
    name: 'Jungle Aqua Park',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2d5f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 320,
    rating: 4.4,
    reviews: 1234,
    isPopular: true,
    description: 'Family-friendly resort with a massive water park and direct beach access to the Red Sea.',
    duration: '7 days / 6 nights',
    included: ['Family room', 'All-inclusive', 'Water park access', 'Kids club'],
    notIncluded: ['Spa services', 'Diving trips', 'Premium excursions'],
    highlights: ['Water park', 'Kids pool', 'Animation team', 'Beach access']
  },
  {
    id: 8,
    name: 'Soma Bay Sheraton',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1582719508461-905bfdf17b9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 360,
    rating: 4.6,
    reviews: 765,
    isPopular: false,
    description: 'Beachfront resort with a championship golf course and world-class diving facilities.',
    duration: '7 days / 6 nights',
    included: ['Deluxe room', 'Breakfast', 'Golf course access', 'Fitness center'],
    notIncluded: ['Meals', 'Spa services', 'Diving courses'],
    highlights: ['Golf course', 'Private beach', 'Diving center', 'Multiple pools']
  },
  {
    id: 9,
    name: 'Alf Leila Wa Leila Resort',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 290,
    rating: 4.3,
    reviews: 543,
    isPopular: false,
    description: 'Unique theme park resort with entertainment shows and direct beach access.',
    duration: '7 days / 6 nights',
    included: ['Standard room', 'All-inclusive', 'Theme park access', 'Evening shows'],
    notIncluded: ['Premium drinks', 'Spa services', 'Excursions'],
    highlights: ['Theme park', 'Evening shows', 'Private beach', 'Family activities']
  },
  {
    id: 10,
    name: 'Hilton Hurghada Resort',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1582719471384-894e4450e0a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 340,
    rating: 4.5,
    reviews: 987,
    isPopular: true,
    description: 'Beachfront resort with multiple pools, water sports, and direct access to the Red Sea.',
    duration: '7 days / 6 nights',
    included: ['Deluxe room', 'All-inclusive', 'Water sports', 'Kids club'],
    notIncluded: ['Premium drinks', 'Spa services', 'Diving trips'],
    highlights: ['Private beach', 'Multiple pools', 'Water sports', 'Kids activities']
  },
  {
    id: 11,
    name: 'Steigenberger Alcazar',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1584132907861-5a1dd4223a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 390,
    rating: 4.7,
    reviews: 876,
    isPopular: true,
    description: 'Luxury adults-only resort with a private beach and exceptional dining options.',
    duration: '7 days / 6 nights',
    included: ['Superior room', 'All-inclusive premium', 'Private beach', 'Spa access'],
    notIncluded: ['Premium excursions', 'Premium alcohol', 'Airport transfer'],
    highlights: ['Adults only', 'Private beach', 'Gourmet dining', 'Luxury spa']
  }
];
