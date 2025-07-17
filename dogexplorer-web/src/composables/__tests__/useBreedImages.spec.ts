import { useBreedImages } from '@/composables/useBreedImages';
import { expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import type { AxiosInstance } from 'axios';

vi.mock('axios', () => import('@/tests/__mocks__/axios'));
import axiosDefault from 'axios';
const axiosMock = axiosDefault.create() as unknown as AxiosInstance & {
	get: ReturnType<typeof vi.fn>;
};

axiosMock.get.mockResolvedValue({ data: ['x.jpg'] });

it('returns images reactive ref', async () => {
	const { images, loading } = useBreedImages('beagle');

	await nextTick();
	await nextTick();

	expect(images.value).toEqual(['x.jpg']);
	expect(loading.value).toBe(false);
});