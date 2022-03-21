import { shallowMount } from "@vue/test-utils"
import About from '@/views/About'

describe('Pruebas en el About View', () => {

    test('debe de renderizarse el componente correcto',() => {
        const wrapper = shallowMount( About )

        expect( wrapper.html() ).toMatchSnapshot()
    })

})