<template>
	<div class="min-h-screen flex flex-col bg-neutral-50">
		<header class="top-0 z-50 flex items-center justify-between gap-8
			bg-white shadow-sm px-6 py-3 w-full">
			<RouterLink to="/" class="text-primary text-xl font-bold">
				DogExplorer
			</RouterLink>

			<nav class="flex gap-6 text-base">
				<RouterLink to="/" class="link">Início</RouterLink>
				<RouterLink to="/favorites" class="link">Favoritos</RouterLink>
			</nav>
		</header>

		<main class="flex-1 w-full px-6 py-8">
			<RouterView />
		</main>

		<footer class="w-full bg-white border-t text-sm text-neutral-500
			px-6 py-4 flex flex-col sm:flex-row justify-between gap-2">
			<span>© {{ new Date().getFullYear() }} DogExplorer.</span>
			<span>Dados de cães fornecidos por Dog CEO API.</span>
		</footer>
	</div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
.link {
	@apply text-neutral-700 hover:text-primary transition;
}

.router-link-active {
	@apply font-semibold text-primary;
}
</style>