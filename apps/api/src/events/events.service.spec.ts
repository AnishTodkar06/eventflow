import { it, expect } from 'vitest';
import { EventsService } from './events.service.js';

it('EventsService should return all events', () => {
  const service = new EventsService();
  const events = service.findAll();
  expect(events).toHaveLength(3);
  expect(events[0].id).toBe('evt-001');
  expect(events[0].title).toBe('Sunset Music Festival');
});
