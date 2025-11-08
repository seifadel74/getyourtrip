export interface Tour {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  featured?: boolean;
  type?: string;
  groupSize?: string;
  description?: string;
  highlights?: string[];
  included?: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  reviews?: Array<{
    id: number;
    author: string;
    rating: number;
    date: string;
    comment: string;
  }>;
}
