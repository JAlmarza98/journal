<template>
    <div class="entry-list-container">

        <div class="px-2 pt-2">
            <input type="text" class="form-control" placeholder="Buscar Entrada">
        </div>

        <div class="entry-scrollarea">
            <Entry v-for="item in 100" :key="item"/>
        </div>

    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    components: {
        Entry: defineAsyncComponent(() => import('../components/Entry.vue'))
    }
}
</script>

<style lang="scss" scoped>
.entry-list-container{
    border-right: 1px solid #2c3e50;
    height: calc(100vh - 56px);
}

.entry-scrollarea{
    height: calc(100vh - 110px);
    overflow-y: scroll;
}

.entry-scrollarea::-webkit-scrollbar {
    -webkit-appearance: none;
}

.entry-scrollarea::-webkit-scrollbar:vertical {
    width:10px;
}

.entry-scrollarea::-webkit-scrollbar-button:increment,.entry-scrollarea::-webkit-scrollbar-button {
    display: none;
} 

.entry-scrollarea::-webkit-scrollbar:horizontal {
    height: 10px;
}

.entry-scrollarea::-webkit-scrollbar-thumb {
    background-color: #2c3e50;
    border-radius: 20px;
    border: 2px solid #f1f2f3;
}

.entry-scrollarea::-webkit-scrollbar-track {
    border-radius: 10px;  
}
</style>