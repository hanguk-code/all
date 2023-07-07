<template>
    <div>
        <DataTable :columns="columns"
                   :items="items"
                   :stats="stats"
                   :sortKey="sortKey"
                   :sortOrders="sortOrders"
                   :itemRouteNameEdit="itemRouteNameEdit"
                   :typeClass="typeClass"
                   :statusClass="statusClass"
                   :permissionEdit="permissionEdit"
                   :statuses="statuses"
                   :loading="loading"
                   @sort="sortBy"
                   @search="searchData"
                   @search_by_category="searchByCategory"
                   @search_by_zone="searchByZone"
        />
        <div style="margin-top: 20px; "
             v-observe-visibility="pagination.currentPage !== pagination.lastPage ? visibilityChanged : false"
        ></div>
    </div>
</template>

<script>
    //import DataTable from '~/components/Datatable/Datatable.vue'

    export default {
        components: {
            //DataTable
        },
        props: [
            'url',
            'statuses',
            'itemRouteNameEdit',
            'uniqueItems',
            'permissionEdit',
            'permissionShow',
            'roleShow',
            'itemType',
            'isModel',
            'itemId',
        ],
        data() {
            return {
                items: [],
                columns: [],
                stats: [],
                sortKey: '',
                sortOrders: {},
                perPage: ['10', '20', '30'],
                tableData: {
                    service: true,
                    draw: 0,
                    page: 0,
                    length: 10,
                    search: this.$route.query?.search ? this.$route.query?.search : '',
                    search_by_category: '',
                    search_by_zone: this.$route.name === 'orders' ? 'red' : '',
                    column: 0,
                    dir: 'desc',
                    type: this.itemType,
                    is_model: this.isModel,
                    item_id: this.itemId,
                    u_id: this.$store.state.auth.user.id,
                    h_id: this.$store.state.auth.user.hash,
                    pr: this.checkPermission()
                },
                statusClass: [],
                typeClass: [],
                pagination: {
                    lastPage: '',
                    currentPage: '',
                    total: '',
                    lastPageUrl: '',
                    nextPageUrl: '',
                    prevPageUrl: '',
                    from: '',
                    to: ''
                },

                loading: false,
            };
        },

        async fetch() {
            await this.getItems()
        },

        methods: {
            visibilityChanged() {
                //this.$fetch()
                //if(items.length > 1) {
                let vm = this
                if (vm.pagination.currentPage < vm.pagination.lastPage) {
                    setTimeout(function () {
                        vm.getItems(vm.pagination.nextPageUrl)
                    }, 200);
                }
                //}
            },
            getItems(url = this.url) {
                this.loading = true;
                this.tableData.draw++;
                this.$axios.get(url, {params: this.tableData})
                    .then(response => {
                        let data = response.data;
                        if (this.tableData.search !== '') {
                            if (this.tableData.draw == data.draw) {
                                this.items = this.items.concat(data.data.data)
                                console.log((this.items).length)
                                this.configPagination(data.data);
                                this.columns = data.columns
                                if (data.stats) {
                                    this.stats = data.stats
                                }
                                if (!this.sortKey) {
                                    this.sortKey = data.sortKey
                                }
                                this.statusClass = data.statusClass
                                this.typeClass = data.typeClass

                                if (this.sortOrders[this.columns[0].name] === undefined) {
                                    this.sortOrder()
                                }


                                if (this.uniqueItems) {
                                    this.uniqueArray()
                                }

                            }
                        } else {
                            this.items = this.items.concat(data.data.data)
                            console.log((this.items).length)
                            this.configPagination(data.data);
                            this.columns = data.columns
                            if (data.stats) {
                                this.stats = data.stats
                            }
                            if (!this.sortKey) {
                                this.sortKey = data.sortKey
                            }
                            this.statusClass = data.statusClass
                            this.typeClass = data.typeClass

                            if (this.sortOrders[this.columns[0].name] === undefined) {
                                this.sortOrder()
                            }

                            if (this.uniqueItems) {
                                this.uniqueArray()
                            }

                        }


                    })
                    .catch(errors => {
                        console.log(errors);
                    })
                    .finally(() => {
                        this.loading = false;
                        this.tableData.page++;
                    });
            },

            configPagination(data) {
                this.pagination.lastPage = data.last_page;
                this.pagination.currentPage = data.current_page;
                this.pagination.total = data.total;
                this.pagination.lastPageUrl = data.last_page_url;
                this.pagination.nextPageUrl = data.next_page_url;
                this.pagination.prevPageUrl = data.prev_page_url;
                this.pagination.from = data.from;
                this.pagination.to = data.to;
            },

            sortOrder() {
                this.columns.forEach((column) => {
                    this.sortOrders[column.name] = -1;
                });
            },

            sortBy(key) {

                this.items = [];
                this.sortKey = key;
                this.sortOrders[key] = this.sortOrders[key] * -1;
                this.tableData.column = this.getIndex(this.columns, 'name', key);
                this.tableData.dir = this.sortOrders[key] === 1 ? 'asc' : 'desc';
                this.tableData.page = 1
                this.getItems();
            },

            searchData(search) {
                this.tableData.page = 1
                this.items = [];
                this.tableData.search = search;
                this.getItems();
            },

            searchByCategory(search_by_category) {
                this.tableData.page = 1
                this.items = [];
                this.tableData.search_by_category = search_by_category;
                this.getItems()
            },

            searchByZone(search_by_zone) {
                this.tableData.page = 1
                this.items = [];
                this.tableData.search_by_zone = search_by_zone;
                this.getItems()
                console.log(this.tableData.search_by_zone)
            },

            getIndex(array, key, value) {
                return array.findIndex(i => i[key] == value)
            },

            uniqueArray() {
                this.items = this.items.filter((thing, index, self) =>
                    index === self.findIndex((t) => (
                        t.name === thing.name
                    ))
                )
            },

            checkPermission() {
                if (this.roleShow) {
                    this.$permission(this.roleShow ?? ['no-role'])
                }
                if (this.permissionShow) {
                    this.$permission(this.permissionShow ?? ['no-permission'])
                }
            }
        }
    }
</script>

<style scoped>

</style>
