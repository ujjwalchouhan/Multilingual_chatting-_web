import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		await mongoose.connect('mongodb+srv://cujjwal315:Sbc7ofPLwJxF65S8@cluster0.dmenfrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
