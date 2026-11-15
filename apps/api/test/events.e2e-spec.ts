import { Test, type TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('EventsController (e2e)', () => {
    let app: INestApplication<App>;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api');
        await app.init();
    });

    it('GET /api/events should return all events', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/events')
            .expect(200)
            .expect('Content-Type', /json/);

        const body: unknown = response.body;

        expect(Array.isArray(body)).toBe(true);
        expect(body).toMatchObject([
            {
                id: 'evt-001',
                title: 'Sunset Music Festival',
            },
            {
                id: 'evt-002',
                title: 'Tech Innovators Conference',
            },
            {
                id: 'evt-003',
                title: 'Standup Comedy Night',
            },
        ]);
    });

    it('GET /api/events/:id returns an existing event', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/events/evt-001')
            .expect(200)
            .expect('Content-Type', /json/);

        const body: unknown = response.body;

        expect(body).toMatchObject({
            id: 'evt-001',
            title: 'Sunset Music Festival',
        });
    });

    it('GET /api/events/:id returns 404 for a missing event', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/events/non-existent-id')
            .expect(404);
        const body: unknown = response.body;

        expect(body).toMatchObject({
            message: 'Event not found',
        });
    });

    it('GET /api/events with search query returns filtered events', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/events?search=music')
            .expect(200)
            .expect('Content-Type', /json/);

        const body: unknown = response.body;

        expect(Array.isArray(body)).toBe(true);
        expect(body).toMatchObject([
            {
                id: 'evt-001',
                title: 'Sunset Music Festival',
            },
        ]);
    });

    it('GET /api/events with category query returns filtered events', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/events?category=Music')
            .expect(200)
            .expect('Content-Type', /json/);

        const body: unknown = response.body;

        expect(Array.isArray(body)).toBe(true);
        expect(body).toMatchObject([
            {
                id: 'evt-001',
                category: 'Music',
            },
        ]);
    });

    it('GET /api/events with search and category queries applies both filters', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/events?search=festival&category=Music')
            .expect(200)
            .expect('Content-Type', /json/);

        const body: unknown = response.body;

        expect(Array.isArray(body)).toBe(true);
        expect(body).toMatchObject([
            {
                id: 'evt-001',
                title: 'Sunset Music Festival',
            },
        ]);
    });

    it('GET /api/events?search=football returns empty array for no matches', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/events?search=football')
            .expect(200)
            .expect('Content-Type', /json/);

        const body: unknown = response.body;

        expect(body).toEqual([]);
    });

    it('GET /api/events with conflicting filters returns an empty array', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/events?search=conference&category=Music')
            .expect(200)
            .expect('Content-Type', /json/);

        const body: unknown = response.body;

        expect(body).toEqual([]);
    });

    afterAll(async () => {
        await app.close();
    });
});
