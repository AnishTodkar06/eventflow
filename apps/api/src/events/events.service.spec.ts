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

it('Verify findAll returns filtered events based on search query', () => {
    const service = new EventsService();
    const nonfilteredEvents = service.findAll();
    const filteredEvents = service.findAll({search: 'music'});
    expect(nonfilteredEvents).toHaveLength(3);
    expect(filteredEvents).toHaveLength(1);
    expect(filteredEvents[0].title).toBe('Sunset Music Festival');
    // Verify its case insensitive
    const filteredEventsCaseInsensitive = service.findAll({search: 'MUSIC'});
    expect(filteredEventsCaseInsensitive).toHaveLength(1);
    expect(filteredEventsCaseInsensitive[0].title).toBe('Sunset Music Festival');
    //Blank search query should return every event
    const filteredEventsCaseInsensitiveWithSpaces = service.findAll({search: '  MUSIC  '});
    expect(filteredEventsCaseInsensitiveWithSpaces).toHaveLength(1);
    expect(filteredEventsCaseInsensitiveWithSpaces[0].title).toBe('Sunset Music Festival');
    const filteredEventsBlank = service.findAll({search:''});
    expect(filteredEventsBlank).toHaveLength(3);
    const filteredEventsBlankWithSpaces = service.findAll({search: '  '});
    expect(filteredEventsBlankWithSpaces).toHaveLength(3);
    const results = service.findAll({search: 'football'});
    expect(results).toEqual([]);
});

it('Verify findAll filters by category when search is omitted', () => {
    const service = new EventsService();
    const events = service.findAll({category: 'Music'});

    expect(events).toHaveLength(1);
    expect(events[0].title).toBe('Sunset Music Festival');
});

it('Verify findAll matches categories case-insensitively', () => {
    const service = new EventsService();
    const events = service.findAll({category: 'mUsIc'});

    expect(events).toHaveLength(1);
    expect(events[0].category).toBe('Music');
});

it('Verify findAll combines search and category filters', () => {
    const service = new EventsService();
    const events = service.findAll({search: 'festival', category: 'Music'});

    expect(events).toHaveLength(1);
    expect(events[0].title).toBe('Sunset Music Festival');
    expect(service.findAll({search: 'conference', category: 'Music'})).toEqual([]);
});

it('Verify findAll requires an exact category match', () => {
    const service = new EventsService();
    expect(service.findAll({category: 'Mus'})).toEqual([]);
    expect(service.findAll({category: 'Sports'})).toEqual([]);

    const events = service.findAll({category: ' Music '});
    expect(events).toHaveLength(1);
    expect(events[0].title).toBe('Sunset Music Festival');

    const eventsWithBlankCategory = service.findAll({category: ' '});
    expect(eventsWithBlankCategory).toHaveLength(3);
});
