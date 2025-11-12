/**
 * Get the primary image from a tour (first image in array or single image string)
 */
export const getPrimaryImage = (tour: { image?: string | string[] }): string | undefined => {
  if (!tour.image) return undefined;
  
  if (Array.isArray(tour.image)) {
    return tour.image.length > 0 ? tour.image[0] : undefined;
  }
  
  return tour.image;
};

/**
 * Get all images from a tour (always returns an array)
 */
export const getAllImages = (tour: { image?: string | string[] }): string[] => {
  if (!tour.image) return [];
  
  if (Array.isArray(tour.image)) {
    return tour.image.filter(img => img && img.trim() !== '');
  }
  
  return [tour.image].filter(img => img && img.trim() !== '');
};

