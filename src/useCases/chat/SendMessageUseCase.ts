// src/useCases/chat/SendMessageUseCase.ts
import { Server } from 'socket.io';
import { MessageRepository } from '../../adapters/repositories/MessageRepository';


export class SendMessageUseCase extends Server {

    constructor(private messageRepository) {
        super()
    }

    async execute(senderId: string, receiverId: string, content: string): Promise<void> {
        const timestamp = new Date();
        const message = {
            id: timestamp.getTime().toString(),
            senderId,
            receiverId,
            content,
            timestamp,
        };

        await this.messageRepository.create(message);

        // Notify the receiver in their socket room
        this.to(receiverId).emit('message', message);
    }
}
