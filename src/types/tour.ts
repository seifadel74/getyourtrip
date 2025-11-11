export interface Tour {
  id: number;
  title: string;
  name?: string; // Alias for title
  location: string;
  country?: string; // Alias for location
  duration: string;
  price: number;
  rating: number;
  image: string | string[]; // Support both single image and multiple images
  featured?: boolean;
  type?: string;
  groupSize?: string;
  description?: string;
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  countries?: string[];
  languages?: string[];
  reviews?: Array<{
    id: number;
    author: string;
    rating: number;
    date: string;
    comment: string;
  }>;
}
