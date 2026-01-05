const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("✅ Successfully connected to MongoDB!");

    // Database and Collections
    const db = client.db("fitnesshub");
    const usersCollection = db.collection("users");
    const gymsCollection = db.collection("gyms");
    const messagesCollection = db.collection("messages");

    // ==================== API Routes ====================

    // Health Check
    app.get('/', (req, res) => {
      res.json({ 
        message: 'Fitness Hub Server is running!',
        status: 'active',
        timestamp: new Date().toISOString()
      });
    });

    // ==================== User Routes ====================

    // Get all users
    app.get('/api/users', async (req, res) => {
      try {
        const users = await usersCollection.find().toArray();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Get user by ID
    app.get('/api/users/:id', async (req, res) => {
      try {
        const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Create new user
    app.post('/api/users', async (req, res) => {
      try {
        const newUser = req.body;
        newUser.createdAt = new Date();
        const result = await usersCollection.insertOne(newUser);
        res.status(201).json({ 
          message: 'User created successfully', 
          insertedId: result.insertedId 
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Update user
    app.put('/api/users/:id', async (req, res) => {
      try {
        const updatedData = req.body;
        updatedData.updatedAt = new Date();
        const result = await usersCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: updatedData }
        );
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Delete user
    app.delete('/api/users/:id', async (req, res) => {
      try {
        const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // ==================== Gym Routes ====================

    // Get all gyms
    app.get('/api/gyms', async (req, res) => {
      try {
        const gyms = await gymsCollection.find().toArray();
        res.json(gyms);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Get gym by ID
    app.get('/api/gyms/:id', async (req, res) => {
      try {
        const gym = await gymsCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!gym) {
          return res.status(404).json({ error: 'Gym not found' });
        }
        res.json(gym);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Create new gym
    app.post('/api/gyms', async (req, res) => {
      try {
        const newGym = req.body;
        newGym.createdAt = new Date();
        const result = await gymsCollection.insertOne(newGym);
        res.status(201).json({ 
          message: 'Gym created successfully', 
          insertedId: result.insertedId 
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Update gym
    app.put('/api/gyms/:id', async (req, res) => {
      try {
        const updatedData = req.body;
        updatedData.updatedAt = new Date();
        const result = await gymsCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: updatedData }
        );
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'Gym not found' });
        }
        res.json({ message: 'Gym updated successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Delete gym
    app.delete('/api/gyms/:id', async (req, res) => {
      try {
        const result = await gymsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Gym not found' });
        }
        res.json({ message: 'Gym deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // ==================== Message/Contact Routes ====================

    // Get all messages
    app.get('/api/messages', async (req, res) => {
      try {
        const messages = await messagesCollection.find().sort({ createdAt: -1 }).toArray();
        res.json(messages);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Create new message
    app.post('/api/messages', async (req, res) => {
      try {
        const newMessage = req.body;
        newMessage.createdAt = new Date();
        newMessage.status = 'unread';
        const result = await messagesCollection.insertOne(newMessage);
        res.status(201).json({ 
          message: 'Message sent successfully', 
          insertedId: result.insertedId 
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Mark message as read
    app.patch('/api/messages/:id/read', async (req, res) => {
      try {
        const result = await messagesCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: { status: 'read', readAt: new Date() } }
        );
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'Message not found' });
        }
        res.json({ message: 'Message marked as read' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Delete message
    app.delete('/api/messages/:id', async (req, res) => {
      try {
        const result = await messagesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Message not found' });
        }
        res.json({ message: 'Message deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // ==================== Test Connection ====================
    
    // Ping MongoDB to confirm connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged MongoDB deployment. Connection verified!");

  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

run().catch(console.error);

// Start server
app.listen(port, () => {
  console.log(`🚀 Fitness Hub Server running on port ${port}`);
  console.log(`📡 Server URL: http://localhost:${port}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⚠️  Shutting down server...');
  await client.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});
