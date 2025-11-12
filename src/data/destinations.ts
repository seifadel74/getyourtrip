import { Tour } from '../types';

export interface CustomDestination {
  id: number;
  name: string;
  country: string;
  image: string;
  isPopular: boolean;
  description: string;
  tourLink: string;
}

// Helper function to convert our custom destination to the expected Tour type
export const convertToTour = (destination: CustomDestination): Tour => ({
  ...destination,
  price: 0,
  rating: 0,
  duration: '',
  included: [],
  notIncluded: [],
  highlights: [],
  reviews: [],
  location: destination.country,
  title: destination.name
});

export const destinations: CustomDestination[] = [
  {
    id: 1,
    name: 'Marsa Alam',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1626358228177-abe1b30e1283?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fW1hcnNhJTIwYWxhbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500',
    isPopular: false,
    description: 'Discover the pristine beaches and vibrant marine life of Marsa Alam',
    tourLink: '/tours?location=Marsa%20Alam'
  },
  {
    id: 2,
    name: 'Cairo',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    isPopular: false,
    description: 'Explore the ancient wonders and vibrant culture of Egypt\'s capital',
    tourLink: '/tours?location=Cairo'
  },
  {
    id: 3,
    name: 'Safaga',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    isPopular: false,
    description: 'A perfect destination for water sports and beach lovers',
    tourLink: '/tours?location=Safaga'
  },
  {
    id: 4,
    name: 'Luxor',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1609101111867-2e1fe1b2a6b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8THV4b3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500',
    isPopular: false,
    description: 'The world\'s greatest open-air museum with ancient temples and tombs',
    tourLink: '/tours?location=Luxor'
  },
  {
    id: 5,
    name: 'Hurghada',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1722264219947-725d4e20ef23?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SHVyZ2hhZGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500',
    isPopular: false,
    description: 'Famous for its beautiful beaches and vibrant nightlife',
    tourLink: '/tours?location=Hurghada'
  }
];
