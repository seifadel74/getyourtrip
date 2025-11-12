export interface Review {
  id: number;
  tour_id: number;
  booking_id?: number;
  author: string;
  email: string;
  rating: number;
  comment: string;
  is_verified?: boolean;
  is_approved?: boolean;
  created_at?: string;
  updated_at?: string;
  date?: string; // Legacy field for backward compatibility
}

export interface Destination {
  id: number;
  name: string;
  country: string;
  image: string | string[]; // Support both single image and multiple images
  price: number;
  rating: number;
  description?: string;
  duration?: string;
  included?: string[];
  notIncluded?: string[];
  highlights?: string[];
  reviews?: Review[];
  type?: string;
  groupSize?: string;
  featured?: boolean;
}

export interface ItineraryDay {
  id?: number;
  day: number;
  title: string;
  description: string;
  duration?: string;
  activities?: string[];
}

export interface Tour extends Destination {
  location: string;
  title: string;
  itinerary?: ItineraryDay[];
  // These properties are already in Destination, but we're being explicit about them
  highlights?: string[];
  included?: string[];
  notIncluded?: string[];
  excluded?: string[]; // Alias for notIncluded, used by API
  countries?: string[];
  languages?: string[];
}
