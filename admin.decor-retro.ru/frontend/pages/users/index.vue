<template>
    <div>
        <Breadcrumbs title="Покупатели" :items="breadcrumbsItems" />

        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">
                            Покупатели
                            <small>вывод всех покупателей </small>
                        </h3>
                    </div>
                    <div class="kt-portlet__head-toolbar">
                        <div class="kt-portlet__head-wrapper" v-if="$permission(['users_create'])">
                            <n-link :to="{name: 'users-create'}" class="btn btn-brand btn-bold btn-upper btn-font-sm">
                                <i class="la la-plus"></i>
                                Создать
                            </n-link>
                        </div>
                    </div>
                </div>

                <DataTableMain :url="url"
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
    import DataTableMain from '~/components/DataTable/users/DataTableMain.vue'

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
                        title: 'Покупатели',
                        name: 'users'
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
                url: process.env.apiWebUrl+'/adm/users',
                itemRouteNameEdit: 'users-id',
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

