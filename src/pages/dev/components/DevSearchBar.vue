<template>
	<div class="search-bar mb-4">
		<div class="p-inputgroup">
			<InputText 
				:model-value="searchTerms"
				@update:model-value="$emit('update:searchTerms', $event)"
				placeholder="procurar desenvolvedor por nickname, nome ou stack"
				@keyup.enter="$emit('search')"
				class="search-input"
			/>
			<Button 
				icon="pi pi-search" 
				@click="$emit('search')"
				:loading="loading"
				class="search-button"
			/>
			<Button 
				icon="pi pi-times" 
				class="p-button-secondary clear-button"
				@click="$emit('clear')"
				v-if="searchTerms"
			/>
		</div>
	</div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

defineProps({
	searchTerms: {
		type: String,
		default: ''
	},
	loading: {
		type: Boolean,
		default: false
	}
})

defineEmits(['update:searchTerms', 'search', 'clear'])
</script>

<style scoped>
.search-bar {
  	max-width: 600px;
}

.mb-4 {
  	margin-bottom: 1rem;
}

.p-inputgroup {
	display: flex;
	align-items: stretch;
	width: 100%;
}

.search-input {
	flex: 1;
	border-radius: 0.375rem 0 0 0.375rem !important;
}

.search-button {
	border-radius: 0 !important;
	border-left: none !important;
}

.clear-button {
	border-radius: 0 0.375rem 0.375rem 0 !important;
	border-left: none !important;
}

.p-inputgroup .search-button:last-child {
  	border-radius: 0 0.375rem 0.375rem 0 !important;
}

.p-inputgroup > * {
	height: 40px;
	display: flex;
	align-items: center;
}
</style>