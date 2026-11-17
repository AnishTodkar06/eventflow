import { it, expect } from 'vitest';
import { BadRequestException } from '@nestjs/common';
import { OptionalStringPipe } from './optional-string.pipe.js';

it('accepts a string query parameter without changing it', () => {
    const pipe = new OptionalStringPipe();

    expect(pipe.transform('Music')).toBe('Music');
    expect(pipe.transform(' Music ')).toBe(' Music ');
    expect(pipe.transform('')).toBe('');
});

it('accepts an omitted query parameter', () => {
    const pipe = new OptionalStringPipe();

    expect(pipe.transform(undefined)).toBeUndefined();
});

it.each([
    ['repeated values', ['Music', 'Comedy']],
    ['numbers', 123],
    ['objects', { category: 'Music' }],
])('rejects %s', (_description, value) => {
    const pipe = new OptionalStringPipe();

    expect(() => pipe.transform(value)).toThrow(BadRequestException);
});
