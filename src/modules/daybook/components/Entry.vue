<template> 
    <div class="entry-contariner mb-3 pointer p-2" @click="$router.push({name: 'entry', params: {id:10}})">
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">27</span>
            <span class="mx-1 fs-5">Febrero</span>
            <span class="mx-2 fw-light">2022, Sabado</span>
        </div>

        <div class="entry-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac massa quam. Cras tincidunt quis turpis vitae pretium. Pellentesque vitae vestibulum lorem. Donec blandit blandit libero nec hendrerit. Donec sodales ullamcorper laoreet. Sed sagittis luctus ipsum, quis laoreet nibh efficitur sed. Aenean non diam metus. Suspendisse ut ex imperdiet, consectetur tortor a, bibendum sem. Nulla dapibus nisl et nisi tempus lobortis. Aliquam accumsan scelerisque justo, vel convallis libero laoreet ac. Donec pellentesque blandit suscipit. Sed imperdiet purus quis nulla porttitor, at sodales odio imperdiet.
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.entry-contariner {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }
}

.entry-description {
    font-size: 12px;
}

</style>