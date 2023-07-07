<template>
    <div>
        <Breadcrumbs title="Рабочий стол" :items="breadcrumbsItems"/>
        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">

            <!--begin::Row-->
            <div class="row">
                <div class="col-lg-12 col-xl-12 order-lg-1 order-xl-1">

                    <!--begin::Portlet-->
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Статистика</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <div class="row">
                                <div class="col-md-4 p-5 ">
                                    <div class="form-group">
                                        <input type="month" class="form-control" placeholder="Выберите дату"
                                               v-model="month" @change="setDate">
                                    </div>

                                    <div class="block">
                                        <h5>Количество посещений сайта: <b>{{ statistic.total_reviews }}</b></h5>
                                        <h5>Количество заказов: <b>{{ statistic.total_orders }}</b></h5>
                                    </div>
                                    <div class="block mt-5">
                                        <h4>Топ <b>10</b> разделов просмотров:</h4>
                                        <table class="table table-bordered">
                                            <tr>
                                                <th>Раздел</th>
                                                <th>Кол-во</th>
                                            </tr>
                                            <tr v-for="category in statistic.categories" :key="category.name">
                                                <td>
                                                    {{ category.category }}
                                                </td>
                                                <td>
                                                    {{ category.total }}
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="block mt-5">
                                        <h4>Топ <b>100</b> просмотров товаров:</h4>
                                        <table class="table table-bordered">
                                            <tr>
                                                <th>Артикул</th>
                                                <th>Фото</th>
                                                <th>Раздел</th>
                                                <th>Кол-во</th>
                                            </tr>
                                            <tr v-for="product in statistic.products" :key="product.product_id">
                                                <td>
                                                    <a :href="'/products/' + product.product_id">{{ product.sku }}</a>
                                                </td>
                                                <td>
                                                    <img :src="'https://decor-retro.ru/image/' + product.image"
                                                         style="width: 90px; height: 90px;">
                                                </td>
                                                <td>
                                                    {{ product.name }}
                                                </td>
                                                <td>
                                                    {{ product.total }}
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                </div>


                                <div class="col-md-8 p-5">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="block">
                                                <h4>График посещений по времени суток:</h4>
                                                <Time :time="statistic.chart_time"/>
                                            </div>

                                            <div class="block mt-5">
                                                <h4>График просмотров товаров:</h4>
                                                <Products/>
                                            </div>

                                        </div>

                                        <div class="col-md-6">
                                            <div class="block">
                                                <h4>График посещений по дням:</h4>
                                                <days/>
                                            </div>

                                            <div class="block mt-5">
                                                <h4>Количество продаж по площадкам:</h4>
                                                <table class="table table-bordered">
                                                    <tr>
                                                        <th>Площадка</th>
                                                        <th>Кол-во</th>
                                                    </tr>
                                                    <tr v-for="area in statistic.areas" :key="area.area">
                                                        <td>
                                                            {{ area.area }}
                                                        </td>
                                                        <td>
                                                            {{ area.total }}
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


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
    import Time from './charts/time.vue'
    import Days from './charts/days.vue'
    import Products from './charts/products.vue'

    export default {
        middleware: 'auth',
        components: {
            Breadcrumbs,
            Time,
            Days,
            Products
        },
        data() {
            return {
                breadcrumbsItems: [
                    {
                        title: 'Статистика',
                        url: '/statistics/'
                    }
                ],
                statistic: [],
                month: ''
            };
        },

        async fetch() {
            if (this.$store.state.user) {
                this.$router.push({name: 'index'});
            }
            await this.getStatistic();
        },

        methods: {
            async getStatistic() {
                this.loading = true;
                this.$axios.get(process.env.apiWebUrl + `/adm/statistic/get`)
                    .then(response => {
                        this.statistic = response.data.data;
                    })
                    .catch(error =>
                        this.errors.record(error.response.data)
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            },


            async setDate() {
                this.loading = true;
                this.$axios.get(process.env.apiWebUrl + `/adm/statistic/get`, {
                    params: {
                        month: this.month
                    }
                })
                    .then(response => {
                        this.statistic = response.data.data;
                    })
                    .catch(error =>
                        this.errors.record(error.response.data)
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            }
        }
    }
</script>

<style scoped>

</style>
