import { describe, it, expect, vi } from 'vitest';
import { type AxiosInstance } from 'axios';
import { useApi, ApiError } from '@/composables/useApi';

vi.mock('axios', async (importOriginal) => {
	const actual = await importOriginal<typeof import('axios')>();

	const getMock = vi.fn();
	const postMock = vi.fn();

	const interceptors = { use: vi.fn(), eject: vi.fn(), clear: vi.fn() };

	const mockInstance = {
		get: getMock,
		post: postMock,
		interceptors: { request: interceptors, response: interceptors },
	} as unknown as AxiosInstance;

	return {
		...actual,
		default: {
			create: () => mockInstance,
			__mocks__: { getMock, postMock },
		},
	};
});

import axios, { type AxiosStatic } from 'axios';
interface AxiosWithMocks extends AxiosStatic {
	__mocks__: {
		getMock: ReturnType<typeof vi.fn>;
		postMock: ReturnType<typeof vi.fn>;
	};
}

const { getMock } = (axios as unknown as AxiosWithMocks).__mocks__;

const api = useApi();

describe('useApi composable', () => {
	it('wraps GET success', async () => {
		getMock.mockResolvedValueOnce({ data: 42 });
		const result = await api.get<number>('/success');
		expect(result).toBe(42);
	});

	it('converts network failure to ApiError', async () => {
		const apiErr = new ApiError('Network Error', true);

		getMock.mockImplementationOnce(() => Promise.reject(apiErr));

		await expect(api.get('/fail')).rejects.toBeInstanceOf(ApiError);
	});
});
