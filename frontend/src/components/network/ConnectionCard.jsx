import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import {
  ChatBubbleLeftRightIcon,
  UserMinusIcon,
  EyeIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';

const ConnectionCard = ({ 
  connection, 
  onMessage, 
  onDisconnect, 
  onViewProfile,
  showLastActivity = true,
  layout = 'horizontal' // 'horizontal' or 'vertical'
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMessage = () => {
    onMessage(connection.id);
  };

  const handleDisconnect = async () => {
    if (window.confirm(`Are you sure you want to disconnect from ${connection.name}?`)) {
      setIsLoading(true);
      try {
        await onDisconnect(connection.id);
      } catch (error) {
        console.error('Disconnect failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleViewProfile = () => {
    onViewProfile(connection.id);
  };

  const getLastActivityText = () => {
    if (!connection.lastActivity) return 'No recent activity';
    
    const activity = connection.lastActivity;
    const timeAgo = formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true });
    
    switch (activity.type) {
      case 'post':
        return `Posted ${timeAgo}`;
      case 'comment':
        return `Commented ${timeAgo}`;
      case 'login':
        return `Active ${timeAgo}`;
      default:
        return `Active ${timeAgo}`;
    }
  };

  if (layout === 'vertical') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
      >
        {/* Avatar and Name */}
        <div className="text-center mb-3">
          <div className="relative inline-block mb-2">
            <Avatar
              src={connection.avatar}
              name={connection.name}
              size="lg"
              showStatus
              isOnline={connection.isOnline}
            />
          </div>
          
          <h3 
            onClick={handleViewProfile}
            className="text-base font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors duration-200"
          >
            {connection.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-2">
            {connection.currentPosition || 'Student'}
          </p>
          
          {/* Role Badge */}
          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
            connection.role === 'alumni' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {connection.role === 'alumni' ? 'Alumni' : 'Student'}
          </span>
        </div>

        {/* Connection Info */}
        <div className="space-y-1 mb-3 text-xs text-gray-500">
          <div className="flex items-center justify-center">
            <AcademicCapIcon className="h-3 w-3 mr-1" />
            <span>{connection.department}</span>
          </div>
          <div className="flex items-center justify-center">
            <CalendarIcon className="h-3 w-3 mr-1" />
            <span>{connection.batch}</span>
          </div>
        </div>

        {/* Last Activity */}
        {showLastActivity && (
          <div className="text-center mb-3">
            <p className="text-xs text-gray-400">
              {getLastActivityText()}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            onClick={handleMessage}
            size="sm"
            className="flex-1 flex items-center justify-center space-x-1"
          >
            <ChatBubbleLeftRightIcon className="h-3 w-3" />
            <span>Message</span>
          </Button>
          
          <Button
            onClick={handleViewProfile}
            variant="outline"
            size="sm"
            className="flex items-center justify-center px-2"
            title="View Profile"
          >
            <EyeIcon className="h-3 w-3" />
          </Button>
        </div>
      </motion.div>
    );
  }

  // Horizontal layout (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Avatar
            src={connection.avatar}
            name={connection.name}
            size="lg"
            showStatus
            isOnline={connection.isOnline}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              {/* Name and Position */}
              <h3 
                onClick={handleViewProfile}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors duration-200 truncate"
              >
                {connection.name}
              </h3>
              
              <p className="text-gray-600 truncate mb-1">
                {connection.currentPosition || 'Student'}
              </p>

              {/* Details Row */}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    connection.role === 'alumni' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {connection.role === 'alumni' ? 'Alumni' : 'Student'}
                  </span>
                  <span>•</span>
                  <span>{connection.batch}</span>
                </div>
              </div>

              {/* Department */}
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <AcademicCapIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{connection.department}</span>
              </div>

              {/* Last Activity */}
              {showLastActivity && (
                <div className="flex items-center text-xs text-gray-400 mt-2">
                  <span>{getLastActivityText()}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 ml-4">
              <Button
                onClick={handleMessage}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <ChatBubbleLeftRightIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Message</span>
              </Button>
              
              <Button
                onClick={handleViewProfile}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <EyeIcon className="h-4 w-4" />
                <span className="hidden sm:inline">View</span>
              </Button>

              {/* Disconnect Button (shown on hover or in dropdown) */}
              <div className="relative group">
                <button
                  onClick={handleDisconnect}
                  disabled={isLoading}
                  className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  title="Disconnect"
                >
                  <UserMinusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Stats */}
      {connection.mutualConnections > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            {connection.mutualConnections} mutual connection{connection.mutualConnections !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ConnectionCard;