<template>
    <Dialog 
        :visible="visible"
        @update:visible="$emit('update:visible', $event)"
        :style="{ width: '500px' }" 
        header="Detalhes do desenvolvedor"
        :modal="true"
    >
        <div v-if="developer" class="dev-details">
        <div class="p-field">
            <label>ID:</label>
            <p>{{ developer.id }}</p>
        </div>
        
        <div class="p-field">
            <label>Nickname:</label>
            <p><strong>{{ developer.nickname }}</strong></p>
        </div>
        
        <div class="p-field">
            <label>Nome Completo:</label>
            <p>{{ developer.name }}</p>
        </div>
        
        <div class="p-field">
            <label>Data de Nascimento:</label>
            <p>{{ formatDate(developer.birth_date) }}</p>
        </div>
        
        <div class="p-field">
            <label>Stack Tecnológico:</label>
            <div class="flex flex-wrap gap-1 mt-2">
            <Tag 
                v-for="tech in developer.stack" 
                :key="tech" 
                :value="tech"
                severity="success"
            />
            </div>
        </div>
        
        
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog'
import Tag from 'primevue/tag'

defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    developer: {
        type: Object,
        default: null
    }
})

defineEmits(['update:visible'])

const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('es-ES')
}


</script>

<style scoped>
.dev-details .p-field {
    margin-bottom: 1rem;
}

.dev-details .p-field label {
    font-weight: 600;
    color: var(--text-color-secondary);
}

.dev-details .p-field p {
    margin: 0.25rem 0 0 0;
}

.flex {
    display: flex;
}

.flex-wrap {
    flex-wrap: wrap;
}

.gap-1 {
    gap: 0.25rem;
}

.mt-2 {
    margin-top: 0.5rem;
}
</style>