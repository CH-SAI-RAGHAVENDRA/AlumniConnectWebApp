import api from './api';

export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/user/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/user/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/user/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user data' };
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.get('/user/logout');
      localStorage.removeItem('token');
    } catch (error) {
      // Even if logout fails on server, remove token locally
      localStorage.removeItem('token');
      throw error.response?.data || { message: 'Logout failed' };
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/user/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Profile update failed' };
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/user/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password change failed' };
    }
  },

  // Follow/Unfollow user
  followUser: async (userId) => {
    try {
      const response = await api.post(`/user/follow/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Follow action failed' };
    }
  },

  // Get user profile by ID
  getUserProfile: async (userId) => {
    try {
      const response = await api.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user profile' };
    }
  },
};

export const postService = {
  // Get all posts
  getAllPosts: async () => {
    try {
      const response = await api.get('/post/all');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get posts' };
    }
  },

  // Create post
  createPost: async (postData) => {
    try {
      const response = await api.post('/post/create', postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create post' };
    }
  },

  // Get single post
  getPost: async (postId) => {
    try {
      const response = await api.get(`/post/${postId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get post' };
    }
  },

  // Update post
  updatePost: async (postId, postData) => {
    try {
      const response = await api.put(`/post/${postId}`, postData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update post' };
    }
  },

  // Delete post
  deletePost: async (postId) => {
    try {
      const response = await api.delete(`/post/${postId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete post' };
    }
  },

  // Like/Unlike post
  likePost: async (postId) => {
    try {
      const response = await api.post(`/post/like/${postId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to like post' };
    }
  },

  // Comment on post
  commentOnPost: async (postId, commentData) => {
    try {
      const response = await api.post(`/post/comment/${postId}`, commentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to comment on post' };
    }
  },

  // Delete comment
  deleteComment: async (postId, commentId) => {
    try {
      const response = await api.delete(`/post/comment/${postId}`, {
        data: { commentId }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete comment' };
    }
  },
};

// Network/Connection services
export const networkService = {
  // Get alumni directory
  getAlumni: async (filters = {}) => {
    try {
      const response = await api.get('/user/alumni', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get alumni data' };
    }
  },

  // Search users
  searchUsers: async (query) => {
    try {
      const response = await api.get(`/user/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to search users' };
    }
  },
};