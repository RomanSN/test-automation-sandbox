import { connect } from 'mongoose';

export async function connectDB() {
  const isProd = process.env.NODE_ENV === 'production';
  const dataBaseName = isProd ? 'tas_db' : 'tas_db_stage';
  try {
    await connect(process.env.MONGO_URL, {
      dbName: dataBaseName,
    });
    console.log('MongoDB connected!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}
