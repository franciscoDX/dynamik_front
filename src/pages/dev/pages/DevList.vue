<template>
    <div class="dev-list-page">
        <DevSearchBar
            v-model:search-terms="searchTerms"
            :loading="loading"
            @search="searchDevs"
            @clear="clearSearch"
            />

        <div class="mb-4">
            <Button 
                label="Novo Desenvolvedor"
                v-tooltip="'Criar novo desenvolvedor'"
                icon="pi pi-plus" 
                @click="showCreateDialog = true"
                class="p-button-success"
                />
        </div>

        <DevTable
            :developers="developers"
            :loading="loading"
            @view-dev="viewDev"
            />

        <CreateDevDialog
            v-model:visible="showCreateDialog"
            :loading="loading"
            @create="createDev"
            @close="closeCreateDialog"
            />

        <ViewDevDialog
            v-model:visible="showViewDialog"
            :developer="selectedDev"
            />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'

import DevSearchBar from '../components/DevSearchBar.vue'
import DevTable from '../components/DevTable.vue'
import CreateDevDialog from '../components/CreateDevDialog.vue'
import ViewDevDialog from '../components/ViewDevDialog.vue'

import { devService } from '@/services/devService'
import { useApi } from '@/composables/useApi'

const { loading, handleRequest } = useApi()

const developers = ref([])
const searchTerms = ref('')

const showCreateDialog = ref(false)
const showViewDialog = ref(false)
const selectedDev = ref(null)

const loadDevs = async (terms = null) => {
    const data = await handleRequest(
        () => devService.getAllDevs(terms),
        null,
        'Erro ao carregar desenvolvedores'
    )
    
    if (data) {
        developers.value = data
    }
}

const searchDevs = () => {
    loadDevs(searchTerms.value)
}

const clearSearch = () => {
    searchTerms.value = ''
    loadDevs()
}

const viewDev = async (dev) => {
    if (dev.id) {
        const data = await handleRequest(
            () => devService.getDevById(dev.id),
            null,
            'Erro ao carregar desenvolvedor'
        )
        
        if (data) {
            selectedDev.value = data
            showViewDialog.value = true
        }
    } else {
        selectedDev.value = dev
        showViewDialog.value = true
    }
}

const createDev = async (devData) => {
    const result = await handleRequest(
        () => devService.createDev(devData),
            'Desenvolvedor criado com sucesso',
            'Erro ao criar desenvolvedor'
    )
  
    if (result) {
        closeCreateDialog()
        loadDevs()
    }
}

const closeCreateDialog = () => {
    showCreateDialog.value = false
}

onMounted(() => {
    loadDevs()
})
</script>

<style scoped>
.dev-list-page {
    padding: 1rem;
}

.mb-4 {
    margin-bottom: 1rem;
}
</style>