import { vi } from 'vitest';

export const getMock = vi.fn();

const axiosInstance = { get: getMock };

export const axiosMock = {
	create: vi.fn(() => axiosInstance),
};

vi.mock('axios', () => ({ default: axiosMock }));
