import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { fetchBreeds, fetchBreedImages } from '../services/dogCeoApi.js';

export async function breedsRoutes(app: FastifyInstance) {
	app.get('/breeds', async (_req, reply) => {
		const breeds = await fetchBreeds();
		return reply.send(breeds);
	});

	app.get('/breeds/:breed/images', async (req, reply) => {
		const params = z.object({ breed: z.string() }).parse(req.params);
		const imgs = await fetchBreedImages(params.breed);
		return reply.send(imgs);
	});
}
