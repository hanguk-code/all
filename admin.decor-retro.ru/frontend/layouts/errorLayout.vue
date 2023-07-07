<template>
    <div>
        <nuxt />
    </div>
</template>

<script>
    export default {
        head() {
            return {
                bodyAttrs: {
                    class: 'kt-bg-light kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--enabled kt-subheader--transparent kt-aside--enabled kt-aside--fixed kt-page--loading'
                }
            }
        },
    }
</script>

<style scoped>
    .page-enter-active,
    .page-leave-active {
        transition: all 0.25s ease;
    }

    .page-enter,
    .page-leave-active {
        opacity: 0;
        transform: translateZ(0);
        backface-visibility: hidden;
    }
</style>
