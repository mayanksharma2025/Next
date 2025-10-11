import axios from 'axios'

const apiClient = axios.create({
    baseURL: '/api', // your JSON Server URL
    headers: {
        'Content-Type': 'application/json',
    },
})

export default apiClient
