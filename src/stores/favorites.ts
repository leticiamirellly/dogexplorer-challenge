import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useApi, ApiError } from '@/composables/useApi';

const LS_KEY = 'dog-favorites';

export const useFavoritesStore = defineStore('favorites', () => {
	const api = useApi();
	const breeds = ref<string[]>([]);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	const lsRead = () => JSON.parse(localStorage.getItem(LS_KEY) || '[]');
	const lsWrite = (arr: string[]) => localStorage.setItem(LS_KEY, JSON.stringify(arr));

	async function load() {
		loading.value = true;
		try {
			breeds.value = await api.get<string[]>('/api/favorites');
		} catch (e) {
			error.value = e as Error;

			if (e instanceof ApiError && e.isOffline) breeds.value = lsRead();
		} finally {
			loading.value = false;
		}
	}

	async function toggle(breed: string) {
		const isFav = breeds.value.includes(breed);

		try {
			if (isFav) {
				await api.del(`/api/favorites/${breed}`);
			} else {
				await api.post('/api/favorites', { breed });
			}
		} catch (e) {
			if (!(e instanceof ApiError && e.isOffline)) throw e;
		}

		breeds.value = isFav
			? breeds.value.filter(b => b !== breed)
			: [...breeds.value, breed];

		lsWrite(breeds.value);
	}

	return { breeds, loading, error, load, toggle };
});
