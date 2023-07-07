<template>
    <div>
        <div class="kt-portlet__body">

            <div class="row d-flex" v-if="stats && this.$route.name === 'products'">
                <span class="mr-3">Весь товар: <b>{{ stats.total }}</b></span>
                <span class="mr-3">В работе: <b>{{ stats.white }}</b></span>
                <span class="mr-3">В пути: <b>{{ stats.blue }}</b></span>
                <span class="mr-3">Реставрация: <b>{{ stats.siniy }}</b></span>
                <span class="mr-3">Не выставлен: <b>{{ stats.red }}</b></span>
                <span class="mr-3">Ремонт: <b>{{ stats.green }}</b></span>
                <span class="mr-3">Бронь: <b>{{ stats.yellow }}</b></span>
                <span class="mr-3">Подготовка: <b>{{ stats.violet }}</b></span>
                <span class="mr-3">В архиве: <b>{{ stats.black }}</b></span>
                <span class="mr-3">Повтор: <b>{{ stats.grey }}</b></span>
            </div>

            <div class="row d-flex" v-if="stats && this.$route.name === 'orders'">
                <a class="mr-3 btn-link" @click="refreshOrders('')">Всего заказов: <b>{{ stats.total }}</b></a>
                <a class="mr-3 btn-link" @click="refreshOrders('red')">Новые: <b>{{ stats.red }}</b></a>
                <a class="mr-3 btn-link" @click="refreshOrders('green')">Завершенные: <b>{{ stats.green }}</b></a>
            </div>

            <!--begin: Search Form -->
            <div class="kt-form kt-fork--label-right kt-margin-t-20 kt-margin-b-10">
                <div class="row align-items-center">
                    <div class="col-xl-8 order-2 order-xl-1">
                        <div class="row align-items-center">
                            <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                <div class="kt-input-icon kt-input-icon--left">
                                    <input v-model="search"
                                           @input="$emit('search', search)"
                                           type="text"
                                           class="form-control"
                                           placeholder="Поиск..."
                                    >
                                    <span class="kt-input-icon__icon kt-input-icon__icon--left">
										<span><i class="la la-search"></i></span>
									</span>
                                </div>
                            </div>
                            <div class="col-md-4 kt-margin-b-20-tablet-and-mobile" v-if="this.$route.name === 'products'">
                                <div class="kt-input-icon kt-input-icon--left">
                                    <!--<input v-model="search_by_category"
                                           @input="$emit('search_by_category', search_by_category)"
                                           type="text"
                                           class="form-control"
                                           placeholder="Поиск по категории..."
                                    >
                                    <span class="kt-input-icon__icon kt-input-icon__icon&#45;&#45;left">
										<span><i class="la la-search"></i></span>
									</span>-->

                                    <treeselect
                                            :options="categories"
                                            placeholder="Фильтрация по категориям"
                                            v-model="search_by_category"
                                            @input="$emit('search_by_category', search_by_category)"
                                    />


                                </div>
                            </div>
                            <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                <div class="kt-input-icon kt-input-icon--left">
                                    <!--<input v-model="search_by_category"
                                           @input="$emit('search_by_category', search_by_category)"
                                           type="text"
                                           class="form-control"
                                           placeholder="Поиск по категории..."
                                    >
                                    <span class="kt-input-icon__icon kt-input-icon__icon&#45;&#45;left">
										<span><i class="la la-search"></i></span>
									</span>-->

                                    <select
                                            class="form-control"
                                            placeholder="Выберите зону"
                                            v-model="search_by_zone"
                                            @change="$emit('search_by_zone', search_by_zone)" v-if="this.$route.name === 'products'">
                                        <option class="select-zones" value="" selected>Все зоны</option>
                                        <option
                                                v-for="item in zonesProducts"
                                                :key="item.value"
                                                :value="item.value"
                                                :class="item.value"
                                                class="select-zones">
                                            {{ item.label }}
                                        </option>
                                    </select>

                                    <select
                                            class="form-control"
                                            placeholder="Выберите зону"
                                            v-model="search_by_zone"
                                            @change="$emit('search_by_zone', search_by_zone)" v-if="this.$route.name === 'orders' && tab === ''">
                                        <option class="select-zones" value="" selected>Все зоны</option>
                                        <option
                                                v-for="item in zonesOrders"
                                                :key="item.value"
                                                :value="item.value"
                                                :class="item.value"
                                                class="select-zones">
                                            {{ item.label }}
                                        </option>
                                    </select>

                                    <select
                                            class="form-control"
                                            placeholder="Выберите зону"
                                            v-model="search_by_zone"
                                            @change="$emit('search_by_zone', search_by_zone)" v-if="this.$route.name === 'orders' && tab === 'red'">
                                        <option class="select-zones" value="" selected>Все зоны</option>
                                        <option
                                                v-for="item in zonesOrdersRed"
                                                :key="item.value"
                                                :value="item.value"
                                                :class="item.value"
                                                class="select-zones">
                                            {{ item.label }}
                                        </option>
                                    </select>

                                    <select
                                            class="form-control"
                                            placeholder="Выберите зону"
                                            v-model="search_by_zone"
                                            @change="$emit('search_by_zone', search_by_zone)" v-if="this.$route.name === 'orders' && tab === 'green'">
                                        <option class="select-zones" value="" selected>Все зоны</option>
                                        <option
                                                v-for="item in zonesOrdersGreen"
                                                :key="item.value"
                                                :value="item.value"
                                                :class="item.value"
                                                class="select-zones">
                                            {{ item.label }}
                                        </option>
                                    </select>
                                    <!--<el-select v-model="search_by_zone"
                                               @input="$emit('search_by_zone', search_by_zone)"
                                               class="form-control fixed-select"
                                               filterable
                                               placeholder="Выберите зону">
                                        <el-option
                                                v-for="item in zones"
                                                :key="item.value"
                                                label=""
                                                :value="item.value"
                                                :class="item.value"
                                        >
                                        </el-option>
                                    </el-select>-->

                                </div>
                            </div>
                            <div class="col-md-3 kt-margin-b-20-tablet-and-mobile" :style="showActions"
                                 v-if="checkedItems.length > 0">
                                <label class="kt--font-bold kt--font-danger-" style="float: right">Выбрано
                                    <span id="kt_datatable_selected_number1">{{ checkedItems.length }}</span> записей:
                                </label>
                            </div>
                            <div class="col-md-4 kt-margin-b-20-tablet-and-mobile" :style="showActions"
                                 v-if="checkedItems.length > 0">
                                <button v-if="checkedItems.length === 1 && $route.name === 'products'"
                                        class="btn btn-sm btn-primary" type="button" @click="copyItem">Копировать
                                </button>
                                <button class="btn btn-sm btn-danger" type="button" @click="destroy()">Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="d-block" v-if="stats && this.$route.name === 'products'" style="float: right;">
                    <h4 class="mr-3 mt-5">Сумма продажи товара: <b>{{ stats.total_price_all_products }}</b> т.р.</h4>
                    <br>
                    <h4 class="mr-3">Сумма закупки товара: <b>{{ stats.price_rub_all_products }}</b> т.р.</h4>
                </div>


            </div>
        </div>
        <div class="kt-portlet__body kt-portlet__body--fit">
            <!--begin: Table -->
            <div class="table-responsive" style="">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>
                            <label class="kt-checkbox kt-checkbox--single kt-checkbox--all kt-checkbox--solid">
                                <input type="checkbox" v-model="selectAll"><span></span>
                            </label>
                        </th>
                        <th v-for="column in columns"
                            :key="column.name"
                            class="pointer"
                            @click="$emit('sort', column.name)"
                        >
                            <span
                                    :class="sortKey === column.name ? (sortOrders[column.name] > 0 ? 'span-sort' : 'span-sort') : ''">
                                {{ column.label }}
                                 <i :class="sortKey === column.name ? (sortOrders[column.name] > 0 ? 'flaticon2-arrow-up arrow-sort' : 'flaticon2-arrow-down arrow-sort') : ''"></i>
                            </span>
                        </th>

                    </tr>
                    </thead>

                    <tbody>
                    <tr v-if="items.length > 0" v-for="item in items" :key="item.id"
                        :class="item.zone ? 'pointer ' + item.zone : 'pointer'">
                        <td>
                            <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid"
                                   @click="checkUncheck(item.id)">
                                <input type="checkbox" :id="item.id" :value="item.id"
                                       v-model="checkedItems">&nbsp;<span></span>
                            </label>
                        </td>

                        <td v-for="column in columns" @click="goToItemEdit(item.id, item.item_id)">
                            <img v-if="column.name === 'image'"
                                 :src="apiImgUrl + 'image/' + item[column.name]"
                                 @error="imageUrlAlt"
                                 style="width:90px;height:90px"/>

                            <span v-else-if="column.name === 'order_status'">
                                {{ statuses[item.status] }}
                            </span>
                            <span v-else-if="column.name === 'status'">
                                {{ product_statuses[item.status] }}
                            </span>
                            <span v-else>
                            {{ item[column.name] }}
                            </span>
                        </td>
                    </tr>
                    <tr v-else>
                        <td class="text-center" colspan="6"><span><b>Нет Данных</b></span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!--end: Table -->
        </div>
    </div>
