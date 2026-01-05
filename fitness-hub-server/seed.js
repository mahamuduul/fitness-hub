// Seed data for MongoDB - Run this to populate initial gym data
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const gymData = [
  {
    name: 'Muscle Care Gym',
    location: 'Rajshahi',
    hours: '7:00–22:00',
    trainers: 'Mim (Strength)',
    phone: '01700-000000',
    image: '/health-fitness-hub-updated/assets/images/gym1.jpg',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3634.3323137113116!2d88.5726558!3d24.3697405!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbef1f59523c69%3A0xf0088928fb4fc143!2sMuscle%20Care%20Gym!5e0!3m2!1sen!2sde!4v1757417654870!5m2!1sen!2sde',
    createdAt: new Date()
  },
  {
    name: 'Fitlife Gym - Kadirganj Branch',
    location: 'Rajshahi',
    hours: '6:00–23:00',
    trainers: 'Rumi (Weight Loss)',
    phone: '01800-000000',
    image: '/health-fitness-hub-updated/assets/images/gym2.jpg',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.193527948253!2d88.5998906!3d24.374570199999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbef5e1542e94d%3A0x475194d02eb509e7!2sFitlife%20Gym%20-%20Kadirganj%20Branch!5e0!3m2!1sen!2sde!4v1757455929259!5m2!1sen!2sde',
    createdAt: new Date()
  },
  {
    name: 'Fitness Zone Rajshahi-New Market Branch',
    location: 'Rajshahi',
    hours: '8:00–21:00',
    trainers: 'Jitu (CrossFit), Omi (Mobility)',
    phone: '01600-000000',
    image: '/health-fitness-hub-updated/assets/images/gym3.jpg',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.2360770625246!2d88.6012631!3d24.3730896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefa313de8807%3A0x248e098f99a76a04!2sFitness%20Zone%20Rajshahi-New%20Market%20Branch!5e0!3m2!1sen!2sde!4v1757455986640!5m2!1sen!2sde',
    createdAt: new Date()
  }
];

async function seedDatabase() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('fitnesshub');
    const gymsCollection = db.collection('gyms');

    // Clear existing gyms
    await gymsCollection.deleteMany({});
    console.log('🗑️  Cleared existing gym data');

    // Insert new gyms
    const result = await gymsCollection.insertMany(gymData);
    console.log(`✅ Inserted ${result.insertedCount} gyms`);

    console.log('\n📋 Gym data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await client.close();
    console.log('👋 Connection closed');
  }
}

seedDatabase();
