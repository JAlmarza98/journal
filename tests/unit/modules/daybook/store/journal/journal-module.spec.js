import { createStore } from "vuex";
import journal from '@/modules/daybook/store/journal'
import { journalState } from "../../../../mock/test-journal-state"; 

const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state:{...initialState}
        }
    }
})

describe('Vuex - Pruebas en el Journa Module', () => {
    // Básicas
    test('debe tener este estado inicial ', () => {
        const store = createVuexStore(journalState)
        const {isLoading, entries} = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    });

    // Mutations
    test('mutation: setEntries', () => {
        const store = createVuexStore({isLoading: true, entries:[]})

        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()
    });

    test('mutation: updateEntry', () => {
        const store = createVuexStore(journalState)
        const updatedEntry = {
            "id":"-MxKEMUj58YmfWqmk0k-",
            "date": 1646402554286,
            "text": "Hola Mundo desde las pruebas"
        }

        store.commit('journal/updateEntry', updatedEntry)

        const storeEntries = store.state.journal.entries

        expect(storeEntries.length).toBe(2)
        expect(storeEntries.find( e => e.id === updatedEntry.id)).toEqual(updatedEntry)
    });

    test('mutation: addEntry & deleteEntry ', () => {
        const store = createVuexStore(journalState)
        
        store.commit('journal/addEntry', {id: 'ABC-123', text: 'Hola mundo'})
        
        const storeEntries = store.state.journal.entries
        expect(storeEntries.length).toBe(3)
        expect(storeEntries.find( e => e.id === 'ABC-123').id).toBe('ABC-123')

        store.commit('journal/deleteEntry', 'ABC-123')
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find( e => e.id === 'ABC-123')).toBeFalsy()
    });

    // Getters
    test('getters: getEntriesByTerm & getEntryById', () => {
        const store = createVuexStore(journalState)
        const [ entry1, entry2 ] = journalState.entries

        expect( store.getters['journal/getEntriesByTerm']('').length ).toBe(2)
        expect( store.getters['journal/getEntriesByTerm']('Mundo').length ).toBe(1)
        expect( store.getters['journal/getEntriesByTerm']('Mundo')).toEqual([entry2])

        expect( store.getters['journal/getEntryById']('-MxFT4tnJAMPB9OhAbX-')).toEqual(entry1)
    });

    // Actions
    test('actions: loadEntries', async() => {
        const store = createVuexStore({isLoading: true, entries:[]})
        
        await store.dispatch('journal/loadEntries')

        expect( store.state.journal.entries.length ).toBeGreaterThan(0)
    });

    test('actions: updateEntry', async() => {
        const store = createVuexStore(journalState)
        const updatedEntry = {
            id:'-MxKEMUj58YmfWqmk0k-',
            date: 1646402554286,
            text: 'Hola Mundo desde un mock',
            otroCampo: true,
            otroMas: {a: 1}
        }
        
        await store.dispatch('journal/updateEntry', updatedEntry)

        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.entries.find( e => e.id === updatedEntry.id)).toEqual(
        {
            id:'-MxKEMUj58YmfWqmk0k-',
            date: 1646402554286,
            text: 'Hola Mundo desde un mock'
        })
    });

    test('actions: createEntry & deleteEntry', async() => {
        const store = createVuexStore(journalState)
        const newEntry = { date: 1646402554736, text: 'Nueva entrada desde las pruebas' }

        const id = await store.dispatch('journal/createEntry', newEntry)

        expect( typeof id ).toBe('string')
        expect( store.state.journal.entries.length ).toBe(3)
        expect( store.state.journal.entries.find( e => e.id === id) ).toBeTruthy()

        await store.dispatch('journal/deleteEntry', id)
        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.entries.find( e => e.id === id) ).toBeFalsy()
    });
});