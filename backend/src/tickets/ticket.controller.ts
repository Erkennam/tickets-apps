import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto, UpdateTicketDto } from '../dto/ticket.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  async findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Patch('/complete/:id')
  async completed(@Param('id') id:string){
    return this.ticketService.completed(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto);
  }
  
  @Get('/user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return this.ticketService.findByUserId(userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }
}
