<template>
	<ul class="list-none grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
		<li v-for="breed in safeBreeds" :key="breed"
			class="card flex items-center justify-between gap-2 cursor-pointer select-none transition hover:bg-neutral-100"
			@click="$emit('select', breed)">
			<span class="capitalize gray-200 truncate">{{ breed }}</span>

			<BaseButton v-if="showFav" variant="outline" class="!p-1 text-lg leading-none"
				:aria-label="isFav(breed) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
				@click.stop="toggle(breed)">
				{{ isFav(breed) ? '★' : '☆' }}
			</BaseButton>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
import BaseButton from '@/components/ui/BaseButton.vue';
import { storeToRefs } from 'pinia';

defineEmits<{ select: [string] }>();

const props = withDefaults(
	defineProps<{ breeds: string[] | string; showFav?: boolean }>(),
	{ showFav: false },
);

const fav         = useFavoritesStore();
const { breeds: favBreeds } = storeToRefs(fav); 

const isFav  = (b: string) => favBreeds.value.includes(b);
const toggle = (b: string) => fav.toggle(b);


const safeBreeds = computed<string[]>(() => {
	if (Array.isArray(props.breeds)) return props.breeds;
	try {
		const parsed = JSON.parse(props.breeds);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return props.breeds.split(',').map(s => s.trim()).filter(Boolean);
	}
});
</script>