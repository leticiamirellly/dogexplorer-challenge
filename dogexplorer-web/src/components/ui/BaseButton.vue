<template>
	<button :class="[
		variantClass,
		{ 'opacity-50 pointer-events-none': disabled },
	]" v-bind="$attrs">
		<slot />
	</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
	variant?: 'primary' | 'accent' | 'outline';
	disabled?: boolean;
}>(), { variant: 'primary', disabled: false });

const variantClass = computed(() => ({
	primary: 'btn-primary',
	accent: 'btn-accent',
	outline: 'btn-outline',
}[props.variant]));
</script>