<template>
    <div class="bg">
        <div class="bg-box"></div>
        <div class="bg-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Bg"
    }
</script>

<style lang="css" scoped>
@import '../assets/css/bg.css';

</style>