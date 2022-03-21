<template>
    <div v-if="entry">
        <div class="entry-tile d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{day}}</span>
                <span class="mx-1 fs-3">{{month}}</span>
                <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
            </div>

            <div>
                <input type="file" @change="onSelectedImage" accept="image/*" ref="imageSelector" v-show="false">
                <button v-if="entry.id" class="btn btn-danger mx-2" @click="onDeleteEntry">
                    Borrar
                    <i class="fas fa-trash-alt"></i>
                </button>
                <button class="btn btn-primary" @click="onSelectImage">
                    Subir foto
                    <i class="fas fa-upload"></i>
                </button>
            </div>
        </div>
        <hr>
        <div class="d-flex flec-column px-3 h-75">
            <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
        </div>
        <Fab icon="fa-save" color="btn-success" title="Guardar entrada" @on:click="saveEntry"/>
        <img v-if="entry.picture && (!localImage || localImage === null)" :src="entry.picture" alt="entry-picture" class="img-thumbnail img-position">
        <div v-if="localImage" class="img-position">
            <i class="fas fa-times-circle fa-lg text-danger custom-badge pointer" @click="deleteImage"></i>
            <img :src="localImage" alt="entry-picture" class="img-thumbnail">
        </div>
        
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'

import getDayMonthYear from '../helpers/getDayMonthYear'
import uploadImage from '../helpers/uploadImage'

export default {
    name: 'EntryView',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    data() {
        return {
            entry: null,
            localImage: null,
            file: null
        }
    },
    computed:{
        ...mapGetters('journal', ['getEntryById']),
        day() {
            const { day } = getDayMonthYear(this.entry.date)
            return day
        },
        month() {
            const { month } = getDayMonthYear(this.entry.date)
            return month
        },
        yearDay() {
            const { yearDay } = getDayMonthYear(this.entry.date)
            return yearDay
        }
    },
    methods: {
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
        loadEntry() {
            let entry;
            if (this.id === 'new') {
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            } else {
                entry = this.getEntryById( this.id )
                if( !entry ) this.$router.push({name: 'no-entry'})
            }

            this.entry = entry
        },
        async saveEntry() {

            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false
            })
            Swal.showLoading()

            const picture = await uploadImage( this.file )
            this.entry.picture = picture

            if (this.entry.id) {
                this.updateEntry(this.entry)
            } else {
                const  id = await this.createEntry(this.entry)
                this.$router.push({name: 'entry', params: { id } })
            }

            Swal.fire('Guardado','Entrada registrada con éxito', 'success')
            this.file = null
        },
        async onDeleteEntry() {
            const { isConfirmed } = await Swal.fire({
                title: '¿Está seguro?',
                text: 'Una vez eliminada la entrada, no podrá recuperarla',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })

            if ( isConfirmed ){
                Swal.fire({
                    title: 'Espere por favor',
                    allowOutsideClick: false
                })
                Swal.showLoading()

                await this.deleteEntry(this.entry.id)
                this.$router.push({ name: 'no-entry' })
                Swal.fire('Entrada eliminada', '', 'success')
            }     
        },
        onSelectImage() {
            this.$refs.imageSelector.click()
        },
        onSelectedImage( event ) {

            const file = event.target.files[0]
            if( !file ) {
                this.localImage = null
                this.file = null
                return
            }

            this.file = file

            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL( file )
        },
        deleteImage() {
           
            this.localImage = null
            this.file = null
               
        }
    },
    created() {
        this.loadEntry()
    },
    watch: {
        id() {
            this.loadEntry()
        }
    }
}
</script>

<style lang="scss" scoped>
textarea {
    font-size: 20px;
    border: none;
    height: calc(100vh - 250px);
    width: 100%;

    &:focus {
        outline: none;
    }
}

.img-position {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}

.custom-badge{
    position: absolute;
    top:-7px;
    right: -5px;
}

</style>