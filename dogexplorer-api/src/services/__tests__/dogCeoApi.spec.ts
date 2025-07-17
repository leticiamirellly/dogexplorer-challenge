import '../../tests/__mocks__/redis.mock';
import '../../tests/__mocks__//axios.mock';

import { it, expect, beforeEach } from 'vitest';
import {
	fetchBreeds,
	fetchBreedImages,
} from '../../../src/services/dogCeoApi';
import { getMock } from '../../tests/__mocks__/axios.mock';

beforeEach(() => {
	getMock.mockReset();
});

it('fetches breeds and caches in Redis', async () => {
	getMock.mockResolvedValueOnce({
		data: { message: { husky: {}, pug: {} } },
	});

	const list = await fetchBreeds();
	expect(list).toEqual(['husky', 'pug']);
	expect(getMock).toHaveBeenCalledTimes(1);
});

it('fetches images', async () => {
	getMock.mockResolvedValueOnce({
		data: { message: ['a.jpg', 'b.jpg', 'c.jpg'] },
	});

	const imgs = await fetchBreedImages('husky');
	expect(imgs).toEqual(['a.jpg', 'b.jpg', 'c.jpg']);
});
