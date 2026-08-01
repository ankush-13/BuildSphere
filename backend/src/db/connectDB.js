import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
    try {

        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ MongoDB Connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;