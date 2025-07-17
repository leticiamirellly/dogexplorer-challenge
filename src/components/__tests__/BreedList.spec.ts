import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { expect, it, vi } from 'vitest';
import BreedList from '@/components/BreedList.vue';
import { useFavoritesStore } from '@/stores/favorites';

vi.mock('axios', () => import('@/tests/__mocks__/axios'));
vi.mock('@/composables/useApi', () => ({
	useApi: () => ({
		get: vi.fn().mockResolvedValue([]),
		post: vi.fn().mockResolvedValue({}),
		del: vi.fn().mockResolvedValue({}),
	}),
}));

setActivePinia(createPinia());

it('emits "select" and toggles favorite', async () => {
	const wrapper = mount(BreedList, { props: { breeds: ['husky'], showFav: true } });

	await wrapper.find('li').trigger('click');
	expect(wrapper.emitted('select')![0]).toEqual(['husky']);

	await wrapper.find('button').trigger('click');
	await flushPromises();                 // wait for async toggle()

	expect(useFavoritesStore().breeds).toContain('husky');
});
