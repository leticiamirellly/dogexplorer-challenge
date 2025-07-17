<template>
	<section class="p-4">
		<h1 class="text-2xl font-bold mb-4">Favoritos</h1>

		<p v-if="fav.loading" class="text-gray-500">Carregando…</p>
		<p v-else-if="fav.error" class="text-red-500">{{ fav.error.message }}</p>

		<BreedList v-else :breeds="fav.breeds" :showFav="true" @select="selected = $event" />

		<BreedModal v-if="selected" :breed="selected" @close="selected = null" />
	</section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
import BreedList from '@/components/BreedList.vue';
import BreedModal from '@/components/BreedModal.vue';

const fav = useFavoritesStore();
const selected = ref<string | null>(null);

onMounted(() => { if (!fav.breeds.length) fav.load(); });
</script>