</template>

<script>
    //import VueHZoom from 'vue-h-zoom';
    //import Drift from 'drift-zoom';

    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import PicZoom from 'vue-piczoom'
    //import VueZoomer from 'vue-zoomer'
    //import 'vue-zoomer/dist/vue-zoomer.css'
    //import imageZoom from 'vue-image-zoomer'


    export default {
        components: {
            //VueHZoom,
            PicZoom,
            Treeselect
            //VueZoomer
            //imageZoom
        },
        props: [
            'columns',
            'items',
            'stats',
            'sortKey',
            'sortOrders',
            'itemRouteNameEdit',
            'typeClass',
            'statusClass',
            'permissionEdit',
            'loading',
            'statuses',
            'search_by_zone'
        ],
        data() {

            return {
                search: this.$route.query?.search ? this.$route.query?.search : '',
                search_by_category: '',
                search_by_zone: '',
                apiImgUrl: process.env.apiImgUrl,

                tab: false,

                categories: [],
                categoriesShow: [],

                checkedItems: [],
                showActions: 'display: none;',
                dragging: false,
                product_statuses: {
                    0: 'Отключен',
                    1: 'Включен',
                },

                zonesProducts: [
                    {
                        label: 'В работе',
                        value: 'white'
                    },
                    {
                        label: 'Не выставлен на сайте есть в наличие',
                        value: 'red'
                    },
                    {
                        label: 'Бронь',
                        value: 'yellow'
                    },
                    {
                        label: 'В пути',
                        value: 'blue'
                    },
                    {
                        label: 'Ремонт',
                        value: 'green'
                    },
                    {
                        label: 'Реставрация',
                        value: 'siniy'
                    },
                    {
                        label: 'Подготовка',
                        value: 'violet'
                    },
                    {
                        label: 'Архив',
                        value: 'black'
                    },
                    {
                        label: 'Повтор',
                        value: 'grey'
                    },
                ],

                zonesOrders: [
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
                ],

                zonesOrdersRed: [
                    {
                        value: 'white',
                        label: 'В работе',
                    },
                    {
                        value: 'red',
                        label: 'Новый',
                    }
                ],

                zonesOrdersGreen: [
                    {
                        value: 'green',
                        label: 'Состоявшийся заказ',
                    },
                    {
                        value: 'black',
                        label: 'Отказ',
                    }
                ],

                'images': {
                    'thumbs': [
                        {
                            'id': 1,
                            'url': 'http://decor-retro-web.ninja-tips.com/img/category/19/photo/1602609367.png'
                        },
                    ],
                    'normal_size': [
                        {
                            'id': 1,
                            'url': 'http://decor-retro-web.ninja-tips.com/img/category/19/photo/1602609367.png'
                        },
                    ],
                },

                zoomerOptions: {
                    zoomFactor: 3,
                    pane: 'pane',
                    hoverDelay: 300,
                    namespace: 'zoomer',
                    move_by_click: false,
                    scroll_items: 100,
                    choosed_thumb_border_color: "#bbdefb",
                    scroller_button_style: "line",
                    scroller_position: "left",
                    zoomer_pane_position: "right"
                }
            };
        },

        mounted() {
            setTimeout(function () {
//                 var demoTrigger = document.querySelector('.zoom-trigger');
// var paneContainer = document.querySelector('.detail');

// new Drift(demoTrigger, {
//   paneContainer: paneContainer,
//   inlinePane: false,
// });
                // $(".zoom_img").ezPlus();
            }, 2000);
            //$(document).ready(function() {

            //});
            //const $ = require( "jquery" )( window );

            //console.log(this.$route)
        },
        computed: {
            selectAll: {
                get: function () {
                    return this.items ? this.checkedItems.length == this.items.length : false;
                },
                set: function (value) {
                    let selected = [];

                    if (value) {
                        this.items.forEach(function (item) {
                            selected.push(item.id);
                        });
                    }
                    this.showActions = 'display: block;'
                    this.checkedItems = selected;
                }
            }
        },


        async fetch() {
            await this.getItemOptionsData()
            console.log(this.items)
        },

        methods: {

            async refreshOrders(zone) {
                this.tab = zone;
                this.items = (await this.$axios.get(process.env.apiWebUrl + `/adm/orders`, {
                    params: {
                        page: 1,
                        service: true,
                        draw: 2,
                        length: 10,
                        search: '',
                        search_by_category: '',
                        search_by_zone: zone,
                        column: 0,
                        dir: 'desc'
                    }
                })).data.data.data;
            },

            async getItemOptionsData() {
                const response = await this.$axios.$get(process.env.apiWebUrl + `/adm/products/options/data`)
                if (response) {
                    this.categories = response.data.categories
                }
            },

            imageUrlAlt(event) {
                event.target.src = process.env.apiImgUrl + "image/no_image.jpg"
            },

            dataColumn(item, column) {
                return item[column.name]
            },

            goToItemEdit(id, itemId) {
                let routeName = this.itemRouteNameEdit;
                console.log('permissionEdit', this.permissionEdit)
                //itemContains(['product'], item.type)"
                if (this.$permission(this.permissionEdit)) {
                    if (itemId && this.$route.path === 'itemSlug-itemId-reviews') {
                        this.$router.push({path: '/products/' + itemId + '/reviews/' + id});
                    } else {
                        if (this.$route.params.itemSlug) {
                            let str = this.$route.fullPath;
                            let regM = /models/i; //regM.test(str)
                            let regR = /reviews/i;
                            if (routeName == 'itemSlug-itemId-models-modelId') {
                                this.$router.push({
                                    name: routeName,
                                    params: {itemId: this.$route.params.itemId, modelId: id}
                                });
                            } else if (routeName == 'itemSlug-itemId-reviews-reviewId') {
                                this.$router.push({
                                    name: routeName,
                                    params: {itemId: this.$route.params.itemId, reviewId: id}
                                });
                            } else if (routeName == 'itemSlug-itemId-models-modelId-reviews-reviewId') {
                                this.$router.push({
                                    name: routeName,
                                    params: {
                                        itemId: this.$route.params.itemId,
                                        modelId: this.$route.params.modelId,
                                        reviewId: id
                                    }
                                });
                            } else {
                                console.log(2)
                                this.$router.push({name: routeName, params: {itemId: id}});
                            }

                        } else {
                            this.$router.push({name: routeName, params: {id: id}, query: {search: this.search}});
                        }
                    }

                }
            },

            copyItem() {
                this.$axios.post(process.env.apiWebUrl + `/adm/products/c/copy`, {
                    id: this.checkedItems[0]
                })
                    .then(response => {
                        let data = response.data.data;
                        if (data.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Успешно скопировано',
                                type: 'success',
                                center: true
                            });

                            this.items.unshift(data.product);
                        }
                    })
                    .catch(errors =>
                        console.log(errors)
                    );

            },
            destroy() {
                this.$axios.post(process.env.apiWebUrl + `/adm/${this.$route.name}/delete/checked`, {
                    checkedItems: this.checkedItems
                })
                    .then(response => {
                        let data = response.data.data;
                        if (data.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Успешно удалено',
                                type: 'success',
                                center: true
                            });
                            for (let i = 0; i < this.checkedItems.length; i++) {
                                let elementPos = this.items.map(function (x) {
                                    return x.id;
                                }).indexOf(this.checkedItems[i]);
                                let objectFound = this.items[elementPos];
                                this.items.splice(elementPos, 1);
                            }
                            this.checkedItems = [];


                        }
                    })
                    .catch(errors =>
                        console.log(errors)
                    );

            },

            startDrag(id) {
                this.showActions = 'display: block;';
                this.dragging = true;
                this.checkUncheck(id);
            },
            checkUncheck(id) {

                document.getElementById(id).checked = 1 - document.getElementById(id).checked;
                //console.log( document.getElementById(id).checked)
                if (document.getElementById(id).checked === false) {
                    this.checkedItems = this.checkedItems.filter(function (x) {
                        if (x !== id) {
                            return x;
                        }
                    });
                    //console.log('result: '+this.checkedItems);
                } else {
                    if (this.checkedItems.indexOf(id) === -1) {
                        this.checkedItems.push(id);
                    }
                    console.log(this.checkedItems)
                }
                this.showActions = 'display: block;';
            },
            doDrag(id) {
                if (this.dragging) {
                    document.getElementById(id).checked = 1 - document.getElementById(id).checked;
                    //console.log( document.getElementById(id).checked)
                    if (document.getElementById(id).checked === false) {
                        this.checkedItems = this.checkedItems.filter(function (x) {
                            if (x !== id) {
                                return x;
                            }
                        });
                        //console.log('result: '+this.checkedItems);
                    } else {
                        if (this.checkedItems.indexOf(id) === -1) {
                            this.checkedItems.push(id);
                        }
                        console.log(this.checkedItems)
                    }
                }
            },
            removeValue(arr, value) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] === value) {
                        arr.splice(i, 1);
                        break;
                    }
                }
                return arr;
            },
            stopDrag() {
                this.dragging = false;
            },

            typeClassFind(items, item) {
                return items.find(el => el.type === item)
            },

            statusClassFind(items, item) {
                return items.find(el => el.status === item)
            },

            getItemType() {
                this.routeType = this.$route.params.itemSlug.slice(0, -1);
            },

            itemContains(arr, elem) {
                return arr.indexOf(elem) != -1
            },

            parsePlatformApiUrl() {
                let apiUrl = this.$store.state.auth.user.profile.platform.endpoint
                let d = apiUrl.split('/');
                let url = d[0] + '//' + d[2];
                //let url = 'http://10.0.179.86:3080'

                return url
            }
        }
    }
