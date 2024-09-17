import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TicketModule } from './tickets/ticket.module';
import { ChatModule } from './chat/chat.module';
import { MyWebSocketGateway } from "./chat/websocket.module"
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/ticketBase'),
    UsersModule,
    TicketModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, MyWebSocketGateway], 
})
export class AppModule {}
