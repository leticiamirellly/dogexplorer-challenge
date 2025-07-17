<template>
  <section class="p-4">
    <h1 class="text-2xl font-bold mb-4">Raças disponíveis</h1>

    <p v-if="loading" class="text-gray-500">Carregando…</p>
    <p v-else-if="error" class="text-red-500">{{ error.message }}</p>

    <BreedList v-else :breeds="breeds" :showFav="true" @select="selected = $event" />

    <BreedModal v-if="selected" :breed="selected" @close="selected = null" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApi } from '@/composables/useApi';
import BreedList from '@/components/BreedList.vue';
import BreedModal from '@/components/BreedModal.vue';
import { useFavoritesStore } from '@/stores/favorites';

const api = useApi();
const fav = useFavoritesStore();
const breeds = ref<string[]>([]);
const loading = ref(false);
const error = ref<Error | null>(null);
const selected = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  try {
    await fav.load();
    const data = await api.get('/api/breeds');

    if (!Array.isArray(data))
      throw new Error('Resposta inesperada do servidor (/breeds)');

    breeds.value = data;
  } catch (e) {
    error.value = e as Error;
  } finally {
    loading.value = false;
  }
});
</script>
