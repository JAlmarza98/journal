import cloudinaryApi from '../../../api/cloudinaryApi'
import Swal from 'sweetalert2'

const uploadImage = async ( file ) => {

    if( !file ){ 
        return
    }

    try {

        const formData = new FormData()
        formData.append('upload_preset', 'vue-journal')
        formData.append('file', file)

        const {data} = await cloudinaryApi.post('/upload', formData)

        console.log(data);

        return data.secure_url
        
    } catch (error) {
        Swal.fire('Error','Error al cargar imagen, revisar logs', 'error')
        console.log(error)
        
        return null
    }
}

export default uploadImage