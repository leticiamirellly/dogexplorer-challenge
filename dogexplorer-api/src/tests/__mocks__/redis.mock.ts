import { vi } from 'vitest';
export const redisMock = {
	get: vi.fn(),
	set: vi.fn(),
	del: vi.fn(),
	ping: vi.fn(),
};

export const cachedMock = vi.fn(async (key, _ttl, fetcher) => {
	const hit = await redisMock.get(key);
	return hit !== null && hit !== undefined
		? JSON.parse(hit as string)
		: fetcher();
});

vi.mock('../../../src/utils/redisClient', () => ({
	redis: redisMock,
	cached: cachedMock,
}));