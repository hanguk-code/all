<template>
    <div>
        <Breadcrumbs title="Рабочий стол" :items="breadcrumbsItems"/>
        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div class="row">
                <div class="col-lg-12 col-xl-12 order-lg-1 order-xl-1">
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Финансовый отчёт</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">

                            <div class="row">
                                <div class="col-md-8 border-right p-5">
                                    <h5>Количество продаж: <b>{{ orders.length }}</b> р.</h5>
                                    <h5>Валовая сумма продаж: <b>{{ total_sum }}</b> р.</h5>
                                    <h5>Сумма дохода: <b>{{ income }}</b> р.</h5>
                                    <hr>
                                    <h5>Сумма возврата инвестиций: <b>{{ Number(total_sum) - Number(income) }}</b> р.</h5>
                                    <h5>Прибыль по месяцу: <b>{{ Number(income) - Number(expenses_total_sum) }}</b> р.</h5>



                                    <table class="table mt-5">
                                        <tr>
                                            <th>Дата</th>
                                            <th>Артикул</th>
                                            <th>Название</th>
                                            <th>Сумма</th>
                                            <th>Покупатель</th>
                                            <th>Доход</th>
                                        </tr>

                                        <tr v-for="order in orders" :key="order.id">
                                            <td>{{ order.created_at }}</td>
                                            <td>
                                                <p v-for="product in order.product_id">
                                                    <a :href="'/products/' + product.product_id">{{ product.sku }}</a>
                                                </p>
                                            </td>
                                            <td>
                                                <p v-for="product in order.product_id">
                                                    {{ product.name }}
                                                </p>
                                            </td>
                                            <td>{{ order.total_price }}р.</td>
                                            <td>
                                                <a :href="'/users/' + order.buyer.id">
                                                    {{ order.buyer.phone }}
                                                </a>
                                            </td>
                                            <td class="text-success font-weight-bold">{{ Number(order.total_price) > 0 ? Number(order.total_price) - Number(order.price_rub) : 0 }}р.</td>
                                        </tr>

                                    </table>

                                </div>
                                <div class="col-md-4 p-5">
                                    <div class="d-flex">
                                        <div class="form-group">
                                            <a href="/finances/articles/add" class="btn btn-primary">Добавить статьи затрат</a>
                                        </div>
                                    </div>
                                    <h5>Сумма затрат: <b>{{ expenses_total_sum }}</b> р.</h5>
                                    <table class="table mt-5">
                                        <tr>
                                            <th>Сумма затраты</th>
                                            <th>Статья затраты</th>
                                        </tr>
                                        <tr v-for="expense in expensesList" :key="expense.id">
                                            <td>
                                                {{ expense.amount }} р.
                                            </td>
                                            <td>
                                                {{ expense.article }}
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
    </div>
</template>

<script>
    import Breadcrumbs from '~/components/Breadcrumbs.vue'
    import Errors from '~/helpers/error.js'

    export default {
        middleware: 'auth',
        components: {
            Breadcrumbs
        },
        data() {
            return {
                breadcrumbsItems: [
                    {
                        title: 'Финансовый отчёт',
                        url: '/finances/'
                    }
                ],



                expensesList: [],
                expenses_total_sum: 0,
                total_sum: 0,
                income: 0,

                orders: [],

                errors: new Errors(),
                loadingOptions: false,
                loading: false,
            };
        },
        async fetch() {
            if (this.$store.state.user) {
                this.$router.push({name: 'index'});
            }
            await this.getExpenses();
            await this.getOrders();
        },
        methods: {

            async getExpenses() {
                this.loading = true;
                this.$axios.get(process.env.apiWebUrl + `/adm/finances/expenses/get`)
                    .then(response => {
                        this.expensesList = response.data.data;
                        this.expenses_total_sum = response.data.total_sum;
                    })
                    .catch(error =>
                        this.errors.record(error.response.data)
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            },

            async getOrders() {
                this.loading = true;
                this.$axios.get(process.env.apiWebUrl + `/adm/finances/orders/get`)
                    .then(response => {
                        this.orders = response.data.data;
                        this.total_sum = response.data.total_sum;
                        this.income = response.data.income;
                    })
                    .catch(error =>
                        this.errors.record(error.response.data)
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            },

        }
    }

</script>