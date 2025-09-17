import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CreatePost from '../components/posts/CreatePost';
import PostCard from '../components/posts/PostCard';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

// Mock data for posts
const mockPosts = [
  {
    _id: '1',
    post: 'Just wrapped up an amazing project at Google involving machine learning for search optimization! It\'s incredible to see how the algorithms we learned in college are being applied at scale. For current students - don\'t underestimate your data structures and algorithms courses! 🚀',
    owner: {
      _id: '1',
      name: 'Priya Sharma',
      role: 'alumni',
      batch: '2018-22',
      department: 'Computer Science',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6d6b3b0?w=150'
    },
    image: {
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'
    },
    likes: ['2', '3', '4'],
    comments: [
      {
        _id: '1',
        user: {
          name: 'Ananya Patel',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
        },
        comment: 'This is so inspiring! I\'m currently taking DS&A and struggling a bit. Any resources you\'d recommend?',
        createdAt: '2025-09-17T11:00:00Z'
      }
    ],
    createdAt: '2025-09-17T10:30:00Z'
  },
  {
    _id: '2',
    post: 'Exciting news! Tesla is hiring for multiple engineering positions, especially in battery technology and autonomous systems. If you\'re a recent graduate or student interested in sustainable transportation, DM me your resume. Let\'s build the future together! ⚡🚗',
    owner: {
      _id: '2',
      name: 'Rahul Kumar',
      role: 'alumni',
      batch: '2016-20',
      department: 'Mechanical Engineering',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    image: {
      url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600'
    },
    likes: ['1', '3', '4', '5'],
    comments: [],
    createdAt: '2025-09-17T09:15:00Z'
  }
];

const Home = () => {
  const { user } = useAuth();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState(mockPosts);

  const handleCreatePost = (postData) => {
    const newPost = {
      _id: Date.now().toString(),
      post: postData.get('post'),
      owner: user,
      image: postData.get('image') ? { url: URL.createObjectURL(postData.get('image')) } : null,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    };
    
    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post._id === postId) {
        const isLiked = post.likes.includes(user.id);
        return {
          ...post,
          likes: isLiked 
            ? post.likes.filter(id => id !== user.id)
            : [...post.likes, user.id]
        };
      }
      return post;
    }));
  };

  const handleComment = (postId, commentText) => {
    setPosts(posts.map(post => {
      if (post._id === postId) {
        const newComment = {
          _id: Date.now().toString(),
          user: user,
          comment: commentText,
          createdAt: new Date().toISOString()
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Stay connected with your alumni network and discover new opportunities.
            </p>
          </div>
          <motion.button
            onClick={() => setShowCreatePost(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create Post</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="w-full max-w-lg">
            <CreatePost 
              onCreatePost={handleCreatePost}
              onClose={() => setShowCreatePost(false)}
            />
          </div>
        </motion.div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Connections</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Job Opportunities</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Messages</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-semibold text-gray-900"
        >
          Recent Updates
        </motion.h2>
        
        {posts.map((post, index) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PostCard
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={(post) => console.log('Share post:', post)}
              onSave={(postId) => console.log('Save post:', postId)}
              onDelete={(postId) => console.log('Delete post:', postId)}
              currentUserId={user?.id}
            />
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <button className="px-6 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200">
          Load More Posts
        </button>
      </motion.div>
    </div>
  );
};

export default Home;