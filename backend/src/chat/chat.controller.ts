import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/:ticketId')
  async findAll(@Param('ticketId') ticketId: string ) {
    return this.chatService.findAll(ticketId);
  }
}
