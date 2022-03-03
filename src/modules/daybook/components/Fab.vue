<template>
    <button class="btn" :class="color" @click="$emit('on:click')">
        <i class="fas fa-2x" :class="icon"></i>
    </button>
</template>

<script>
export default {
    props: {
        icon: {
            type:String,
            default: 'fa-plus'
        },
        color: {
            type:String,
            default: 'btn-primary'
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 80px;
    height: 80px;
    border-radius: 100%;
}
</style>