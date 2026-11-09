import { Test, type TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('EventsController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
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

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(3);
        expect(response.body[0].id).toBe('evt-001');
        expect(response.body[0].title).toBe('Sunset Music Festival');
    });

    it('GET /api/events/:id returns an existing event', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/events/evt-001')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toBeDefined();
        expect(response.body.id).toBe('evt-001');
        expect(response.body.title).toBe('Sunset Music Festival');
    });

    it('GET /api/events/:id returns 404 for a missing event', async () => {
        const response = await request(app.getHttpServer())
            .get('/api/events/non-existent-id')
            .expect(404);
        expect(response.body.message).toBe('Event not found');
    });

    afterEach(async () => {
        await app.close();
    });
});
