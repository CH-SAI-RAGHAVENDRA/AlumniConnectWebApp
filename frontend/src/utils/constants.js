export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/user/login',
    REGISTER: '/user/register',
    LOGOUT: '/user/logout',
    ME: '/user/me',
  },
  USERS: {
    PROFILE: '/user/profile',
    FOLLOW: '/user/follow',
    SEARCH: '/user/search',
    ALUMNI: '/user/alumni',
  },
  POSTS: {
    ALL: '/post/all',
    CREATE: '/post/create',
    SINGLE: '/post/:id',
    UPDATE: '/post/:id',
    DELETE: '/post/:id',
    LIKE: '/post/like/:id',
    COMMENT: '/post/comment/:id',
  },
};

export const USER_ROLES = {
  STUDENT: 'student',
  ALUMNI: 'alumni',
};

export const POST_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  LINK: 'link',
};

export const NOTIFICATION_TYPES = {
  LIKE: 'like',
  COMMENT: 'comment',
  FOLLOW: 'follow',
  MESSAGE: 'message',
  POST: 'post',
};

export const DEPARTMENTS = [
  'Computer Science',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Other'
];

export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Internship',
  'Contract',
  'Freelance',
];

export const LOCATIONS = [
  'Bangalore',
  'Hyderabad',
  'Mumbai',
  'Delhi',
  'Chennai',
  'Pune',
  'Remote',
];

export const PRIVACY_SETTINGS = {
  PROFILE_VISIBILITY: {
    PUBLIC: 'public',
    CONNECTIONS: 'connections',
    ALUMNI: 'alumni',
    PRIVATE: 'private',
  },
  MESSAGE_PERMISSIONS: {
    EVERYONE: 'everyone',
    CONNECTIONS: 'connections',
    ALUMNI: 'alumni',
    NONE: 'none',
  },
};

export const FILE_UPLOAD = {
  MAX_SIZE: 2 * 1024 * 1024, // 2MB
  ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
};

export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50,
};

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  BIO_MAX_LENGTH: 500,
  POST_MAX_LENGTH: 2000,
  COMMENT_MAX_LENGTH: 500,
};