<template>
    <DataTable 
        :value="developers" 
        :loading="loading" 
        responsiveLayout="scroll"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 25]"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} desenvolvedores"
    >
        <Column field="nickname" header="Nickname" sortable>
            <template #body="slotProps">
                <strong>{{ slotProps.data.nickname }}</strong>
            </template>
        </Column>
        
        <Column field="name" header="Nome completo" sortable></Column>
        
        <Column field="birth_date" header="Data de Nascimento" sortable>
            <template #body="slotProps">
                {{ formatDate(slotProps.data.birth_date) }}
            </template>
        </Column>
        
        <Column field="stack" header="Stack Tecnológico">
            <template #body="slotProps">
                <div class="flex flex-wrap gap-1">
                <Tag 
                    v-for="tech in slotProps.data.stack" 
                    :key="tech" 
                    :value="tech"
                    severity="info"
                />
                </div>
            </template>
        </Column>
        
        <Column header="Ações">
            <template #body="slotProps">
                <div class="flex gap-2">
                <Button 
                    icon="pi pi-eye" 
                    class="p-button-rounded p-button-info" 
                    @click="$emit('view-dev', slotProps.data)"
                    v-tooltip="'Ver detalhes do desenvolvedor'"
                />
                </div>
            </template>
        </Column>
    </DataTable>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

defineProps({
    developers: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    }
})

defineEmits(['view-dev', 'edit-dev', 'delete-dev'])

const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('es-ES')
}
</script>

<style scoped>
.flex {
    display: flex;
}

.flex-wrap {
    flex-wrap: wrap;
}

.gap-1 {
    gap: 0.25rem;
}

.gap-2 {
    gap: 0.5rem;
}
</style>