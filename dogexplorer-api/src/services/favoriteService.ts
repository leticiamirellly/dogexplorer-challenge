import pg from 'pg';
import { cached, redis } from '../utils/redisClient.js';
const FAV_KEY = 'user:favorites';
const favTTL = Number(process.env.FAV_CACHE_TTL ?? 5);

const {
	DATABASE_URL = process.env.DATABASE_URL
} = process.env;

const pool = new pg.Pool({ connectionString: DATABASE_URL });

type FavRow = { breed: string };

async function ensureTable() {
	await pool.query(`
    CREATE TABLE IF NOT EXISTS favorites (
    breed TEXT PRIMARY KEY
    );
`);
}
await ensureTable();

export async function listFavorites(): Promise<string[]> {
	return cached(FAV_KEY, favTTL, async () => {
		const { rows } = await pool.query<FavRow>('SELECT breed FROM favorites ORDER BY breed');
		return rows.map(({ breed }: FavRow) => breed);
	});
}
async function invalidateFavCache() {
	if (redis) await redis.del(FAV_KEY);
}

export async function addFavorite(breed: string) {
	await pool.query('INSERT INTO favorites (breed) VALUES ($1) ON CONFLICT DO NOTHING', [breed]);
	await invalidateFavCache();
}

export async function removeFavorite(breed: string) {
	await pool.query('DELETE FROM favorites WHERE breed = $1', [breed]);
	await invalidateFavCache();
}