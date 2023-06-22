import axios from 'axios'

// create an axios instance
const service = axios.create({
    baseURL: process.env.API_URL + '/api',
    timeout: 5000
})

// request interceptor
service.interceptors.request.use(
    config => {
        // const contentType = config.formData ? 'multipart/form-data' : 'application/json;charset=UTF-8'
        // config.headers['Content-Type'] = contentType
        // if (store.getters.token) {
        //     const authHeader = 'Token ' + getToken()
        //     config.headers['Authorization'] = authHeader
        // }

        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        if (response.config.fullRequest) return response

        return response.data
    },
    error => {
        // if (!error.response) {}

        // if (error.response && error.response.status == 503 && error.response.data.description) {
        //     return Promise.reject(error.response.data.description)
        // }

        return Promise.reject(error)
    }
)

export default service
