import { vi } from 'vitest';

export const getMock = vi.fn(() => Promise.resolve({ data: {} }));
export const postMock = vi.fn(() => Promise.resolve({ data: {} }));

export default {
	create: () => ({
		get: getMock,
		post: postMock,
		interceptors: {
			response: {
				use: vi.fn((onSuccess, onError) => {
					return { onSuccess, onError };
				}),
			},
		},
	}),
};