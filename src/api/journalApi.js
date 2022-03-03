import axios from 'axios'
import { baseURL } from '../constants'
//Just for protect my firebase url

const journalApi = axios.create({
    baseURL
})

export default journalApi