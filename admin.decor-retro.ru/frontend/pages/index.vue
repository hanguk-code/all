<template>
    <div>
        <Breadcrumbs title="Рабочий стол" :items="breadcrumbsItems" />
        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">

            <!--begin::Row-->
            <div class="row">
                <div class="col-lg-12 col-xl-12 order-lg-1 order-xl-1">

                    <!--begin::Portlet-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Рабочий стол</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                          
                        </div>
                    </div>

                    <!--end::Portlet-->
                </div>
            </div>

            <!--end::Row-->

            <!--end::Dashboard 1-->
        </div>
        <!-- end:: Content -->
    </div>
</template>

<script>
    import Breadcrumbs from '~/components/Breadcrumbs.vue'
    export default {
        middleware: 'auth',
        components: {
            Breadcrumbs
        },
        data() {
            return {
                breadcrumbsItems: [
                    {
                        title: 'Рабочий стол',
                        url: '/'
                    }
                ]
            };
        },
        fetch() {
            if(this.$store.state.user) {
                this.$router.push({ name: 'index' });
            }
        }
    }
</script>

<style scoped>

</style>
