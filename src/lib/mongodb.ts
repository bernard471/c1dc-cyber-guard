import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO;

if (!MONGODB_URI) {
    throw new Error("MongoDB URI is required")
}

async function connectDB() {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log('MongoDB already connected');
            return mongoose;
        }
        
        const opts = {
            bufferCommands: true,
        }
        
        const connection = await mongoose.connect(MONGODB_URI!, opts);
        console.log('MongoDB connected successfully');
        return connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export default connectDB;
