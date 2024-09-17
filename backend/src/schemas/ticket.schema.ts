import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({required: true})
  ticketId: string;

  @Prop({ required: true })
  status: string; 

  @Prop({ required: true })
  type: string; 

  @Prop({ required: true })
  priority: string; 

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({type: Types.ObjectId, ref: 'User',required: true})
  user: Types.ObjectId | User;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
