<template>
    <div>
        <Breadcrumbs title="Товары" :items="breadcrumbsItems" />

        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">
                            Товары
                            <small>вывод всех товаров </small>
                        </h3>
                    </div>
                    <div class="kt-portlet__head-toolbar">
                        <div class="kt-portlet__head-wrapper" v-if="$permission(['*'])">
                            <n-link :to="{name: 'products-create'}" class="btn btn-brand btn-bold btn-upper btn-font-sm">
                                <i class="la la-plus"></i>
                                Создать
                            </n-link>
                        </div>
                    </div>
                </div>

                <DataTableMain :url="url"
                               :itemRouteNameEdit="itemRouteNameEdit"
                               :permissionEdit="permissionEdit"
                               :permissionShow="permissionShow"
                />
            </div>
        </div>
        <!-- end:: Content -->
    </div>
</template>

<script>
    import Breadcrumbs from '~/components/Breadcrumbs.vue'
    import DataTableMain from '~/components/DataTable/DataTableMain.vue'

    export default {
        middleware: 'auth',
        components: {
            Breadcrumbs,
            DataTableMain
        },
        data() {
            return {
                breadcrumbsItems: [
                    {
                        title: 'Товары',
                        name: 'products'
                    }
                ],

                //DataTable
                url: process.env.apiWebUrl+'/adm/products',
                itemRouteNameEdit: 'products-id',
                permissionEdit: ['*'],
                permissionShow: ['*'],
            };
        },
        fetch() {
            if(!this.$permission(['*'])) {
                this.$router.push({ name: 'index' });
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>

