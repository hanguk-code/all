<template>
    <div class="mt-5">
        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">
                            Карточка покупателя <b>{{ user.name }}</b>
                        </h3>
                    </div>
                </div>


                <form class="kt-form" role="form" @submit.prevent="update" v-loading="loadingOptions">
                    <div class="row">

                        <div class="col-md-4 p-5">
                            <div class="form-group">
                                <div class="form-group">
                                    <h4>Имя: <b>{{ user.name }}</b></h4>
                                </div>
                                <div class="form-group">
                                    <label>Номер телефона</label>
                                    <input type="tel" class="form-control" placeholder="Укажите номер телефона"
                                           v-model="user.phone"/>
                                </div>
                                <div class="form-group">
                                    <label>E-mail</label>
                                    <input type="email" class="form-control" placeholder="Укажите E-mail"
                                           v-model="user.email"/>
                                </div>
                                <div class="form-group">
                                    <label>Адрес доставки</label>
                                    <input type="text" class="form-control" placeholder="Укажите адрес доставки"
                                           v-model="user.address"/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Статус</label>
                                <el-select v-model="user.status"
                                           class="form-control fixed-select"
                                           placeholder="Выберите...">
                                    <el-option
                                            v-for="status in statuses"
                                            :key="status.value"
                                            :label="status.label"
                                            :value="status.value">
                                    </el-option>
                                </el-select>
                            </div>

                            <div class="form-group" v-loading="loading">
                                <button type="submit" class="btn btn-primary">Сохранить данные</button>
                            </div>

                        </div>

                        <div class="col-md-8 p-5">
                            <!--<DataTableMainUserCard :url="url"
                                           :itemRouteNameEdit="itemRouteNameEdit"
                                           :statuses="statuses"
                                           :permissionEdit="permissionEdit"
                                           :permissionShow="permissionShow"
                            />-->



                            <div class="form-group">
                                <h5>Количество покупок: {{ total_buys }}</h5>
                            </div>
                            <div class="form-group">
                                <h5>Сумма: {{ total_sum }} т.р.</h5>
                            </div>

                            <div class="form-group">
                                <label>Теги покупок</label>
                                <textarea class="form-control" placeholder="Начните вводить теги.."
                                          v-model="user.tags"></textarea>
                            </div>

                            <div class="form-group">
                                <label>Комментарии</label>
                                <textarea class="form-control" placeholder="Начните вводить комментарий.."
                                          v-model="user.comments"></textarea>
                            </div>

                            <table class="table table-bordered">
                                <tr>
                                    <th>ID</th>
                                    <th>Дата продажи</th>
                                    <th>Артикул</th>
                                    <th>Сумма</th>
                                    <th>Площадка</th>
                                </tr>
                                <tr v-for="order in orders" :class="order.zone ? 'pointer ' + order.zone : 'pointer'"
                                    :key="order.id">
                                    <td>
                                        {{ order.id }}
                                    </td>
                                    <td>
                                        {{ order.created_at }}
                                    </td>
                                    <td>
                                        <b v-for="product in order.product_id" style="display: block;">
                                            <n-link :to="{path: '/products/' + product.product_id }"
                                                    class="btn btn-white" :title="product.name">
                                                {{ product.sku }} - {{ product.price }} т.р.
                                            </n-link>
                                        </b>
                                    </td>
                                    <td>
                                        {{ order.total_price }} т.р.
                                    </td>
                                    <td>
                                        {{ order.type }}
                                    </td>
                                </tr>
                            </table>

                        </div>
                    </div>
                </form>


            </div>
        </div>
        <!-- end:: Content -->
    </div>
</template>

<script>
    /*import DataTableMainUserCard from '~/components/DataTable/DataTableMainUserCard.vue'*/
    import Errors from '~/helpers/error.js'

    export default {
        middleware: 'auth',
        components: {
            /*DataTableMainUserCard*/
        },
        data() {
            return {
                user: {},
                orders: {},
                total_sum: 0,
                total_buys: 0,
                statuses: [
                    {
                        label: 'Постоянный',
                        value: 'permanent'
                    },
                    {
                        label: 'Черный список',
                        value: 'blacklist'
                    },
                ],

                loading: false,
                loadingOptions: false,
                errors: new Errors(),

                url: process.env.apiWebUrl + `/adm/users/${this.$route.params.id}/orders`,
                itemRouteNameEdit: 'orders-id',
                permissionEdit: ['*'],
                permissionShow: ['*'],
            };
        },

        async fetch() {
            if (!this.$permission(['*'])) {
                await this.$router.push({name: 'index'});
            }
            await this.getUserData()
            await this.getUserOrders()
        },

        methods: {
            async getUserData() {
                const response = await this.$axios.get(process.env.apiWebUrl + `/adm/users/${this.$route.params.id}`)
                if (response) {
                    this.user = response.data;
                }
            },

            async getUserOrders() {
                const response = await this.$axios.get(process.env.apiWebUrl + `/adm/users/${this.$route.params.id}/orders`)
                if (response) {
                    this.orders = response.data;
                    for (let index in response.data) {
                        let order = response.data[index];
                        this.total_sum += +order.total_price;
                        this.total_buys += 1;
                    }
                }
            },

            update() {
                this.loading = true;
                this.$axios.post(process.env.apiWebUrl + `/adm/users/${this.$route.params.id}/update`, {
                    user: this.user,
                })
                    .then(response => {
                        let status = response.data;
                        if (status.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Успешно обновлено',
                                type: 'success',
                                center: true
                            });
                        }
                    })
                    .catch(error => {
                        this.errors.record(error.response.data)
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
        }
    }
</script>

<style scoped>

</style>
