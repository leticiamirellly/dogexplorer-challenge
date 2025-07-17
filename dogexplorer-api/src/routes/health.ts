import { FastifyInstance } from 'fastify';

export async function healthRoutes(app: FastifyInstance) {
	app.get('/health', async (_req, reply) => {
		return reply.code(200).send({ ok: true });
	});

}
