// src/useCases/chat/GetMessagesUseCase.ts
import { MessageRepository } from '../../adapters/repositories/MessageRepository';
import { Server } from 'socket.io';
import { IMessage } from '../../interfaces/IMessage';

export class GetMessagesUseCase extends Server {
  constructor(private messageRepository: MessageRepository) {
    super()
  }


  async execute(userId: string, otherUserId: string): Promise<IMessage[]> {
    // Notify both users to join their private room
    this.to(userId).emit('joinRoom', otherUserId);
    this.to(otherUserId).emit('joinRoom', userId);
    return this.messageRepository.findByUserIds(userId, otherUserId);
  }
}
