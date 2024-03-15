import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import translate from "node-google-translate-skidz";


export const sendMessage = async (req, res) => {


	try {
		const { message, rec_lang } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}
		// await conversation.save();
		// await newMessage.save();

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client

			//---------------------------------------------------------------------

			const translationResult = await translate({
				text: message,
				source: 'auto',   // Source language (e.g., English)
				target: rec_lang     // Target language (e.g., Spanish)
			});
			//console.log(newMessage.message);
			console.log(translationResult.translation);
			if (translationResult && translationResult.translation) {
				const translatedMessage = translationResult.translation;

				io.to(receiverSocketId).emit("newMessage", {
					...newMessage.toObject(),
					message: translatedMessage
				});
			} else {
				io.to(receiverSocketId).emit("newMessage", newMessage);
			}
			//----------------------------------------------------------------------
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;
		const { language } = req.body;
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);
		const messages = conversation.messages;
		/*--------------------------------------------------------------------------------*/
		const messageTexts = messages.map(message => message.message);
		const translatedMessages = await translateArray(messageTexts, language);

		const translatedConversation = messages.map((message, index) => ({
			...message.toObject(), // Convert Mongoose document to plain object
			message: translatedMessages[index] // Replace the message text with translated text
		}));

		/*------------------------------------------------------------------------------*/
		res.status(200).json(translatedConversation);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

async function translateArray(strings, language) {
	try {
		const translatedStrings = [];
		console.log(language);
		for (const string of strings) {
			const translation = await translate({

				text: string,
				source: 'auto',   // Source language (e.g., English)
				target: language    // Target language (e.g., Spanish)
			}, function (result) {
				translatedStrings.push(result.translation);
			});
		}
		return translatedStrings;
	} catch (error) {
		console.error('Translation error:', error);
		throw error;
	}
}