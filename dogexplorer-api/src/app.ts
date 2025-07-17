import Fastify from 'fastify';
import cors from '@fastify/cors';
import { breedsRoutes } from './routes/breeds.js';
import { favoritesRoutes } from './routes/favorites.js';
import { healthRoutes } from './routes/health.js';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';

export function buildApp() {
	const app = Fastify({ logger: true });

	app.register(helmet, {
		global: true,
	});

	// const FRONT_ORIGIN = process.env.FRONTEND_ORIGIN ?? 'http://localhost'; run PRD
	app.register(cors, {
		origin: true, // Run local
		// credentials: true,
	});


	app.register(rateLimit, {
		max: 30,
		timeWindow: '1 minute',
		allowList: ['127.0.0.1'],
		addHeaders: {
			'x-ratelimit-limit': true,
			'x-ratelimit-remaining': true,
			'x-ratelimit-reset': true,
		},
		ban: 0,
		keyGenerator: req => req.ip,
		hook: 'onRequest',
	});

	app.register(breedsRoutes, { prefix: '/api' });
	app.register(favoritesRoutes, { prefix: '/api' });
	app.register(healthRoutes, { prefix: '/api' });

	app.setNotFoundHandler((_, reply) =>
		reply.code(404).send({ error: 'Not found' }),
	);


	return app;
}
