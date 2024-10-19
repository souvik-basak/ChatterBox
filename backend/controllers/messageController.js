import Conversation from "../model/conversationModel.js";
import Message from "../model/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
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

    // socket functionality

    // await conversation.save();
    // await newMessage.save();

    // it will run simultaneously
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json({ status: true, newMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: UserToChatId } = req.params;
    const senderID = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderID, UserToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res
        .status(404)
        .json({ status: false, message: "No conversation found" });
    }
    const messages = conversation.messages;

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
};
