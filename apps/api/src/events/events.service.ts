import { Injectable } from '@nestjs/common';
import type { Event } from './event.interface.js';

@Injectable()
export class EventsService {
    private readonly events: Event[] = [
        {
            id: 'evt-001',
            title: 'Sunset Music Festival',
            date: '2026-12-15',
            location: 'Mumbai',
            price: 999,
            description: 'Join us for an amazing sunset music festival!',
            category: 'Music',
            venue: 'Riverside Arena',
            imageUrl: '/images/sunset-music-festival.jpg'
        },
        {
            id: 'evt-002',
            title: 'Tech Innovators Conference',
            date: '2026-12-20',
            location: 'Pune',
            price: 1499,
            description: 'Join us for an amazing tech innovators conference!',
            category: 'Technology',
            venue: 'Pune Convention Center',
            imageUrl: '/images/tech-conference.jpg'
        },
        {
            id: 'evt-003',
            title: 'Standup Comedy Night',
            date: '2027-01-10',
            location: 'Hyderabad',
            price: 499,
            description: 'Laugh out loud with the best standup comedians!',
            category: 'Comedy',
            venue: 'Laugh Lounge',
            imageUrl: '/images/comedy-night.jpg'
        },
    ];

    public findAll(search?: string): Event[] {
        const normalizedSearch = search?.trim().toLowerCase();
        if (!normalizedSearch) {
            return [...this.events];
        }
        return this.events.filter((event) =>
            event.title.toLowerCase().includes(normalizedSearch)
        );
    }

    public findOne(id: string): Event | undefined {
        return this.events.find((event) => event.id === id);
    }
}
