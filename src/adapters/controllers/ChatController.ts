// src/adapters/controllers/ChatController.ts
import { Request, Response } from 'express';
import { SendMessageUseCase } from '../../useCases/chat/SendMessageUseCase';
import { GetMessagesUseCase } from '../../useCases/chat/GetMessagesUseCase';
import { Socket } from 'socket.io';

export class ChatController {
    constructor(
        private sendMessageUseCase: SendMessageUseCase,
        private getMessagesUseCase: GetMessagesUseCase,
    ) { }

    async sendMessage(req: Request, res: Response): Promise<void> {
        const { senderId, receiverId, content } = req.body;

        try {
            await this.sendMessageUseCase.execute(senderId, receiverId, content);
            res.status(200).json({ message: 'Message sent successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }

    async getMessages(req: Request, res: Response): Promise<void> {
        const { userId, otherUserId } = req.params;

        try {
            const messages = await this.getMessagesUseCase.execute(userId, otherUserId);
            res.status(200).json({ messages });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }

    // Socket connection handler
    handleSocketConnection(socket: Socket): void {
        console.log(`User ${socket.id} connected`);

        socket.on('joinRoom', (roomId: string) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
        });

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`);
        });
    }
}
