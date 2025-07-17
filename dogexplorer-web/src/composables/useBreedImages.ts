import { ref, watchEffect } from 'vue';
import { useApi } from './useApi';

const api = useApi();
const LS_PREFIX = 'imgCache:';
const TTL = 60 * 30 * 1_000;

interface CacheEntry {
	at: number;
	images: string[];
}

export function useBreedImages(breed: string) {
	const images = ref<string[]>([]);
	const loading = ref(true);
	const error = ref<Error | null>(null);

	watchEffect(async () => {
		loading.value = true;
		error.value = null;

		const key = `${LS_PREFIX}${breed}`;
		const cached = safeRead(key);

		if (cached) {
			images.value = cached.images;
			loading.value = false;
		}

		try {
			const fresh = await api.get<string[]>(`/breeds/${breed}/images`);
			images.value = fresh;
			safeWrite(key, fresh);
		} catch (e) {
			if (!cached) error.value = e as Error;
		} finally {
			loading.value = false;
		}
	});

	return { images, loading, error };
}

function safeRead(key: string): CacheEntry | null {
	try {
		const txt = localStorage.getItem(key);
		if (!txt) return null;
		const parsed: CacheEntry = JSON.parse(txt);
		return Date.now() - parsed.at < TTL ? parsed : null;
	} catch {
		return null;
	}
}

function safeWrite(key: string, imgs: string[]) {
	const entry: CacheEntry = { at: Date.now(), images: imgs };
	localStorage.setItem(key, JSON.stringify(entry));
}