import { createPinia, setActivePinia } from 'pinia';
import { useFavoritesStore } from '@/stores/favorites';
import { vi } from 'vitest';

vi.mock('@/composables/useApi', () => ({
	useApi: () => ({
		get: vi.fn().mockResolvedValue(['pug']),
		post: vi.fn().mockResolvedValue({}),
		del: vi.fn().mockResolvedValue({}),
	}),
}));

setActivePinia(createPinia());

it('loads, toggles and persists locally', async () => {
	const fav = useFavoritesStore();
	await fav.load();
	expect(fav.breeds).toEqual(['pug']);

	await fav.toggle('pug');
	expect(fav.breeds).toEqual([]);

	await fav.toggle('bulldog');
	expect(fav.breeds).toEqual(['bulldog']);
});
