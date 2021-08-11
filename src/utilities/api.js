import axios from "axios"

class Api {
    constructor(token = null) {
        this.baseUrl = process.env.REACT_APP_BASE_URL // don't include trailing slash
        this.token = token
    }

    get(endpoint) {
        if (this.token)
            return axios.get(this.baseUrl + endpoint, getJwtHeaderConfig(this.token))
        else
            return axios.get(this.baseUrl + endpoint)
    }

    post(endpoint, payload = null) {
        if (this.token)
            return axios.post(this.baseUrl + endpoint, payload, getJwtHeaderConfig(this.token))
        else
            return axios.post(this.baseUrl + endpoint, payload)
    }

    delete(endpoint) {
        if (this.token)
            return axios.delete(this.baseUrl + endpoint, getJwtHeaderConfig(this.token))
        else
            return axios.delete(this.baseUrl + endpoint)
    }

    patch(endpoint, payload = null) {
        if (this.token)
            return axios.patch(this.baseUrl + endpoint, payload, getJwtHeaderConfig(this.token))
        else
            return axios.patch(this.baseUrl + endpoint, payload)
    }

}

const getJwtHeaderConfig = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export default Api