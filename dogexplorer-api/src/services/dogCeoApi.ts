import axios from 'axios';
import { lru } from '../utils/lru.js';
import { cached } from '../utils/redisClient.js';
const BREEDS_KEY = 'dog:breeds';
const IMG_KEY = (breed: string) => `dog:${breed}:images`;
const ttl = Number(process.env.DOG_API_TTL ?? 900);

const http = axios.create({
	baseURL: 'https://dog.ceo/api',
	timeout: 5000,
});

export async function fetchBreeds(): Promise<string[]> {
	return cached(BREEDS_KEY, ttl, async () => {
		const { data } = await http.get<{ message: Record<string, unknown> }>('/breeds/list/all');
		return Object.keys(data.message);
	});
}

export async function fetchBreedImages(breed: string): Promise<string[]> {
	return cached(IMG_KEY(breed), ttl, async () => {
		const { data } = await http.get<{ message: string[] }>(`/breed/${breed}/images/random/3`);
		return data.message;
	});
}
