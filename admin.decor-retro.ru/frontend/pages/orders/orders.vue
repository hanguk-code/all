<template>
    <div>
        <Breadcrumbs title="Заказы" :items="breadcrumbsItems" />

        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">
                            Заказы добавленые администратором
                            <small>вывод всех заказов </small>
                        </h3>
                    </div>
                </div>

                <DataTableMainOrdersList :url="url"
                               :itemRouteNameEdit="itemRouteNameEdit"
                               :statuses="statuses"
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
    import DataTableMainOrdersList from '~/components/DataTable/DataTableMainOrdersList.vue'

    export default {
        middleware: 'auth',
        components: {
            Breadcrumbs,
            DataTableMainOrdersList
        },
        data() {
            return {
                breadcrumbsItems: [
                    {
                        title: 'Заказы',
                        name: 'orders'
                    }
                ],
                statuses: [
                    'новый',
                    'обработан ( не оплачен )',
                    'обработан ( оплачен )',
                    'передан исполнителю',
                    'принят исполнителем',
                    'доставлен',
                    'на удержани',
                ],

                //DataTable
                url: process.env.apiWebUrl+'/adm/orders-list',
                itemRouteNameEdit: 'orders-id',
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

