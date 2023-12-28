// src/adapters/repositories/MessageRepository.ts
import Message from '../../models/Message';
import { IMessage } from '../../interfaces/IMessage';

export class MessageRepository {
    async create(message: IMessage): Promise<void> {
        await Message.create(message);
    }

    async findByUserIds(userId1: string, userId2: string): Promise<IMessage[]> {
        const messages = await Message.find({
            $or: [
                { senderId: userId1, receiverId: userId2 },
                { senderId: userId2, receiverId: userId1 },
            ],
        }).sort({ timestamp: 1 });

        return messages;
    }
}
