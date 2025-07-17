import { mount } from '@vue/test-utils';
import BreedModal from '@/components/BreedModal.vue';
import { expect, it, vi } from 'vitest';

vi.mock('@/composables/useBreedImages', () => ({
	useBreedImages: () => ({
		images: ['a.jpg', 'b.jpg', 'c.jpg'],
		loading: false,
		error: null,
	}),
}));

it('shows three images for a breed', () => {
	const wrapper = mount(BreedModal, { props: { breed: 'husky' } });
	const imgs = wrapper.findAll('img');
	expect(imgs).toHaveLength(3);
});
