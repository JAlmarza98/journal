import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import { journalState } from "../../../mock/test-journal-state"
import journal from '@/modules/daybook/store/journal'
import EntryList from '@/modules/daybook/components/EntryList.vue'

const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state:{...initialState}
        }
    }
})

describe('Pruebas en el EntryList', () => {

    const store = createVuexStore( journalState )
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper 

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })

    test('Debe hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });

    test('Debe de llamar el getEntriesByTerm sin argumento y mostrar dos entradas ', () => {
        expect( wrapper.findAll('entry-stub').length ).toBe(2)
    });

    test('Debe de llamar getEntriesByTerm y filtrar las entradas', async() => {
        
        const input = wrapper.find('input')
        await input.setValue('Vue')

        expect( wrapper.findAll('entry-stub').length ).toBe(1)
    });

    test('El boton de nuevo debe redireccionar a /new', () => {
        wrapper.find('button').trigger('click')

        expect( mockRouter.push ).toHaveBeenCalledWith( { name: 'entry', params: { id: 'new' } } )
    });
    
});