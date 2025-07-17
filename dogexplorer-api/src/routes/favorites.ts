import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import {
	listFavorites,
	addFavorite,
	removeFavorite,
} from '../services/favoriteService.js';

export async function favoritesRoutes(app: FastifyInstance) {
	app.get('/favorites', async (_req, reply) => {
		return reply.send(await listFavorites());
	});

	app.post('/favorites', async (req, reply) => {
		const body = z.object({ breed: z.string() }).parse(req.body);
		await addFavorite(body.breed);
		return reply.code(201).send({ ok: true });
	});

	app.delete('/favorites/:breed', async (req, reply) => {
		const params = z.object({ breed: z.string() }).parse(req.params);
		await removeFavorite(params.breed);
		return reply.send({ ok: true });
	});
}
