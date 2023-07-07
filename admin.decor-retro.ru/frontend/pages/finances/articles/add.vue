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
                                <div class="col-md-6 border-right p-5">

                                    <div class="row">
                                        <div class="col-md-4 p-5">
                                            <form @submit.prevent="addArticle" v-loading="loadingOptions">
                                                <h5>Добавление статьи</h5>
                                                <div class="form-group mt-5">
                                                    <label>Статья</label>
                                                    <input type="text" class="form-control" placeholder="Статья"
                                                           v-model="article">
                                                </div>
                                                <div class="form-group">
                                                    <button type="submit" class="btn btn-primary btn-block">Добавить
                                                        статью
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="col-md-8 p-5">
                                            <h5>Список</h5>
                                            <table class="table mt-5">
                                                <tr>
                                                    <th>Статья</th>
                                                    <th></th>
                                                </tr>
                                                <tr v-for="article in articlesList" :key="article.id">
                                                    <td>
                                                        {{ article.name }}
                                                    </td>
                                                    <td>
                                                        <button type="submit" class="btn btn-danger btn-sm" @click="deleteArticle(article.id)">
                                                            Удалить
                                                        </button>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-6 p-5">
                                    <div class="row">
                                        <div class="col-md-4 p-5">
                                            <form @submit.prevent="ItemOfExpenses" v-loading="loadingOptions">
                                                <h5>Добавление статьи затрат</h5>
                                                <div class="form-group mt-5">
                                                    <label>Сумма затраты</label>
                                                    <input type="text" class="form-control" placeholder="Сумма затраты"
                                                           v-model="expenses.amount" required/>
                                                </div>
                                                <div class="form-group">
                                                    <label>Статья</label>
                                                    <select class="form-control" placeholder="Статья затраты"
                                                            v-model="expenses.article" required>
                                                        <option value="" selected disabled>Выберите стаью затраты</option>
                                                        <option v-for="article in articlesList" :value="article.name">{{ article.name }}</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <button type="submit" class="btn btn-primary btn-block">Добавить
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="col-md-8 p-5">
                                            <h5>Список</h5>
                                            <table class="table mt-5">
                                                <tr>
                                                    <th>Сумма затраты</th>
                                                    <th>Статья затраты</th>
                                                    <th></th>
                                                </tr>
                                                <tr v-for="expense in expensesList" :key="expense.id">
                                                    <td>
                                                        {{ expense.amount }} р.
                                                    </td>
                                                    <td>
                                                        {{ expense.article }}
                                                    </td>
                                                    <td>
                                                        <button type="submit" class="btn btn-danger btn-sm" @click="deleteExpense(expense.id)">
                                                            Удалить
                                                        </button>
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

                expenses: {
                    amount: '',
                    article: ''
                },
                expensesList: [],
                articlesList: [],
                errors: new Errors(),
                loadingOptions: false,
                loading: false,
            };
        },
        async fetch() {
            if (this.$store.state.user) {
                this.$router.push({name: 'index'});
            }
            await this.getArticles();
            await this.getExpenses();
        },
        methods: {
            async ItemOfExpenses() {
                this.$axios.post(process.env.apiWebUrl + `/adm/finances/expenses/add`, {
                    expenses: this.expenses
                })
                    .then(response => {
                        let status = response.data.data;
                        if (status.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Статья успешно добавлена',
                                type: 'success',
                                center: true
                            });
                            this.getExpenses();
                        }
                    })
                    .catch(error =>
                        this.errors.record(error.response.data)
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            },

            async addArticle() {
                this.loading = true;
                this.$axios.post(process.env.apiWebUrl + `/adm/finances/articles/add`, {
                    article: this.article
                })
                    .then(response => {
                        let status = response.data.data;
                        if (status.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Статья успешно добавлена',
                                type: 'success',
                                center: true
                            });
                            this.getArticles();
                        }
                    })
                    .catch(error =>
                        this.errors.record(error.response.data)
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            },

            async getArticles() {
                this.loading = true;
                this.$axios.get(process.env.apiWebUrl + `/adm/finances/articles/get`)
                    .then(response => {
                        this.articlesList = response.data.data;
                    }).catch(error =>
                        this.errors.record(error.response.data)
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            },

            async getExpenses() {
                this.loading = true;
                this.$axios.get(process.env.apiWebUrl + `/adm/finances/expenses/get`)
                    .then(response => {
                        this.expensesList = response.data.data;
                    })
                    .catch(error =>
                        this.errors.record(error.response.data)
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            },


            async deleteArticle(id) {
                this.loading = true;
                this.$axios.get(process.env.apiWebUrl + `/adm/finances/articles/${id}/delete`)
                    .then(response => {
                        let data = response.data.data;
                        if (data.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Статья успешно удалена',
                                type: 'success',
                                center: true
                            });
                            this.getArticles()
                        }
                    })
                    .catch(error =>
                        this.errors.record(error.response.data)
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            },

            async deleteExpense(id) {
                this.loading = true;
                this.$axios.get(process.env.apiWebUrl + `/adm/finances/expenses/${id}/delete`)
                    .then(response => {
                        let data = response.data.data;
                        if (data.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Статья затрат успешно удалена',
                                type: 'success',
                                center: true
                            });
                            this.getExpenses()
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