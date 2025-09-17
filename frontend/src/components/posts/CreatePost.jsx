import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  PhotoIcon,
  FaceSmileIcon,
  TagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const CreatePost = ({ onCreatePost, onClose }) => {
  const { user } = useAuth();
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!postContent.trim() && !selectedImage) {
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('post', postContent);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      await onCreatePost(formData);
      
      // Reset form
      setPostContent('');
      setSelectedImage(null);
      setImagePreview(null);
      
      if (onClose) onClose();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-lg w-full mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Create Post</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-3 mb-4">
        <Avatar 
          src={user?.avatar} 
          name={user?.name}
          size="md"
        />
        <div>
          <p className="font-medium text-gray-900">{user?.name}</p>
          <p className="text-sm text-gray-500 capitalize">
            {user?.role} • {user?.department}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Text Content */}
        <div className="mb-4">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your mind? Share your thoughts, experiences, or ask for advice from the community..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4 relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-gray-900 bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Post Options */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-4">
            {/* Image Upload */}
            <motion.button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <PhotoIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Photo</span>
            </motion.button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />

            {/* Emoji Picker (placeholder) */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-200"
            >
              <FaceSmileIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Emoji</span>
            </motion.button>

            {/* Tag People */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
            >
              <TagIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Tag</span>
            </motion.button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            loading={isLoading}
            disabled={!postContent.trim() && !selectedImage}
            className="px-6"
          >
            {isLoading ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePost;