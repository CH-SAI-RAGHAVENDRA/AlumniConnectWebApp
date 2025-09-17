import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import PostCard from '../components/posts/PostCard';
import {
  PencilIcon,
  MapPinIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CalendarIcon,
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [isOwnProfile, setIsOwnProfile] = useState(!id || id === user?.id);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  // Mock user data for profile (in real app, fetch based on id)
  const profileUser = {
    id: 1,
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    role: 'alumni',
    batch: '2018-22',
    department: 'Computer Science',
    currentPosition: 'Software Engineer at Google',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6d6b3b0?w=200',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    bio: 'Passionate about technology and helping students navigate their career journey. 5 years experience in software development.',
    location: 'Bangalore, India',
    followers: 245,
    following: 189,
    connections: 156,
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning', 'Data Structures'],
    experience: [
      {
        title: 'Software Engineer',
        company: 'Google',
        duration: '2022 - Present',
        description: 'Working on search optimization algorithms and machine learning models.'
      },
      {
        title: 'Junior Software Developer',
        company: 'Microsoft',
        duration: '2020 - 2022', 
        description: 'Developed enterprise applications using React and .NET frameworks.'
      }
    ],
    education: [
      {
        degree: 'B.Tech Computer Science',
        institution: 'University College',
        year: '2018-2022',
        grade: '8.5 CGPA'
      }
    ]
  };

  const mockPosts = [
    {
      _id: '1',
      post: 'Just wrapped up an amazing project at Google involving machine learning for search optimization!',
      owner: profileUser,
      likes: ['2', '3', '4'],
      comments: [],
      createdAt: '2025-09-17T10:30:00Z'
    }
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const tabs = [
    { id: 'posts', name: 'Posts', count: mockPosts.length },
    { id: 'about', name: 'About', count: null },
    { id: 'experience', name: 'Experience', count: profileUser.experience.length },
    { id: 'skills', name: 'Skills', count: profileUser.skills.length },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6"
      >
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          {profileUser.coverImage && (
            <img
              src={profileUser.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
          {isOwnProfile && (
            <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all duration-200">
              <PencilIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 relative">
            {/* Profile Picture */}
            <div className="relative">
              <Avatar
                src={profileUser.avatar}
                name={profileUser.name}
                size="2xl"
                className="border-4 border-white shadow-lg"
              />
              {isOwnProfile && (
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200">
                  <PencilIcon className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Profile Details */}
            <div className="flex-1 mt-4 sm:mt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profileUser.name}</h1>
                  <p className="text-lg text-gray-600">{profileUser.currentPosition}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <AcademicCapIcon className="h-4 w-4" />
                      <span>{profileUser.department} • {profileUser.batch}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{profileUser.location}</span>
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  {!isOwnProfile ? (
                    <>
                      <Button
                        onClick={handleFollow}
                        variant={isFollowing ? 'secondary' : 'primary'}
                        className="flex items-center space-x-2"
                      >
                        <UserPlusIcon className="h-4 w-4" />
                        <span>{isFollowing ? 'Following' : 'Follow'}</span>
                      </Button>
                      <Button variant="outline" className="flex items-center space-x-2">
                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                        <span>Message</span>
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" className="flex items-center space-x-2">
                      <PencilIcon className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 mt-4 leading-relaxed">{profileUser.bio}</p>

              {/* Stats */}
              <div className="flex items-center space-x-6 mt-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">{profileUser.connections}</p>
                  <p className="text-sm text-gray-500">Connections</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">{profileUser.followers}</p>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">{profileUser.following}</p>
                  <p className="text-sm text-gray-500">Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6"
      >
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
                {tab.count !== null && (
                  <span className="ml-2 py-0.5 px-2 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {mockPosts.length > 0 ? (
                mockPosts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onLike={() => {}}
                    onComment={() => {}}
                    onShare={() => {}}
                    onSave={() => {}}
                    onDelete={() => {}}
                    currentUserId={user?.id}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No posts yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed">{profileUser.bio}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                {profileUser.education.map((edu, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <AcademicCapIcon className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.year} • {edu.grade}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
              {profileUser.experience.map((exp, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <BriefcaseIcon className="h-6 w-6 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{exp.title}</h4>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500 flex items-center space-x-1 mt-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{exp.duration}</span>
                    </p>
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profileUser.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;