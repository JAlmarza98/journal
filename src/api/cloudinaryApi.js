import axios from 'axios'
import { cloudinaryURL } from '../constants'
//Just for protect my cloudinary account

const cloudinaryApi = axios.create({
    baseURL: cloudinaryURL
})

export default cloudinaryApi