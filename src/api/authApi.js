import axios from 'axios'
import { authURL, firebaseKey } from '../constants'
//Just for protect my firebase url

const authApi = axios.create({
    baseURL: authURL,
    params: {
        key: firebaseKey
    }
})

export default authApi