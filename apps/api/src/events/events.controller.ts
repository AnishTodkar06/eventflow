import { Controller, Get } from '@nestjs/common';
import { EventsService } from './events.service.js';
import type { Event } from './event.interface.js';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(): Event[] {
    return this.eventsService.findAll();
  }
}
