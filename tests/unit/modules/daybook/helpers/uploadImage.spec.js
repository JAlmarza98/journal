import axios from 'axios'
import cloudinary from 'cloudinary'

import UploadImage from '@/modules/daybook/helpers/uploadImage'
import {cloudinaryCLOUD_NAME, cloudinaryAPI_KEY, cloudinaryAPI_SECRET} from '@/constants.js'

cloudinary.config({
    cloud_name: cloudinaryCLOUD_NAME,
    api_key: cloudinaryAPI_KEY,
    api_secret: cloudinaryAPI_SECRET
})

describe('Pruebas de UploadImage', () => {
    
    test('debe cargar un archivo y retornar una url', async( done ) => {
        const { data } = await axios.get('https://res.cloudinary.com/dff7opmjj/image/upload/v1647344721/vue-journal/test-image.jpg',{
            responseType: 'arraybuffer'
        })
        const file = new File([ data ], 'foto.jpg')

        // Subir el archivo
        const url = await UploadImage( file )
        expect(typeof url).toBe('string')

        // Eliminar el archivo subido
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg','')

        cloudinary.v2.api.delete_resources(`vue-journal/${imageId}`, {}, () => {
            done()
        })
    });
});