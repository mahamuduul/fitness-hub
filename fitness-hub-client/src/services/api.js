// API Service for Fitness Hub
const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ==================== User API ====================
export const userAPI = {
  getAll: () => apiRequest('/users'),
  
  getById: (id) => apiRequest(`/users/${id}`),
  
  create: (userData) => apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  update: (id, userData) => apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  
  delete: (id) => apiRequest(`/users/${id}`, {
    method: 'DELETE',
  }),
};

// ==================== Gym API ====================
export const gymAPI = {
  getAll: () => apiRequest('/gyms'),
  
  getById: (id) => apiRequest(`/gyms/${id}`),
  
  create: (gymData) => apiRequest('/gyms', {
    method: 'POST',
    body: JSON.stringify(gymData),
  }),
  
  update: (id, gymData) => apiRequest(`/gyms/${id}`, {
    method: 'PUT',
    body: JSON.stringify(gymData),
  }),
  
  delete: (id) => apiRequest(`/gyms/${id}`, {
    method: 'DELETE',
  }),
};

// ==================== Message API ====================
export const messageAPI = {
  getAll: () => apiRequest('/messages'),
  
  create: (messageData) => apiRequest('/messages', {
    method: 'POST',
    body: JSON.stringify(messageData),
  }),
  
  markAsRead: (id) => apiRequest(`/messages/${id}/read`, {
    method: 'PATCH',
  }),
  
  delete: (id) => apiRequest(`/messages/${id}`, {
    method: 'DELETE',
  }),
};

// Health check
export const checkServerHealth = () => fetch('http://localhost:5000/')
  .then(res => res.json())
  .catch(error => ({ error: error.message }));
