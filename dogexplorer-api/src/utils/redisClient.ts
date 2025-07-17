import Redis from 'ioredis';

const { REDIS_URL } = process.env;

export const redis = REDIS_URL ? new Redis(REDIS_URL) : null;

export async function cached<T>(
	key: string,
	ttl: number,
	fetcher: () => Promise<T>,
): Promise<T> {
	if (!redis) return fetcher();
	const cached = await redis.get(key);
	if (cached) return JSON.parse(cached) as T;

	const fresh = await fetcher();
	await redis.set(key, JSON.stringify(fresh), 'EX', ttl);
	return fresh;
}
