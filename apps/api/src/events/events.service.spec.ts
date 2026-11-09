import { it, expect } from 'vitest';
import { EventsService } from './events.service.js';

it('EventsService should return all events', () => {
  const service = new EventsService();
  const events = service.findAll();
  expect(events).toHaveLength(3);
  expect(events[0].id).toBe('evt-001');
  expect(events[0].title).toBe('Sunset Music Festival');
});

it('Verify findOne returns correct event title', () => {
    const service = new EventsService();
    const event = service.findOne('evt-001');
    expect(event).toBeDefined();
    expect(event?.id).toBe('evt-001');
    expect(event?.title).toBe('Sunset Music Festival');
  });

it('Verify findOne returns undefined for non-existent event', () => {
    const service = new EventsService();
    const event = service.findOne('non-existent-id');
    expect(event).toBeUndefined();
  });
