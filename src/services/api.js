import axios from 'axios'

const API_BASE_URL = import.meta.env.VUE_APP_API_URL || 'http://localhost:8000/api'

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export const apiService = {
    async get(url, params = {}) {
            try {
                const response = await apiClient.get(url, { params })
                return {
                    success: true,
                    data: response.data,
                    status: response.status
                }
            } catch (error) {
                return {
                    success: false,
                    error: error.response?.data?.message || error.message,
                    status: error.response?.status
                }
            }
    },

    async post(url, data = {}) {
        try {
            const response = await apiClient.post(url, data)
            return {
                success: true,
                data: response.data,
                status: response.status
            }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message,
                status: error.response?.status
            }
        }
    }

}


export default apiClient