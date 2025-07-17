export function lru<T>(max = 50) {
	const cache = new Map<string, T>();

	return {
		get(key?: string): T | undefined {
			if (!key) return undefined;
			const item = cache.get(key);
			if (item) {
				cache.delete(key);
				cache.set(key, item);
			}
			return item;
		},

		set(key: string | undefined, value: T): void {
			if (!key) return;

			if (cache.has(key)) {
				cache.delete(key);
			} else if (cache.size >= max) {
				const oldestKey = cache.keys().next().value as string | undefined;
				if (oldestKey) cache.delete(oldestKey);
			}

			cache.set(key, value);
		},
	};
}
