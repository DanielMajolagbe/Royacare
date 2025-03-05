import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

// Skip MongoDB connection during build time
const isBuildTime = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL && !isBuildTime) {
  throw new Error('Please define the MONGODB_URL environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<mongoose.Mongoose> {
  try {
    // During build time, return a mock connection
    if (isBuildTime) {
      return {} as mongoose.Mongoose;
    }

    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        retryWrites: true,
        retryReads: true,
        connectTimeoutMS: 30000,
      };

      if (!MONGODB_URL) {
        throw new Error('MONGODB_URL is undefined');
      }

      cached.promise = mongoose.connect(MONGODB_URL, opts).catch((error) => {
        console.error('MongoDB connection error in promise:', error);
        cached.promise = null;
        throw error;
      });
    }

    try {
    const mongoose_instance = await cached.promise;
    cached.conn = mongoose_instance;

    // Add error handlers
    mongoose_instance.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      cached.promise = null;
        cached.conn = null;
    });

    mongoose_instance.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      cached.conn = null;
      cached.promise = null;
    });

    return mongoose_instance;
  } catch (error) {
      console.error('Error awaiting MongoDB connection:', error);
      cached.promise = null;
      cached.conn = null;
      throw error;
    }
  } catch (error) {
    console.error('MongoDB connection error in main try block:', error);
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
}

export default connectDB;

export async function connectToDatabase() {
  try {
    // During build time, return a mock database connection
    if (isBuildTime) {
      return {
        db: {} as any,
        client: {} as any
      };
    }

    const mongooseInstance = await connectDB();
    const db = mongooseInstance.connection?.db;
    
    if (!db) {
      throw new Error('Database not initialized');
    }
    
    return { 
      db,
      client: mongooseInstance.connection 
    };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error(`Unable to connect to database: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function closeDatabaseConnection() {
  try {
    if (cached.conn) {
      await mongoose.connection.close();
      cached.conn = null;
      cached.promise = null;
    }
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
}

// Cleanup on app termination
process.on('SIGINT', async () => {
  await closeDatabaseConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeDatabaseConnection();
  process.exit(0);
});