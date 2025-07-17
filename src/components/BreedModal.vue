<template>
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center" @click.self="$emit('close')">
		<div class="bg-white rounded-xl p-4 w-11/12 sm:max-w-lg">
			<header class="flex justify-between mb-4">
				<h2 class="text-xl font-semibold capitalize">{{ breed }}</h2>
				<button @click="$emit('close')">✕</button>
			</header>

			<p v-if="loading" class="text-gray-500">Carregando imagens…</p>
			<p v-else-if="error" class="text-red-500">{{ error.message }}</p>

			<div v-else class="grid gap-2">
				<img v-for="src in images" :key="src" :src="src" class="w-full h-56 object-cover rounded" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useBreedImages } from '@/composables/useBreedImages';

const props = defineProps<{ breed: string }>();
const { images, loading, error } = useBreedImages(props.breed);
</script>