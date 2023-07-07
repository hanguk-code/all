<template>
    <div>

        <form class="kt-form" role="form" @submit.prevent="create">
            <div class="card col-6 py-3">

                <div class="card-body">

                    <div class="form-group col-12">

                        <div class="form-group">
                            <label>Дата продажи товара</label>
                            <input type="date" class="form-control" v-model="order.date" placeholder="Дата"/>
                        </div>

                        <div class="form-group">
                            <label>Продано на</label>
                            <select class="form-control" v-model="order.type">
                                <option v-for="area in areasList" :key="area.id" :value="area.name" selected>{{ area.name }}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Цена продажи</label>
                            <input type="text" class="form-control" v-model="order.price" placeholder="Цена продажи"/>
                        </div>

                        <div class="form-group">
                            <label>Размер скидки</label>
                            <input type="text" class="form-control" v-model="order.amount_of_discount" placeholder="Размер скидки"/>
                        </div>

                        <div class="form-group">
                            <label>Имя</label>
                            <input type="text" class="form-control" v-model="order.name" placeholder="Имя"/>
                        </div>
                        <div class="form-group">
                            <label>Почта</label>
                            <input type="email" class="form-control" v-model="order.email" placeholder="Почта"/>
                        </div>
                        <div class="form-group">
                            <label>Номер телефона</label>
                            <VuePhoneNumberInput
                                    placeholder="Номер телефона"
                                    :only-countries="['RU','BY','UA','AM','KZ']"
                                    v-model="order.phone"
                                    @update="updatePhone"
                            />
                        </div>

                        <div class="form-group">
                            <label>Адрес</label>
                            <input type="text" class="form-control" v-model="order.address" placeholder="Адрес"/>
                        </div>

                        <div class="form-group">
                            <label>Комментарии</label>
                            <textarea class="form-control" v-model="order.comments" placeholder="Комментарии" />
                        </div>

                        <div class="form-group">
                            <label>Теги</label>
                            <textarea class="form-control" v-model="order.tags" placeholder="Теги" />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Провести</button>
                </div>

            </div>
        </form>

    </div>
</template>

<script>
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';

    export default {
        middleware: 'auth',
        components: {
            VuePhoneNumberInput
        },
        data() {
            return {
                loading: false,
                loadingOptions: false,
                order: {
                    order_id: "",
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                    comments: "",
                    tags: "",
                    type: "Сайт",
                    date: new Date(),
                    price: 0,
                    amount_of_discount: 0
                },
                areasList: []
            };
        },
        async fetch() {
            await this.getAreasList();
            await this.getProductData();
        },
        methods: {
            async getProductData() {
                const response = await this.$axios.$get(process.env.apiWebUrl + `/adm/products/${this.$route.query.product_id}`)
                if (response) {
                    this.order.price = response.data.price
                    this.order.amount_of_discount = response.data.amount_of_discount
                }
            },

            create() {
                this.loading = true;
                this.$axios.post(process.env.apiWebUrl + `/adm/orders/${this.$route.query.product_id}/create`, {
                    order: this.order,
                })
                    .then(response => {
                        let status = response.data.data;
                        if (status.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Успешно создано',
                                type: 'success',
                                center: true
                            });
                            this.$router.push({path: '/products/' + this.$route.query.product_id});
                        }
                    })
                    .catch(error =>
                        this.errors.record(error.response.data)
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            },

            async getAreasList() {
                this.loading = true;
                this.$axios.get(process.env.apiWebUrl + `/adm/areas/index`)
                    .then(response => {
                        this.areasList = response.data.data;
                    })
                    .catch(error =>
                        this.errors.record(error.response.data)
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            },

            updatePhone(params) {
                this.order.phoneDetails = params;
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
