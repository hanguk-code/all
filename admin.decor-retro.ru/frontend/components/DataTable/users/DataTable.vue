<template>
    <div>

        <div class="row">

            <div class="col-md-8">
                <div class="kt-portlet__body">





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


                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                        <el-select v-model="search_by_status"
                                                   @input="$emit('search_by_status', search_by_status)"
                                                   class="form-control fixed-select"
                                                   filterable
                                                   placeholder="Выберите статус">
                                            <el-option
                                                    v-for="item in colors"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>

                                    <div class="col-md-3 kt-margin-b-20-tablet-and-mobile" :style="showActions"
                                         v-if="checkedItems.length > 0">
                                        <label class="kt--font-bold kt--font-danger-" style="float: right">Выбрано
                                            <span id="kt_datatable_selected_number1">{{ checkedItems.length }}</span> записей:
                                        </label>
                                    </div>
                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile" :style="showActions"
                                         v-if="checkedItems.length > 0">
                                        <button class="btn btn-sm btn-danger" type="button" @click="destroy()">Удалить</button>
                                    </div>
                                </div>
                            </div>
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
                                <th></th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr v-if="items.length > 0" v-for="item in items" :key="item.id" :class="item.status ? 'pointer ' + item.status : 'pointer'">
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

                                <td>
                                    <a @click="goToItemEdit(item.id, item.item_id)" href="#">Подробнее</a>
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

            <div class="col-md-4 py-5 h5">
                <span class="mr-3 d-block">Всего покупателей: <b>{{ stats.total }}</b></span>
                <span class="mr-3 d-block">Постоянных покупателей: <b>{{ stats.permanent }}</b></span>
                <span class="d-block">Черный список: <b>{{ stats.blacklist }}</b></span>
            </div>

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
        ],
        data() {

            return {
                search: '',
                search_by_zone: '',
                search_by_status: '',
                apiImgUrl: process.env.apiImgUrl,

                categories: [],
                categoriesShow: [],

                checkedItems: [],
                showActions: 'display: none;',
                dragging: false,
                product_statuses: {
                    0: 'Отключен',
                    1: 'Включен',
                },

                colors: [
                    {
                        label: 'Все статусы',
                        value: ''
                    },
                    {
                        label: 'Новые',
                        value: 'begginer'
                    },
                    {
                        label: 'Постоянные',
                        value: 'permanent'
                    },
                    {
                        label: 'Черный список',
                        value: 'blacklist'
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
                    console.log(value)
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
        },

        methods: {

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
                            console.log(3)
                            this.$router.push({name: routeName, params: {id: id}});
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

    tr.pointer.blacklist {
        background: #333;
        color: #fff;
    }

    tr.pointer.permanent {
        background: #f44336;
        color: #fff;
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

</style>
