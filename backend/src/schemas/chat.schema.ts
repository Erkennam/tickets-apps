import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';
import { Ticket } from './ticket.schema';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({type: Types.ObjectId, ref: 'User',required: true})
  sender: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({type: Types.ObjectId, ref: 'Ticket', required: true})
  ticket: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
