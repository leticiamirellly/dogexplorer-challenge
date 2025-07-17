import { vi } from 'vitest';

const pgMock = { query: vi.fn() };
vi.mock('pg', () => ({
	default: { Pool: vi.fn(() => pgMock) },
}));

const redisMock = {
	get: vi.fn().mockResolvedValue(null),
	set: vi.fn().mockResolvedValue('OK'),
	del: vi.fn(),
	ping: vi.fn().mockResolvedValue('PONG'),
};
vi.mock('ioredis', () => ({
	default: vi.fn(() => redisMock),
}));

const axiosMock = { get: vi.fn(), post: vi.fn(), delete: vi.fn() };
vi.mock('axios', () => ({
	default: { create: () => axiosMock },
}));

export { pgMock, redisMock, axiosMock };
