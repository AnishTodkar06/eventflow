import { Controller, Get, Param, NotFoundException, Query } from '@nestjs/common';
import { EventsService } from './events.service.js';
import type { Event } from './event.interface.js';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@Query('search') search?: string): Event[] {
    return this.eventsService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Event {
    const event = this.eventsService.findOne(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }
}
