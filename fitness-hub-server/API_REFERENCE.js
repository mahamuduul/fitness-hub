// API Reference for Fitness Hub Backend
// All routes are prefixed with the base URL: http://localhost:5000

// ==================== HEALTH CHECK ====================
// GET / - Check if server is running
// Response: { message, status, timestamp }

// ==================== USERS ====================
// GET /api/users - Get all users
// GET /api/users/:id - Get specific user
// POST /api/users - Create new user
//   Body: { name, email, role, etc. }
// PUT /api/users/:id - Update user
//   Body: { field: value }
// DELETE /api/users/:id - Delete user

// ==================== GYMS ====================
// GET /api/gyms - Get all gyms
// GET /api/gyms/:id - Get specific gym
// POST /api/gyms - Create new gym
//   Body: { name, location, facilities, price, etc. }
// PUT /api/gyms/:id - Update gym
//   Body: { field: value }
// DELETE /api/gyms/:id - Delete gym

// ==================== MESSAGES ====================
// GET /api/messages - Get all contact messages (sorted by newest)
// POST /api/messages - Create new message
//   Body: { name, email, message }
// PATCH /api/messages/:id/read - Mark message as read
// DELETE /api/messages/:id - Delete message

// ==================== DATABASE COLLECTIONS ====================
// Database: fitnessHub
// Collections:
//   - users
//   - gyms
//   - messages

// ==================== EXAMPLE USAGE ====================

// Example: Create a new gym
/*
fetch('http://localhost:5000/api/gyms', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'PowerFit Gym',
    location: 'Downtown',
    facilities: ['Weights', 'Cardio', 'Pool'],
    price: 50,
    rating: 4.5
  })
})
.then(res => res.json())
.then(data => console.log(data));
*/

// Example: Get all messages
/*
fetch('http://localhost:5000/api/messages')
  .then(res => res.json())
  .then(data => console.log(data));
*/

// Example: Send contact message
/*
fetch('http://localhost:5000/api/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'I would like to know more about your services.'
  })
})
.then(res => res.json())
.then(data => console.log(data));
*/
