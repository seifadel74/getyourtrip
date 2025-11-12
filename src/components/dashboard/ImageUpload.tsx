import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  folder = 'tours',
  label = 'Image',
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preview with value prop changes
  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    // Create preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
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
        const imageUrl = data.data.url;
        onChange(imageUrl);
        setPreview(imageUrl); // Update preview with the actual URL
        toast.success('Image uploaded successfully');
      } else {
        toast.error(data.message || 'Failed to upload image');
        setPreview(value || null); // Revert to previous value
      }
    } catch (error) {
      toast.error('Error uploading image');
      setPreview(null);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      
      {preview ? (
        <div className="relative">
          <div className="mt-1 flex items-center gap-4">
            <img
              src={preview}
              alt="Preview"
              className="h-32 w-32 object-cover rounded-lg border border-gray-300"
            />
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleClick}
                disabled={uploading}
                className="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Change Image'}
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Remove
              </button>
            </div>
          </div>
          <input
            type="hidden"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="mt-1 flex justify-center px-6 py-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-indigo-500 transition"
        >
          <div className="text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <span className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600">
                {uploading ? 'Uploading...' : 'Upload an image'}
              </span>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {/* Also allow URL input */}
      <div className="mt-3">
        <label className="block text-xs text-gray-500 mb-1">Or enter image URL</label>
        <input
          type="url"
          value={value || ''}
          onChange={(e) => {
            onChange(e.target.value);
            setPreview(e.target.value || null);
          }}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
};

export default ImageUpload;

