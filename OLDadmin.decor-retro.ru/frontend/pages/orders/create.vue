<template>
    <div>
        <Breadcrumbs title="Заказы" :items="breadcrumbsItems" />

        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div class="row">
                <div class="col-md-12">

                    <!--begin::Portlet-->
                    <div class="kt-portlet">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Новый Заказ</h3>
                            </div>
                        </div>

                        <!--begin::Form-->
                        <form class="kt-form"  role="form" @submit.prevent="store" v-loading="loadingOptions">
                            <div class="kt-portlet__body">

                                <div class="row">
                                    <div class="col-md-3">
                                        <h5  style="color: #464646;">Заказчик</h5>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Имя</label>
                                            <input type="text" v-model="order.customer_name"
                                                   :class="errors.get('customer_name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Имя"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('customer_name')}}</div>
                                        </div>
                                    </div>

                                     <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Фамилия</label>
                                            <input type="text" v-model="order.customer_last_name"
                                                   :class="errors.get('customer_last_name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Фамилию"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('customer_last_name')}}</div>
                                        </div>
                                    </div>

                                      <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Телефон</label>
                                            <input type="text" v-model="order.customer_phone"
                                                   :class="errors.get('customer_phone') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Телефон"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('customer_phone')}}</div>
                                        </div>
                                    </div>

                                      <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="text" v-model="order.customer_email"
                                                   :class="errors.get('customer_email') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Email"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('customer_email')}}</div>
                                        </div>
                                    </div>

                                </div>

                                <hr>

                                <div class="row">
                                    <div class="col-md-3">
                                        <h5  style="color: #464646;">Получатель</h5>
                                    </div>
                                </div>

                                <div class="row">
                                     <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Фио</label>
                                            <input type="text" v-model="order.recipient_full_name"
                                                   :class="errors.get('recipient_full_name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Фио"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('recipient_full_name')}}</div>
                                        </div>
                                    </div>

                                      <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Телефон</label>
                                            <input type="text" v-model="order.recipient_phone"
                                                   :class="errors.get('recipient_phone') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Телефон"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('recipient_phone')}}</div>
                                        </div>
                                    </div>

                                      <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="text" v-model="order.recipient_email"
                                                   :class="errors.get('recipient_email') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Email"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('recipient_email')}}</div>
                                        </div>
                                    </div>


                                     <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Адрес</label>
                                            <input type="text" v-model="order.recipient_address"
                                                   :class="errors.get('recipient_address') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Адрес"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('recipient_address')}}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-9">
                                            <div class="form-group">
                                                <label>Текст открытки</label>
                                                <textarea class="form-control"
                                                          v-model="order.recipient_postcard_text"
                                                           rows="3"></textarea>
                                            </div>
                                        </div>
                                </div>

                                <hr>

                                <div class="row">
                                    <div class="col-md-3">
                                        <h5  style="color: #464646;">Доставка</h5>
                                    </div>
                                </div>
                                <div class="row">
                                     <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Страна</label>
                                            <input type="text" v-model="order.delivery_country"
                                                   :class="errors.get('delivery_country') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Страну"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('delivery_country')}}</div>
                                        </div>
                                    </div>

                                      <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Город</label>
                                            <input type="text" v-model="order.delivery_city"
                                                   :class="errors.get('delivery_city') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Город"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('delivery_city')}}</div>
                                        </div>
                                    </div>

                                      <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Дата</label>
                                            <input type="text" v-model="order.delivery_date"
                                                   :class="errors.get('delivery_date') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Дату"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('delivery_date')}}</div>
                                        </div>
                                    </div>


                                     <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Время</label>
                                            <input type="text" v-model="order.delivery_time"
                                                   :class="errors.get('delivery_time') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Время"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('delivery_time')}}</div>
                                        </div>
                                    </div>
                                </div>

                                 <div class="row">
                                    <div class="col-md-3">
                                        <h5 style="color: #464646;">Другое</h5>
                                    </div>
                                </div>
                                <div class="row">
                                     <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Способ оплаты</label>
                                            <input type="text" v-model="order.payment_method"
                                                   :class="errors.get('payment_method') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Способ оплаты"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('payment_method')}}</div>
                                        </div>
                                    </div>

                                      <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Валюта клиента</label>
                                            <input type="text" v-model="order.client_currency"
                                                   :class="errors.get('client_currency') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Валюту клиента"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('client_currency')}}</div>
                                        </div>
                                    </div>

                                      <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Адрес оплаты</label>
                                            <input type="text" v-model="order.payment_address"
                                                   :class="errors.get('payment_address') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Адрес оплаты"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('payment_address')}}</div>
                                        </div>
                                    </div>


                                     <div class="col-md-3">
                                        <div class="form-group">
                                                <label>Комментарий</label>
                                                <textarea class="form-control"
                                                          v-model="order.comment"
                                                           rows="3"></textarea>
                                            </div>
                                    </div>

                                    <div  class="col-md-3">
                                        <div  class="form-group">
                                            <div class="kt-checkbox-inline">
                                                <label  class="kt-checkbox">
                                                    <input type="checkbox" v-model="order.is_bouquet_leave_to_third_parties"> Оставлять букет 3-м лицам?
                                                <span></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div  class="col-md-3">
                                        <div  class="form-group">
                                            <div class="kt-checkbox-inline">
                                                <label  class="kt-checkbox">
                                                    <input type="checkbox" v-model="order.is_not_call_recipient"> Не созваниваться с получателем?
                                                <span></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div  class="col-md-3">
                                        <div  class="form-group">
                                            <div class="kt-checkbox-inline">
                                                <label  class="kt-checkbox">
                                                    <input type="checkbox" v-model="order.is_partner_order_mandatory_call"> Партнерский заказ/Обязательный созвон
                                                <span></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div  class="col-md-3">
                                        <div  class="form-group">
                                            <div class="kt-checkbox-inline">
                                                <label  class="kt-checkbox">
                                                    <input type="checkbox" v-model="order.is_acquainted_terms"> Ознакомил с условиями?
                                                <span></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                 <div class="row">
                                    <div class="col-md-2">
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group ">
                                            <br>
                                            <el-select v-model="bouquetOrder" class="form-control fixed-select" filterable placeholder="Выберите букет" @change="bouquetSelect()">
                                                <el-option
                                                    v-for="item in bouquets"
                                                    :key="item.product_id"
                                                    :label="item.name"
                                                    :value="item">
                                                    <span style="float: left"><img :src="item.photo_url" width="40px"> id: {{item.product_id}}</span>
                                                    <span style="float: right; color: #8492a6; font-size: 13px"> {{ item.name }} | Цена: {{item.price}} </span>
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group ">
                                            <br>
                                            <el-select v-model="flowerOrder" class="form-control fixed-select" filterable placeholder="Выберите цветок" @change="flowerSelect()">
                                                <el-option
                                                    v-for="item in flowers"
                                                    :key="item.product_id"
                                                    :label="item.name"
                                                    :value="item">
                                                    <span style="float: left"><img :src="item.photo_url" width="40px"> id: {{item.product_id}}</span>
                                                    <span style="float: right; color: #8492a6; font-size: 13px"> {{ item.name }} | Цена: {{item.price}} </span>
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <!-- begin: Invoice body-->
                                <div class="row justify-content-center py-8 px-8 py-md-10 px-md-0">
                                            <div class="col-md-9">
                                                <div class="table-responsive">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th class="pl-0 font-weight-bold text-muted text-uppercase">Фото</th>
                                                                <th class="text-right font-weight-bold text-muted text-uppercase">Детали</th>
                                                                <th class="text-right font-weight-bold text-muted text-uppercase">Количество</th>
                                                                <th class="text-right pr-0 font-weight-bold text-muted text-uppercase">Цена, грн</th>
                                                                <th class="text-right pr-0 font-weight-bold text-muted text-uppercase">Действия</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr class="font-weight-boldest" v-for="item, index in orderData">
                                                                <td class="pl-0 pt-7"><img :src="item.photo_url" width="50px"></td>
                                                                <td class="text-right pt-7">{{item.name}}</td>
                                                                <td class="text-right pt-7">1</td>
                                                                <td class="text-danger pr-0 pt-7 text-right">{{item.price}}</td>
                                                                  <td class="text-danger pr-0 pt-7 text-right">
                                                                    
                                                            <span data-repeater-delete="" class="btn btn-sm btn-danger btn-icon"  @click="removeOrderData(index, item.price)">
                                                                <i class="la la-close kt-font-light"></i>
                                                            </span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end: Invoice body-->

                                        <!-- begin: Invoice footer-->
                                        <div class="row justify-content-center bg-gray-100 py-8 px-8 py-md-10 px-md-0">
                                            <div class="col-md-9">
                                            </div>
                                             <div class="col-md-3">
                                                <div class="table-responsive">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th class="font-weight-bold text-muted text-uppercase" v-if="totalPrice >= 1">ИТОГО &nbsp; <span class="text-danger font-size-h3 font-weight-boldest" >{{totalPrice}} грн</span></th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end: Invoice footer-->


                            </div>
                            <div class="kt-portlet__foot">
                                <div class="kt-form__actions" v-loading="loading">
                                    <button type="submit" class="btn btn-primary">Сохранить</button>
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

    export default {
        middleware: 'auth',
        components: {
            Breadcrumbs
        },
        data() {
            return {
                breadcrumbsItems: [
                    {
                        title: 'Заказы',
                        name: 'orders'
                    },
                    {
                        title: 'Создать',
                        name: 'orders-create'
                    }
                ],

                order: {},

                bouquets: [],
                flowers: [],

                bouquetOrder: '',
                flowerOrder: '',
                orderData: [], //cart data
                totalPrice: '',

                loading: false,
                loadingOptions: false,
                errors: new Errors(),
            };
        },
        async fetch() {
            if(!this.$permission(['item_create'])) {
                this.$router.push({ name: 'index' });
            }
            await this.getItemOptionsData()
        },
        methods: {
           getItemOptionsData() {
                this.loadingOptions = true;
                this.$axios.get(`/orders/options/data`)
                    .then(response => {
                        let data = response.data.data;
                        this.flowers = data.flowers
                        this.bouquets = data.bouquets
                    })
                    .catch(errors => {
                        console.log(errors);
                    })
                    .finally(() => {
                        this.loadingOptions = false;
                    });
            },
            store(){
                this.loading = true;
                this.order.total_price = this.totalPrice
                this.$axios.post(`/orders`, {
                    order: this.order, 
                    order_data: this.orderData
                })
                    .then(response => {
                        let status = response.data.data;
                        if(status.status === 'success'){
                            this.$message({
                                showClose: true,
                                message: 'Успешно создано',
                                type: 'success',
                                center: true
                            });
                            this.$router.push({ name: 'orders' });
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
