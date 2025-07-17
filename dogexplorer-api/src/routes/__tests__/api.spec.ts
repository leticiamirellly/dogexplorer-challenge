import { it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../../app';
import supertest from 'supertest';

let app: Awaited<ReturnType<typeof buildApp>>;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
	app = buildApp();
	await app.ready();
	request = supertest(app.server);
});

afterAll(() => app.close());

it('GET /api/health', async () => {
	const res = await request.get('/api/health');
	expect(res.status).toBe(200);
	expect(res.body.ok).toBe(true);
});
