import axios from 'axios'
import { journalURL } from '../constants'
//Just for protect my firebase url

const journalApi = axios.create({
    baseURL: journalURL
})

journalApi.interceptors.request.use( (config) => {
    config.params = {
        auth: localStorage.getItem('idToken')
    }

    return config
})

export default journalApi