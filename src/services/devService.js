import { apiService } from './api'

export const devService = {
    async createDev(devData) {
        const devPayload = {
        nickname: devData.nickname,
        name: devData.name,
        birth_date: devData.birth_date,
        stack: devData.stack 
        }
        
        return await apiService.post('/devs', devPayload)
    },

    async getAllDevs(searchTerms = null) {
        const params = {}
        
        if (searchTerms && searchTerms.trim() !== '') {
        params.terms = searchTerms.trim()
        }
        
        return await apiService.get('/devs', params)
    },

    async getDevById(id) {
        return await apiService.get(`/devs/${id}`)
    },

    validateDevData(devData) {
        const errors = []
        
        if (!devData.nickname || devData.nickname.trim() === '') {
            errors.push('o nickname é requerido')
        }
        
        if (!devData.name || devData.name.trim() === '') {
            errors.push('o nome é requerido')
        }
        
        if (!devData.birth_date) {
            errors.push('a data de nascimento é requerida')
        } else {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/
            if (!dateRegex.test(devData.birth_date)) {
                errors.push('a data de nascimento deve estar no formato AAAA-MM-DD')
            }
        }
        
        if (!devData.stack || !Array.isArray(devData.stack) || devData.stack.length === 0) {
            errors.push('a stack é requerida e deve ser uma lista não vazia')
        }
        
        return {
            isValid: errors.length === 0,
            errors
        }
    }
}