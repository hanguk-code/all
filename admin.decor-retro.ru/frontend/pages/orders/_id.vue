<template>
    <div>
        <Breadcrumbs title="Заказы" :items="breadcrumbsItems"/>

        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div class="row">
                <div class="col-md-12">

                    <!--begin::Portlet-->
                    <div class="kt-portlet">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <n-link :to="{name: 'orders' }" class="btn btn-secondary"><i class="fa fa-arrow-left"
                                                                                             aria-hidden="true"></i>
                                    В таблицу
                                </n-link>
                            </div>
                        </div>

                        <!--begin::Form-->
                        <form class="kt-form" role="form" @submit.prevent="update" v-loading="loadingOptions">
                            <div class="kt-portlet__body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group ">
                                            <el-select
                                                    v-model="order.status"
                                                    name="status"
                                                    class="form-control fixed-select" filterable
                                                    placeholder="Выберите статус">
                                                <el-option
                                                        v-for="item in statuses"
                                                        :key="item.id"
                                                        :label="item.label"
                                                        :value="item.id"
                                                >
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="kt-form__actions" v-loading="loading">
                                            <button type="submit" class="btn btn-primary">Сохранить</button>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <select class="form-control" v-model="chooseZone" @change="updateZone">
                                            <option v-for="zone in zones" :key="zone.value" :class="zone.value"
                                                    class="select-zones" :value="zone.value">{{ zone.label }}</option>
                                        </select>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <h5 style="color: #464646;">Заказчик</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Имя</label>
                                            <div>{{ order.name }}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Телефон</label>
                                            <div>
                                                <a :href="'/users/' + buyer.id">{{ order.phone }}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Email</label>
                                            <div>{{ order.email }}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Дата заказа</label>
                                            <div>{{ order.created_at }}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Комментарий</label>
                                            <div>{{ order.comment ? order.comment : order.comments }}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Список товаров</label>
                                            <table class="table table-bordered">
                                                <tr>
                                                    <th>Фото</th>
                                                    <th>Атикул</th>
                                                    <th>Название</th>
                                                    <th>Цена продажи</th>
                                                </tr>
                                                <tr v-for="product in order.product_id" v-if="product">

                                                    <td>
                                                        <img :src="apiImgUrl + 'image/' + product.image" width="100"/>
                                                    </td>
                                                    <td>
                                                        {{ product.sku }}
                                                    </td>
                                                    <td>
                                                        {{ product.description.name }}
                                                    </td>
                                                    <td>
                                                        {{ product.price }} т.р.
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="form-group d-block">
                                            <h4>Сумма заказа: {{ order.total_price }}</h4>
                                        </div>
                                        <div class="form-group d-block">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <n-link :to="{name: 'orders-edit', query: {order_id: order.id}}" class="btn btn-success">Исправить</n-link>
                                                </div>
                                                <div class="col-md-8">
                                                    <textarea class="form-control" placeholder="Комментарий.."></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                        <!--end::Form-->

                    </div>
                    <!--end::Portlet-->

                </div>

            </div>
        </div>
        <!-- end:: Content -->

    </div>
</template>

