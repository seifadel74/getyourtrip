import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface MultipleImageUploadProps {
  value?: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  label?: string;
  maxImages?: number;
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  value = [],
  onChange,
  folder = 'tours',
  label = 'Images',
  maxImages = 10,
}) => {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(value || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync images with value prop changes
  useEffect(() => {
    setImages(value || []);
  }, [value]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check total images limit
    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Validate files
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setUploading(true);
    const newImageUrls: string[] = [];

    try {
      // Upload files one by one
      for (const file of validFiles) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('folder', folder);

        // Get auth token
        const token = localStorage.getItem('admin_auth_token');
        const headers: HeadersInit = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api'}/upload/image`,
          {
            method: 'POST',
            headers,
            body: formData,
          }
        );

        const data = await response.json();

        if (data.success && data.data?.url) {
          newImageUrls.push(data.data.url);
        } else {
          toast.error(`Failed to upload ${file.name}`);
        }
      }

      if (newImageUrls.length > 0) {
        const updatedImages = [...images, ...newImageUrls];
        setImages(updatedImages);
        onChange(updatedImages);
        toast.success(`${newImageUrls.length} image(s) uploaded successfully`);
      }
    } catch (error) {
      toast.error('Error uploading images');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onChange(updatedImages);
  };

  const handleAddUrl = (url: string) => {
    if (!url.trim()) return;

    if (images.length >= maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const updatedImages = [...images, url.trim()];
    setImages(updatedImages);
    onChange(updatedImages);
  };

  const handleUrlInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.currentTarget;
      handleAddUrl(input.value);
      input.value = '';
    }
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images];
    const [moved] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, moved);
    setImages(updatedImages);
    onChange(updatedImages);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} ({images.length}/{maxImages})
      </label>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="mt-2 grid grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`Upload ${index + 1}`}
                className="h-24 w-full object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
              <div className="absolute bottom-1 left-1 px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded">
                {index + 1}
              </div>
              {/* Drag handles for reordering */}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleReorder(index, index - 1)}
                  className="absolute top-1 left-1 p-1 bg-indigo-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  title="Move up"
                >
                  ↑
                </button>
              )}
              {index < images.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleReorder(index, index + 1)}
                  className="absolute bottom-1 right-1 p-1 bg-indigo-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  title="Move down"
                >
                  ↓
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="mt-4 flex justify-center px-6 py-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-indigo-500 transition"
        >
          <div className="text-center">
            <PhotoIcon className="mx-auto h-10 w-10 text-gray-400" />
            <div className="mt-2 flex text-sm leading-6 text-gray-600">
              <span className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600">
                {uploading ? 'Uploading...' : 'Upload images'}
              </span>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 5MB each (max {maxImages} images)
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading || images.length >= maxImages}
      />

      {/* URL Input */}
      {images.length < maxImages && (
        <div className="mt-3">
          <label className="block text-xs text-gray-500 mb-1">Or add image URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              onKeyDown={handleUrlInput}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                if (input) {
                  handleAddUrl(input.value);
                  input.value = '';
                }
              }}
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleImageUpload;

