import { it, expect, beforeEach } from 'vitest';
import { pgMock } from '../../tests/__mocks__/pg.mock';
import { redisMock } from '../../tests/__mocks__/redis.mock';

import {
	listFavorites,
	addFavorite,
	removeFavorite,
} from '../../services/favoriteService';


beforeEach(() => {
	pgMock.query.mockReset();
	redisMock.get.mockReset();
	redisMock.del.mockReset();
});

it('lists favorites (with cache hit)', async () => {
	redisMock.get.mockResolvedValueOnce(JSON.stringify(['husky']));

	const favs = await listFavorites();
	expect(favs).toEqual(['husky']);
	expect(pgMock.query).not.toHaveBeenCalled();
});

it('adds and removes favorite and invalidates cache', async () => {
	await addFavorite('pug');
	await removeFavorite('husky');

	expect(pgMock.query).toHaveBeenCalledTimes(2);
	expect(redisMock.del).toHaveBeenCalledTimes(2);
});