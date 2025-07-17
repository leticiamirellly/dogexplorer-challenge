import { ref, watchEffect } from 'vue';
import { useApi } from './useApi';

export function useBreedImages(breed: string) {
	const api = useApi();
	const images = ref<string[]>([]);
	const loading = ref(false);
	const error = ref<Error | null>(null);

	watchEffect(async () => {
		if (!breed) return;
		loading.value = true;
		try { images.value = await api.get<string[]>(`/breeds/${breed}/images`); }
		catch (e) { error.value = e as Error; }
		finally { loading.value = false; }
	});

	return { images, loading, error };
}
