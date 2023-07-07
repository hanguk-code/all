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
                    class: 'kt-login-v2--enabled kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--enabled kt-subheader--transparent kt-aside--enabled kt-aside--fixed kt-page--loading'
                }
            }
        },
    }
</script>

<style scoped>
    body {
        padding: 0 !important; }
</style>
