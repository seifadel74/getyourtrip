import React, { useState, useEffect } from 'react';
import { api, Tour } from '../../services/api';
import toast from 'react-hot-toast';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import MultipleImageUpload from './MultipleImageUpload';

const TourManagement: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState<Partial<Tour>>({
    title: '',
    description: '',
    price: 0,
    location: '',
    duration: '',
    image: [],
    type: '',
    max_group_size: 10,
    rating: 0,
    reviews_count: 0,
    itinerary: [],
    highlights: [],
    included: [],
    excluded: [],
    is_featured: false,
    is_active: true,
  });

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    setIsLoading(true);
    try {
      // Get all tours (including inactive) for admin
      const response = await api.tours.getAll({ per_page: 100 });
      if (response.success && response.data) {
        setTours(response.data);
      } else {
        toast.error('Failed to load tours');
      }
    } catch (error) {
      toast.error('Error loading tours');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (tour?: Tour) => {
    if (tour) {
      setEditingTour(tour);
      // Ensure image is an array
      const tourData = {
        ...tour,
        image: Array.isArray(tour.image) ? tour.image : tour.image ? [tour.image] : [],
        highlights: tour.highlights || [],
        itinerary: tour.itinerary || [],
        included: tour.included || [],
        excluded: tour.excluded || [],
      };
      setFormData(tourData);
    } else {
      setEditingTour(null);
      setFormData({
        title: '',
        description: '',
        price: 0,
        location: '',
        duration: '',
        image: [],
        type: '',
        max_group_size: 10,
        rating: 0,
        reviews_count: 0,
        itinerary: [],
        highlights: [],
        included: [],
        excluded: [],
        is_featured: false,
        is_active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTour(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty strings from arrays before submitting
    const submitData = {
      ...formData,
      highlights: (formData.highlights || []).filter(h => h && h.trim() !== ''),
      included: (formData.included || []).filter(i => i && i.trim() !== ''),
      excluded: (formData.excluded || []).filter(e => e && e.trim() !== ''),
      countries: (formData.countries || []).filter(c => c && c.trim() !== ''),
      languages: (formData.languages || []).filter(l => l && l.trim() !== ''),
      itinerary: (formData.itinerary || []).filter(item => 
        item && (item.title?.trim() || item.description?.trim())
      ).map(item => ({
        day: item.day || 1,
        title: item.title || '',
        description: item.description || '',
        duration: item.duration || '',
        activities: item.activities || []
      }))
    };

    try {
      if (editingTour) {
        const response = await api.tours.update(editingTour.id, submitData);
        if (response.success) {
          toast.success('Tour updated successfully');
          loadTours();
          handleCloseModal();
        } else {
          toast.error(response.message || 'Failed to update tour');
        }
      } else {
        const response = await api.tours.create(submitData);
        if (response.success) {
          toast.success('Tour created successfully');
          loadTours();
          handleCloseModal();
        } else {
          toast.error(response.message || 'Failed to create tour');
        }
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) {
      return;
    }

    try {
      const response = await api.tours.delete(id);
      if (response.success) {
        toast.success('Tour deleted successfully');
        loadTours();
      } else {
        toast.error(response.message || 'Failed to delete tour');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading tours...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Tours</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <PlusIcon className="h-5 w-5" />
          Add New Tour
        </button>
      </div>

      {/* Tours List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tours.map((tour) => (
              <tr key={tour.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{tour.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{tour.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${tour.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      tour.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {tour.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(tour)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5 inline" />
                  </button>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white mb-10">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingTour ? 'Edit Tour' : 'Add New Tour'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <input
                      type="text"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <MultipleImageUpload
                    value={Array.isArray(formData.image) ? formData.image : formData.image ? [formData.image] : []}
                    onChange={(urls) => setFormData({ ...formData, image: urls })}
                    folder="tours"
                    label="Tour Images"
                    maxImages={10}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    The first image will be used as the primary image in listings
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Group Size</label>
                    <input
                      type="number"
                      value={formData.max_group_size}
                      onChange={(e) => setFormData({ ...formData, max_group_size: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Highlights</label>
                  <div className="space-y-2">
                    {(formData.highlights || []).map((highlight, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={highlight}
                          onChange={(e) => {
                            const newHighlights = [...(formData.highlights || [])];
                            newHighlights[index] = e.target.value;
                            setFormData({ ...formData, highlights: newHighlights });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter highlight"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newHighlights = (formData.highlights || []).filter((_, i) => i !== index);
                            setFormData({ ...formData, highlights: newHighlights });
                          }}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          highlights: [...(formData.highlights || []), '']
                        });
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Add Highlight
                    </button>
                  </div>
                </div>

                {/* Included Items */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Included Items</label>
                  <div className="space-y-2">
                    {(formData.included || []).map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newIncluded = [...(formData.included || [])];
                            newIncluded[index] = e.target.value;
                            setFormData({ ...formData, included: newIncluded });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter included item"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newIncluded = (formData.included || []).filter((_, i) => i !== index);
                            setFormData({ ...formData, included: newIncluded });
                          }}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          included: [...(formData.included || []), '']
                        });
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Add Included Item
                    </button>
                  </div>
                </div>

                {/* Excluded Items */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Excluded Items</label>
                  <div className="space-y-2">
                    {(formData.excluded || []).map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newExcluded = [...(formData.excluded || [])];
                            newExcluded[index] = e.target.value;
                            setFormData({ ...formData, excluded: newExcluded });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter excluded item"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newExcluded = (formData.excluded || []).filter((_, i) => i !== index);
                            setFormData({ ...formData, excluded: newExcluded });
                          }}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          excluded: [...(formData.excluded || []), '']
                        });
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Add Excluded Item
                    </button>
                  </div>
                </div>

                {/* Countries */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Countries</label>
                  <div className="space-y-2">
                    {(formData.countries || []).map((country, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => {
                            const newCountries = [...(formData.countries || [])];
                            newCountries[index] = e.target.value;
                            setFormData({ ...formData, countries: newCountries });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter country"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newCountries = (formData.countries || []).filter((_, i) => i !== index);
                            setFormData({ ...formData, countries: newCountries });
                          }}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          countries: [...(formData.countries || []), '']
                        });
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Add Country
                    </button>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                  <div className="space-y-2">
                    {(formData.languages || []).map((lang, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={lang}
                          onChange={(e) => {
                            const newLanguages = [...(formData.languages || [])];
                            newLanguages[index] = e.target.value;
                            setFormData({ ...formData, languages: newLanguages });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter language"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newLanguages = (formData.languages || []).filter((_, i) => i !== index);
                            setFormData({ ...formData, languages: newLanguages });
                          }}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          languages: [...(formData.languages || []), '']
                        });
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Add Language
                    </button>
                  </div>
                </div>

                {/* Itinerary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Itinerary</label>
                  <div className="space-y-4 border border-gray-200 rounded-lg p-4">
                    {(formData.itinerary || []).map((day, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-700">Day {day.day || index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              const newItinerary = (formData.itinerary || []).filter((_, i) => i !== index);
                              setFormData({ ...formData, itinerary: newItinerary });
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          <input
                            type="number"
                            value={day.day || index + 1}
                            onChange={(e) => {
                              const newItinerary = [...(formData.itinerary || [])];
                              newItinerary[index] = { ...day, day: parseInt(e.target.value) };
                              setFormData({ ...formData, itinerary: newItinerary });
                            }}
                            className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Day"
                          />
                          <input
                            type="text"
                            value={day.title || ''}
                            onChange={(e) => {
                              const newItinerary = [...(formData.itinerary || [])];
                              newItinerary[index] = { ...day, title: e.target.value };
                              setFormData({ ...formData, itinerary: newItinerary });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Day Title"
                          />
                          <textarea
                            value={day.description || ''}
                            onChange={(e) => {
                              const newItinerary = [...(formData.itinerary || [])];
                              newItinerary[index] = { ...day, description: e.target.value };
                              setFormData({ ...formData, itinerary: newItinerary });
                            }}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Day Description"
                          />
                          <input
                            type="text"
                            value={day.duration || ''}
                            onChange={(e) => {
                              const newItinerary = [...(formData.itinerary || [])];
                              newItinerary[index] = { ...day, duration: e.target.value };
                              setFormData({ ...formData, itinerary: newItinerary });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Duration (e.g., Full day, 8 hours)"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newDay = {
                          day: (formData.itinerary || []).length + 1,
                          title: '',
                          description: '',
                          duration: ''
                        };
                        setFormData({
                          ...formData,
                          itinerary: [...(formData.itinerary || []), newDay]
                        });
                      }}
                      className="w-full text-sm text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1 border border-dashed border-gray-300 rounded-md py-2"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Add Itinerary Day
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Active</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    {editingTour ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourManagement;

