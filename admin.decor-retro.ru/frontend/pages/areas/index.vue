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
                                <h3 class="kt-portlet__head-title">Площадки</h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body">


                            <div class="row">
                                <div class="col-md-4 p-5">
                                    <h4>Добавление новой площадки</h4>
                                    <form class="mt-5" @submit.prevent="create" v-loading="loadingOptions">
                                        <div class="form-group">
                                            <label>Название площадки</label>
                                            <input type="text" class="form-control" placeholder="Название площадки" v-model="area" />
                                        </div>
                                        <div class="form-group" v-loading="loading">
                                            <button type="submit" class="btn btn-primary btn-block">Добавить площадку</button>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-md-4 p-5">
                                    <h4>Список добавленных площадок</h4>
                                    <table class="table mt-5">
                                        <tr>
                                            <th>Название площадки</th>
                                            <th></th>
                                        </tr>
                                        <tr v-for="area in areasList" :key="area.id">
                                            <td>
                                                {{ area.name }}
                                            </td>
                                            <td>
                                                <button type="submit" class="btn btn-danger btn-sm" @click="deleteArea(area.id)">Удалить</button>
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
                        title: 'Список площадок',
                        url: '/areas/'
                    }
                ],

                errors: new Errors(),
                loadingOptions: false,
                loading: false,
                area: '',
                areasList: []
            };
        },
        async fetch() {
            if (this.$store.state.user) {
                this.$router.push({name: 'index'});
            }
            await this.getAreasList()
        },
        methods: {

            async create() {
                this.loading = true;
                this.$axios.post(process.env.apiWebUrl + `/adm/areas/create`, {
                    name: this.area,
                })
                    .then(response => {
                        let data = response.data.data;
                        if (data.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Площадка успешно добавлена',
                                type: 'success',
                                center: true
                            });
                            this.area = "";
                            this.getAreasList()
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

            async deleteArea(id) {
                this.loading = true;
                this.$axios.get(process.env.apiWebUrl + `/adm/areas/${id}/delete`, {
                    name: this.area,
                })
                    .then(response => {
                        let data = response.data.data;
                        if (data.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Площадка успешно удалена',
                                type: 'success',
                                center: true
                            });
                            this.getAreasList()
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