</script>

<style>

    select.form-control.fixed-select {
        border: 1px solid #d3dae6;
    }

    option.select-zones.red {
        background: rgba(253, 57, 122, 0.9);
        color: white;
    }

    option.select-zones.blue {
        background: rgba(64, 158, 255, 0.84);
        color: white;
    }

    option.select-zones.green {
        background: rgba(29, 201, 107, 0.81);
        color: white;
    }

    option.select-zones.yellow {
        background: rgba(255, 255, 0, 0.64);
        color: black;
    }

    option.select-zones.siniy {
        background: #0067c2;
        color: white;
    }

    option.select-zones.violet {
        background: #bc08b5;
        color: white;
    }

    option.select-zones.black {
        background: #222;
        color: white;
    }

    option.select-zones.grey {
        background: #ccc;
        color: white;
    }

    option.select-zones {
        height: 50px;
        cursor: pointer;
    }

    option.select-zones {
        padding: 20px;
        min-height: 50px;
        curson: pointer;
    }

    .pointer {
        cursor: pointer;
    }

    tr.pointer.red {
        background: #f44336;
        color: #fff;
    }

    tr.pointer.yellow {
        background: #ffc107;
        color: #fff;
    }

    tr.pointer.blue {
        background: #409eff;
        color: #fff;
    }

    tr.pointer.green {
        background: #1dc962;
        color: #fff;
    }

    tr.pointer.siniy {
        background: #0067c2;
        color: white;
    }

    tr.pointer.violet {
        background: #bc08b5;
        color: white;
    }

    tr.pointer.black {
        background: #222;
        color: white;
    }

    tr.pointer.grey {
        background: #ccc;
        color: white;
    }

    .mouse-cover-canvas {
        width: 200px;
        height: 200px;
        left: 200px !important;
        top: 324px !important;
    }

    .responsive-image preview-box {
        width: 90px;
    }

    .detail {
        position: relative;
        width: 65%;
        margin-left: 5%;
        float: left;

    button {
        vertical-align: middle;
        opacity: .5;
        cursor: unset;
        background: $ color_invert_chrome_tint;
        margin-left: 1em;
    }

    }

    .imgtable {
        width: 130px;
        border-radius: 5px;
    }

    .span-sort {
        color: #5d78ff;
    }

    .arrow-sort {
        font-size: 0.6rem;
        display: inline-block;
        position: relative;
        right: -10px;
        line-height: 0;
        vertical-align: middle;
    }

    th > .kt-checkbox.kt-checkbox--single,
    td > .kt-checkbox.kt-checkbox--single {
        right: 0;
        top: 5px;
        margin: 0;
    }

    td > .kt-checkbox.kt-checkbox--single {
        top: 0;
    }

    .btn-link {
        cursor: pointer;
    }
</style>
