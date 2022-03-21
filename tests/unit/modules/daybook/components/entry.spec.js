import { shallowMount } from "@vue/test-utils";
import Entry from '@/modules/daybook/components/Entry.vue'
import { journalState } from "../../../mock/test-journal-state"



describe('Pruebas en el Entry Component', () => {

    const mockRouter = {
        push: jest.fn()
    }

    const wrapper = shallowMount( Entry, {
        props: {
            entry:journalState.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    } )

    test('Debe hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });

    test('Debe reaccionar al hacer click en el entry-container', () => {
        const entryContainer = wrapper.find('.entry-contariner ')
        entryContainer.trigger('click')
        
        expect( mockRouter.push ).toHaveBeenCalledWith(
            {
                name: 'entry', 
                params: {
                    id: journalState.entries[0].id
                }
            }
        )
    });

    test('Pruebas en las propiedades computadas', () => {

        expect( wrapper.vm.day ).toBe(3)
        expect( wrapper.vm.month ).toBe('Marzo')
        expect( wrapper.vm.yearDay).toBe('2022, Jueves')

    });

});