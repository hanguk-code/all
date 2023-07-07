<template>
    <div>

        <!-- begin:: Content -->
        <form class="kt-form" role="form" @submit.prevent="update" v-loading="loadingOptions">
            <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                <div class="card card-body mt-5">

                    <div class="row">

                        <div class="col-md-4 py-5">

                            <div class="form-group">
                                <label>Имя</label>
                                <input type="text" class="form-control" v-model="order.name"/>
                            </div>

                            <div class="form-group">
                                <label>Телефон</label>
                                <input type="text" class="form-control" v-model="order.phone"/>
                            </div>
                            <div class="form-group">
                                <label>E-mail</label>
                                <input type="email" class="form-control" v-model="order.email"/>
                            </div>
                            <div class="form-group">
                                <label>Комментарий</label>
                                <textarea type="text" class="form-control" v-model="order.comment"></textarea>
                            </div>


                            <hr>

                            <div class="form-group" v-loading="loading">
                                <button type="submit" class="btn btn-primary" @click="update">Применить изменения
                                </button>
                            </div>
                        </div>

                        <div class="col-md-8 py-5">
                            <label>ID товаров</label>
                            <input type="text" class="form-control" v-model="products"
                                   placeholder="Введите ID товаров"/>
                            <span class="text-small">Все ID указываются через запятую</span>
                        </div>
                    </div>

                </div>
            </div>
        </form>

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
                order: {},
                products: '',

                loading: false,
                loadingOptions: false,
                errors: new Errors(),
                editField: '',
                oldValueField: '',
            };
        },
        async fetch() {
            if (!this.$permission(['*'])) {
                await this.$router.push({name: 'index'});
            }
            // await this.getItemOptionsData()
            await this.getOrderData()
        },

        methods: {

            async getOrderData() {
                const response = await this.$axios.$get(process.env.apiWebUrl + `/adm/orders/${this.$route.query.order_id}`)
                if (response) {
                    this.order = response.data;

                    for (let index in response.data.product_id) {
                        let product = response.data.product_id[index];
                        this.products += product.product_id + ",";
                    }

                }
            },

            update() {
                this.loading = true;
                this.order.total_price = this.totalPrice;

                this.products = (this.products).split(',');

                this.$axios.post(process.env.apiWebUrl + `/adm/orders/${this.$route.query.order_id}/edit`, {
                    order: this.order,
                    products: this.products
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
            }

        }
    }

</script>