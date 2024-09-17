import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from '../schemas/ticket.schema';
import { CreateTicketDto, UpdateTicketDto } from '../dto/ticket.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    private userService: UsersService
  ) {}
  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const createdTicket = new this.ticketModel(createTicketDto);
    return createdTicket.save();
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().populate('user').exec();
  }

  async findByUserId(userId: string): Promise<Ticket[]> {
    try {
      const tickets = await this.ticketModel.find({ user: userId }).populate('user').exec();
      return tickets;
    } catch (error) {
      console.error('Error finding tickets by user ID:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const date = new Date();
    const updatedTicket = await this.ticketModel.findByIdAndUpdate(id, {...updateTicketDto,createdAt: date}, { new: true }).exec();
    if (!updatedTicket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return updatedTicket;
  }

  async remove(id: string): Promise<Ticket> {
    const deletedTicket = await this.ticketModel.findByIdAndDelete(id).exec();
    if (!deletedTicket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return deletedTicket;
  }
  
  async completed(id:string): Promise<Ticket>{
    const date = new Date();
    const completedTicket = await this.ticketModel.findByIdAndUpdate(id,{status: 'выполненно',createdAt:date});
    if(!completedTicket){
      throw new NotFoundException('ticket not found');
    }
    return completedTicket;
  }
}
