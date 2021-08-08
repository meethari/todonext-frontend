import axios from "axios"

class Api {
    constructor() {
        const heroku_url = 'https://hari-todonext.herokuapp.com'
        this.baseUrl =  'http://localhost:3001'// don't include trailing slash
    }

    get(endpoint) {
        return axios.get(this.baseUrl + endpoint)
    }

    post(endpoint, payload) {
        return axios.post(this.baseUrl + endpoint, payload)
    }

    delete(endpoint) {
        return axios.delete(this.baseUrl + endpoint)
    }

    patch(endpoint, payload) {
        return axios.patch(this.baseUrl + endpoint, payload)
    }

}

export default Api