<script>
    import Breadcrumbs from '~/components/Breadcrumbs.vue'
    import Errors from '~/helpers/error.js'
    import myUpload from "vue-image-crop-upload";
    import Treeselect from "@riophae/vue-treeselect";

    export default {
        middleware: 'auth',
        components: {
            Breadcrumbs, 'my-upload': myUpload, Treeselect
        },
        data() {
            return {
                apiImgUrl: process.env.apiImgUrl,
                breadcrumbsItems: [
                    {
                        title: 'Заказы',
                        name: 'orders'
                    },
                    {
                        title: 'Редактирование',
                        name: 'orders-id',
                        params: 'id: ' + this.$route.params.id,
                    }
                ],

                order: {},
                buyer: {},
                chooseZone: '',

                bouquets: [],
                flowers: [],
                statuses: [
                    {id: 0, label: 'новый'},
                    {id: 1, label: 'обработан ( не оплачен )'},
                    {id: 2, label: 'обработан ( оплачен )'},
                    {id: 3, label: 'передан исполнителю'},
                    {id: 4, label: 'принят исполнителем'},
                    {id: 5, label: 'доставлен'},
                    {id: 6, label: 'на удержани'},
                ],

                bouquetOrder: '',
                flowerOrder: '',
                orderData: [], //cart data
                totalPrice: '',

                loading: false,
                loadingOptions: false,
                errors: new Errors(),
                editField: '',
                oldValueField: '',


                zones: [
                    {
                        value: 'white',
                        label: 'В работе',
                    },
                    {
                        value: 'red',
                        label: 'Новый',
                    },
                    {
                        value: 'green',
                        label: 'Состоявшийся заказ',
                    },
                    {
                        value: 'black',
                        label: 'Отказ',
                    }
                ]
            };
        },
        async fetch() {
            if (!this.$permission(['*'])) {
                await this.$router.push({name: 'index'});
            }
            // await this.getItemOptionsData()
            await this.getEditData()
        },

        methods: {

            async updateZone() {
                this.loading = true;
                this.$axios.patch(process.env.apiWebUrl + `/adm/orders/${this.$route.params.id}/set-zone`, {
                    zone: this.chooseZone,
                })
                    .then(response => {
                        let status = response.data.data;
                        if (status.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Зона заказа успешно обновлена',
                                type: 'success',
                                center: true
                            });
                        }
                    })
                    .catch(error =>
                        this.errors.record(error.response.data)
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            },

            async getItemOptionsData() {
                const response = await this.$axios.$get(process.env.apiWebUrl + `/adm/orders/options/data`,)
                if (response) {
                    this.orders = response.data
                }
            },

            async getEditData() {
                const response = await this.$axios.$get(process.env.apiWebUrl + `/adm/orders/${this.$route.params.id}`)
                if (response) {
                    this.order = response.data;
                    this.buyer = response.data.buyer;

                    if (this.product.image) {
                        this.photo = process.env.apiImgUrl + 'image/' + this.product.image
                        this.showPhoto = true
                    }

                    if (this.product.description) {
                        // this.product.name = this.product.description.name
                    }

                }
            },

            update() {
                this.loading = true;
                this.order.total_price = this.totalPrice
                this.$axios.patch(process.env.apiWebUrl + `/adm/orders/${this.$route.params.id}`, {
                    order: this.order,
                    order_data: this.orderData
                })
                    .then(response => {
                        let status = response.data.data;
                        if (status.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Успешно обновлено',
                                type: 'success',
                                center: true
                            });
                        }
                    })
                    .catch(error =>
                        this.errors.record(error.response.data)
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            },

            bouquetSelect() {
                console.log(this.bouquetOrder)
                this.orderData.push(this.bouquetOrder)
                this.totalPrice = +this.totalPrice + +this.bouquetOrder.price
                this.bouquetOrder = ''

            },

            flowerSelect() {
                console.log(this.flowerOrder)
                this.orderData.push(this.flowerOrder)
                this.totalPrice = +this.totalPrice + +this.flowerOrder.price
                this.flowerOrder = ''
            },

            removeOrderData: function (index, price) {
                this.totalPrice = +this.totalPrice - +price
                this.orderData.splice(index, 1);
            },

            //Enable disabled btns & Edit
            focusField(name) {
                this.editField = name;

            },
            saveOldValue(oldVal) {
                this.oldValueField = oldVal
            },
            blurField(e) {
                this.editField = '';
                if (e) {
                    if (this.oldValueField !== e.target.value) {
                        this.update();
                        this.oldValueField = ''
                    }
                } else {
                    this.update();
                    this.oldValueField = ''
                }
            },
            showField(name) {
                return (this.order[name] == '' || this.editField == name)
            },
        }
    }
</script>

<style scoped>
    .item__error {
        color: #F56C6C;
        font-size: 11px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
    }
</style>
