import { connect } from 'mongoose';

export async function connectDB() {
  try {
    await connect(process.env.MONGO_URL, {
      dbName: 'tas_db',
    });
    console.log('MongoDB connected!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}
