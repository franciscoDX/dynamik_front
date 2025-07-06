<template>
    <Dialog 
        :visible="visible"
        @update:visible="$emit('update:visible', $event)"
        :style="{ width: '600px' }" 
        header="Criar novo Desenvolvedor" 
        :modal="true"
        :closable="false"
    >
        <form @submit.prevent="handleSubmit">
            <div class="p-field">
                <label for="nickname">Nickname *</label>
                <InputText 
                    id="nickname" 
                    v-model="newDev.nickname" 
                    required 
                    autofocus 
                    class="w-full"
                    :class="{ 'p-invalid': validationErrors.nickname }"
                    />
                <small class="p-error" v-if="validationErrors.nickname">
                    {{ validationErrors.nickname }}
                </small>
            </div>

            <div class="p-field">
                <label for="name">Nome Completo *</label>
                <InputText 
                    id="name" 
                    v-model="newDev.name" 
                    required 
                    class="w-full"
                    :class="{ 'p-invalid': validationErrors.name }"
                    />
                <small class="p-error" v-if="validationErrors.name">
                    {{ validationErrors.name }}
                </small>
            </div>

            <div class="p-field">
                <label for="birth_date">Data de Nascimento *</label>
                <Calendar 
                    id="birth_date" 
                    v-model="newDev.birth_date" 
                    dateFormat="yy-mm-dd"
                    :showIcon="true"
                    class="w-full"
                    :class="{ 'p-invalid': validationErrors.birth_date }"
                    />
                <small class="p-error" v-if="validationErrors.birth_date">
                    {{ validationErrors.birth_date }}
                </small>
            </div>

            <div class="p-field">
                <label for="stack">Stack Tecnológico *</label>
                <Chips 
                    id="stack" 
                    v-model="newDev.stack" 
                    placeholder="por exemplo: Vue, Node"
                    class="w-full"
                    :class="{ 'p-invalid': validationErrors.stack }"
                    />
                <small class="p-error" v-if="validationErrors.stack">
                    {{ validationErrors.stack }}
                </small>
                <small class="p-help">
                    pressione Enter para adicionar tecnologias
                </small>
            </div>
        </form>

        <template #footer>
        <Button 
            label="Cancelar" 
            icon="pi pi-times" 
            class="p-button-text" 
            @click="handleClose"
        />
        <Button 
            label="Crear" 
            icon="pi pi-check" 
            @click="handleSubmit"
            :loading="loading"
        />
        </template>
    </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Chips from 'primevue/chips'

import { devService } from '@/services/devService'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:visible', 'create', 'close'])

const newDev = ref({
    nickname: '',
    name: '',
    birth_date: null,
    stack: []
})

const validationErrors = ref({})

const resetForm = () => {
    newDev.value = {
        nickname: '',
        name: '',
        birth_date: null,
        stack: []
    }
    validationErrors.value = {}
}

const validateNewDev = () => {
    const devToValidate = {
        ...newDev.value,
        birth_date: newDev.value.birth_date instanceof Date 
        ? newDev.value.birth_date.toISOString().split('T')[0]
        : newDev.value.birth_date
    }
  
    const validation = devService.validateDevData(devToValidate)
  
    if (!validation.isValid) {
        validationErrors.value = {}
        
        validation.errors.forEach(error => {
        if (error.includes('nickname')) {
            validationErrors.value.nickname = error
        } else if (error.includes('nombre')) {
            validationErrors.value.name = error
        } else if (error.includes('fecha')) {
            validationErrors.value.birth_date = error
        } else if (error.includes('stack')) {
            validationErrors.value.stack = error
        }
        })
    } else {
        validationErrors.value = {}
    }
  
  return validation.isValid
}

const handleSubmit = () => {
    if (!validateNewDev()) return
    
    const devData = {
        nickname: newDev.value.nickname.trim(),
        name: newDev.value.name.trim(),
        birth_date: newDev.value.birth_date instanceof Date 
        ? newDev.value.birth_date.toISOString().split('T')[0]
        : newDev.value.birth_date,
        stack: newDev.value.stack.filter(tech => tech && tech.trim() !== '')
    }
    
    emit('create', devData)
}

const handleClose = () => {
    resetForm()
    emit('close')
}

watch(() => props.visible, (newValue) => {
    if (!newValue) {
        resetForm()
    }
})
</script>

<style scoped>
.p-field {
    margin-bottom: 1rem;
}

.p-field label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.w-full {
    width: 100%;
}
</style>