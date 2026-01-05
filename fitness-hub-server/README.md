# Fitness Hub Server

Backend API server for Fitness Hub application built with Node.js, Express, and MongoDB Atlas.

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory with:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /` - Server status check

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Gyms
- `GET /api/gyms` - Get all gyms
- `GET /api/gyms/:id` - Get gym by ID
- `POST /api/gyms` - Create new gym
- `PUT /api/gyms/:id` - Update gym
- `DELETE /api/gyms/:id` - Delete gym

### Messages/Contact
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Create new message
- `PATCH /api/messages/:id/read` - Mark message as read
- `DELETE /api/messages/:id` - Delete message

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **ODM:** MongoDB Native Driver
- **Environment:** dotenv
- **CORS:** cors middleware

## Server URL

Default: `http://localhost:5000`
