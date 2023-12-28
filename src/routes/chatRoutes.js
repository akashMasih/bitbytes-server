// src/routes/chatRoutes.ts
import express from 'express';
import { ChatController } from '../adapters/controllers/ChatController';
import { verifyToken } from '../adapters/middlewares/AuthMiddleware';
import { SendMessageUseCase } from '../useCases/chat/SendMessageUseCase';
import { GetMessagesUseCase } from '../useCases/chat/GetMessagesUseCase';
import { MessageRepository } from '../adapters/repositories/MessageRepository';
import { login } from '../adapters/controllers/authController';

const router = express.Router();

// Instantiate necessary dependencies
const messageRepository = new MessageRepository();
const sendMessageUseCase = new SendMessageUseCase(messageRepository);
const getMessagesUseCase = new GetMessagesUseCase(messageRepository);
const chatController = new ChatController(sendMessageUseCase, getMessagesUseCase);

// API endpoint to send a message
router.post('/send-message', verifyToken, (req, res) => {
    chatController.sendMessage(req, res);
});

// API endpoint to get messages between two users
router.get('/get-messages/:userId/:otherUserId', verifyToken, (req, res) => {
    chatController.getMessages(req, res);
});


export default router;
