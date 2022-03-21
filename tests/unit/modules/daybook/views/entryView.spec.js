import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";

import Swal from "sweetalert2";

import { journalState } from "../../../mock/test-journal-state"
import journal from '@/modules/daybook/store/journal'
import EntryView from '@/modules/daybook/views/EntryView.vue'

const createVuexStore = ( initialState ) => 
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState }
            }
        }
    })


jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))


describe('Pruebas en el EntryView', () => {

    const store = createVuexStore( journalState )
    store.dispatch = jest.fn()

    const mockRouter = {
        push: jest.fn()
    }
    
    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryView, {
            props: {
                id: '-MxFT4tnJAMPB9OhAbX-'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })


    test('Debe hacer match con el snapshot', () => {

        expect( wrapper.html() ).toMatchSnapshot()
        expect( mockRouter.push ).not.toHaveBeenCalledWith()

    });

    test('Debe sacar al usuario si el id no existe', () => {

        shallowMount( EntryView, {
            props: {
                id: 'Este ID no existe en el STORE'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ],
            }
        })

        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })

    });

    test('Debe borrar la entrada y salir', async(done) => {
        
        Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }) )

        wrapper.find('.btn-danger').trigger('click')

        expect( Swal.fire ).toHaveBeenCalledWith({
            title: '¿Está seguro?',
            text: 'Una vez eliminada la entrada, no podrá recuperarla',
            showDenyButton: true,
            confirmButtonText: 'Si, estoy seguro'
        })


        setTimeout( () => {
            
            expect( store.dispatch ).toHaveBeenCalledWith('journal/deleteEntry', '-MxFT4tnJAMPB9OhAbX-')
            expect( mockRouter.push ).toHaveBeenCalled()
            done()

        }, 1 )

    });

});