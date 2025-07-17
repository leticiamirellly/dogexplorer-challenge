import { vi } from 'vitest';

export const pgMock = {
	query: vi.fn().mockResolvedValue({ rows: [] }),
};

vi.mock('pg', () => ({
	default: { Pool: vi.fn(() => pgMock) },
}));