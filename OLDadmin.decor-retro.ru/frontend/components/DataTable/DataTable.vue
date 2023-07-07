<template>
    <div>
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
                            <div class="col-md-3 kt-margin-b-20-tablet-and-mobile" :style="showActions" v-if="checkedItems.length > 0">
                                        <label class="kt--font-bold kt--font-danger-" style="float: right">Выбрано
                                            <span id="kt_datatable_selected_number1">{{checkedItems.length}}</span> записей:
                                        </label>
                                    </div>
                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile" :style="showActions" v-if="checkedItems.length > 0">
                                        <button v-if="checkedItems.length === 1 && $route.name === 'products'" class="btn btn-sm btn-primary" type="button"  @click="copyItem">Копировать</button>
                                        <button class="btn btn-sm btn-danger" type="button"  @click="destroy()" >Удалить</button>
                                    </div>
                            <!--<div class="col-md-4 kt-margin-b-20-tablet-and-mobile">-->
                                <!--<div class="kt-form__group kt-form__group&#45;&#45;inline">-->
                                    <!--<div class="kt-form__label">-->
                                        <!--<label>Status:</label>-->
                                    <!--</div>-->
                                    <!--<div class="kt-form__control">-->
                                        <!--<select class="form-control bootstrap-select">-->
                                            <!--<option value="">All</option>-->
                                            <!--<option value="1">Pending</option>-->
                                            <!--<option value="2">Delivered</option>-->
                                            <!--<option value="3">Canceled</option>-->
                                            <!--<option value="4">Success</option>-->
                                            <!--<option value="5">Info</option>-->
                                            <!--<option value="6">Danger</option>-->
                                        <!--</select>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="col-md-4 kt-margin-b-20-tablet-and-mobile">-->
                                <!--<div class="kt-form__group kt-form__group&#45;&#45;inline">-->
                                    <!--<div class="kt-form__label">-->
                                        <!--<label>Type:</label>-->
                                    <!--</div>-->
                                    <!--<div class="kt-form__control">-->
                                        <!--<select class="form-control bootstrap-select" id="kt_form_type">-->
                                            <!--<option value="">All</option>-->
                                            <!--<option value="1">Online</option>-->
                                            <!--<option value="2">Retail</option>-->
                                            <!--<option value="3">Direct</option>-->
                                        <!--</select>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        </div>
                    </div>
                    <!--<div class="col-xl-4 order-1 order-xl-2 kt-align-right">-->
                        <!--<a href="#" class="btn btn-default kt-hidden">-->
                            <!--<i class="la la-cart-plus"></i> New Order-->
                        <!--</a>-->
                        <!--<div class="kt-separator kt-separator&#45;&#45;border-dashed kt-separator&#45;&#45;space-lg d-xl-none"></div>-->
                    <!--</div>-->
                </div>
            </div>
            <!--end: Search Form -->

            <!--begin: Selected Rows Group Action Form -->
            <!--<div class="kt-form kt-fork&#45;&#45;label-align-right kt-margin-t-20 collapse show">-->
                <!--<div class="row align-items-center">-->
                    <!--<div class="col-xl-12">-->
                        <!--<div class="kt-form__group kt-form__group&#45;&#45;inline">-->
                            <!--<div class="kt-form__label kt-form__label-no-wrap">-->
                                <!--<label class="kt&#45;&#45;font-bold kt&#45;&#45;font-danger-">Selected-->
                                    <!--<span>0</span> records:</label>-->
                            <!--</div>-->
                            <!--<div class="kt-form__control">-->
                                <!--<div class="btn-toolbar">-->
                                    <!--<div class="dropdown">-->
                                        <!--<button type="button" class="btn btn-accent btn-sm dropdown-toggle">-->
                                            <!--Update status-->
                                        <!--</button>-->
                                        <!--<div class="dropdown-menu">-->
                                            <!--<a class="dropdown-item" href="#">Pending</a>-->
                                            <!--<a class="dropdown-item" href="#">Delivered</a>-->
                                            <!--<a class="dropdown-item" href="#">Canceled</a>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <!--&nbsp;&nbsp;&nbsp;-->
                                    <!--<button class="btn btn-sm btn-danger" type="button">Delete All</button>-->
                                    <!--&nbsp;&nbsp;&nbsp;-->
                                    <!--<button class="btn btn-sm btn-success" type="button">Fetch Selected Records</button>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--end: Selected Rows Group Action Form -->

        </div>
        <div class="kt-portlet__body kt-portlet__body--fit">
            <!--begin: Table -->
            <div class="table-responsive" style="">
                <table class="table table-hover"  >

                    <thead class="">
                    <tr class="">
                        <th class="  " scope="col">
                                    <span >
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--all kt-checkbox--solid">
                                            <input type="checkbox"  v-model="selectAll">&nbsp;<span></span>
                                        </label>
                                    </span>
                        </th>
                        <!--<th data-field="name" class="kt-datatable__cell kt-datatable__cell&#45;&#45;sort">-->
                            <!--<span style="width: 121px;">Name</span>-->
                        <!--</th>-->
                        <!--<th data-field="name" -->
                            <!--class="kt-datatable__cell kt-datatable__cell&#45;&#45;sort kt-datatable__cell&#45;&#45;sorted"-->
                            <!--data-sort="asc"-->
                        <!--&gt;-->
                            <!--<span style="width: 121px;">Name<i class="flaticon2-arrow-up"></i></span>-->
                        <!--</th>-->

                        <th v-for="column in columns"
                            :key="column.name"
                            @click="$emit('sort', column.name)"
                            :style="'cursor:pointer;'"
                            scope="col"
                        >
                            <span :class="sortKey === column.name ? (sortOrders[column.name] > 0 ? 'span-sort' : 'span-sort') : ''">
                                {{column.label}}
                                 <i :class="sortKey === column.name ? (sortOrders[column.name] > 0 ? 'flaticon2-arrow-up arrow-sort' : 'flaticon2-arrow-down arrow-sort') : ''"></i>
                            </span>

                        </th>
                    </tr>
                    </thead>

                    <tbody class="" >
                    <tr v-if="items.length > 0" v-for="item in items" :key="item.id">
                        <td class="" scope="row">
                             <span>
                                 <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid" @click="checkUncheck(item.id)" >
                                            <input type="checkbox" :id="item.id" :value="item.id"  v-model="checkedItems" >&nbsp;<span></span>
                                        </label>
                             </span>
                        </td>
                        <td v-for="column in columns" style="cursor:pointer;">
                            <span v-if="column.name === 'data_column'">
                                <!--<n-link :to="{name: dataColumn(item, column).url_name, params: {id: dataColumn(item, column).id}}"-->
                                <!--&gt;-->
                                    <!--{{ dataColumn(item, column).name }}-->
                                <!--</n-link-->
                                <n-link :to="dataColumn(item, column).url"
                                >
                                    {{ dataColumn(item, column).name }}
                                </n-link
                                ></span>
                            <span v-if="column.name === 'dates'" v-html="dataColumn(item, column)" @click="goToItemEdit(item.id, item.item_id)"></span>
                            <!-- <span v-else-if="column.name === 'status'" @click="goToItemEdit(item.id, item.item_id)"
                            >
                                <span v-if="Number(dataColumn(item, column)) === 1" class="kt-badge kt-badge--success kt-badge--inline kt-badge--pill">Включено</span>
                                <span v-if="Number(dataColumn(item, column)) === 0" class="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill">Отключено</span>
                            </span> -->
                            <span v-else-if="column.name === 'type'" @click="goToItemEdit(item.id, item.item_id)">
                               <span :class='typeClassFind(typeClass, item.type).type === item.type ? "kt-badge " +typeClassFind(typeClass, item.type).badge+ " kt-badge--dot" : ""'></span>
                                <span :class='typeClassFind(typeClass, item.type).type === item.type ? "kt-font-bold " +typeClassFind(typeClass, item.type).font+"" : ""' >{{ dataColumn(item, column) }}</span>
                            </span>
                            <span v-else-if="column.type === 'image'" @click="goToItemEdit(item.id, item.item_id)">
                              <!--   <image-zoom 
                                    :regular="dataColumn(item, column)" 
                                    :zoom="dataColumn(item, column)"
                                    :zoom-amount="3" 
                                    hover-message=""
                                    touch-message=""
                                    img-class="imgtable"
                                >                
                                </image-zoom> -->
                                <!-- <product-zoomer
  :base-images="images"
  :base-zoomer-options="zoomerOptions"
/> -->
                                <!-- <v-zoomer style="width: 500px; height: 500px; border: solid 1px silver;">
  <img
    :src="dataColumn(item, column)"
    style="object-fit: contain; width: 50px; height: 50px;"
  > -->
<!-- </v-zoomer> -->
                              <!--   <vue-h-zoom :image="dataColumn(item, column)"
                                :width="50"  :height="50"
                                :image-full="dataColumn(item, column)"
                                :zoom-level="2" :zoom-window-size="5"></vue-h-zoom> -->
                              <!--   <img :src="dataColumn(item, column)" 
                                alt="" 
                                class="zoom-trigger" 
                                style="border-radius: 0.4rem; width: 50px;" 
                                :data-zoom="dataColumn(item, column)" />
                                <p class="detail">wdwd</p> -->

                             <!--   <img class="zoom_img" style="border-radius: 0.4rem; width: 50px;" :src="dataColumn(item, column)"/> -->
                             <!-- :big-url="dataColumn(item, column)"  -->
                            <pic-zoom :url="'http://193.169.179.233/image/'+dataColumn(item, column)" style="width:90px;height:90px" :big-url="'http://193.169.179.233/image/'+dataColumn(item, column)" :scale="2.5"></pic-zoom>
                           
                            </span>
                            <span v-else>
                                <span  v-if="column.name !== 'data_column'" @click="goToItemEdit(item.id, item.item_id)">{{ dataColumn(item, column) }}</span>
                            </span>
                        </td>
                    </tr>
                    <tr v-if="items.length < 1">
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
    import PicZoom from 'vue-piczoom'
//import VueZoomer from 'vue-zoomer'
//import 'vue-zoomer/dist/vue-zoomer.css'
//import imageZoom from 'vue-image-zoomer'


    export default {
        components: {
            //VueHZoom,
            PicZoom
            //VueZoomer
            //imageZoom
        },
        props: [
            'columns',
            'items',
            'sortKey',
            'sortOrders',
            'itemRouteNameEdit',
            'typeClass',
            'statusClass',
            'permissionEdit',
            'loading',
        ],
        data() {
            
            return {
                search: '',

                checkedItems: [],
                showActions: 'display: none;',
                dragging: false,

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
                    move_by_click:false,
                    scroll_items: 100, 
                    choosed_thumb_border_color: "#bbdefb",
                    scroller_button_style: "line",
                    scroller_position: "left",
                    zoomer_pane_position: "right"
                }
            };
        },

        mounted() {
            setTimeout(function(){
//                 var demoTrigger = document.querySelector('.zoom-trigger');
// var paneContainer = document.querySelector('.detail');

// new Drift(demoTrigger, {
//   paneContainer: paneContainer,
//   inlinePane: false,
// });
                        // $(".zoom_img").ezPlus();
                     },2000);
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
        methods: {
            dataColumn(item, column) {
                return item[column.name]
            },

            goToItemEdit(id, itemId){
                let routeName = this.itemRouteNameEdit;
                //itemContains(['product'], item.type)"
                if(this.$permission(this.permissionEdit)){
                    if(itemId && this.$route.path === 'itemSlug-itemId-reviews') {
                        this.$router.push({ path: '/products/'+itemId+'/reviews/'+id});
                    } else {
                    if(this.$route.params.itemSlug) {
                        let str = this.$route.fullPath;
                        let regM = /models/i; //regM.test(str)
                        let regR = /reviews/i;
                        if(routeName == 'itemSlug-itemId-models-modelId') {
                            this.$router.push({ name: routeName, params: { itemId: this.$route.params.itemId, modelId: id } });
                        }
                        else if(routeName == 'itemSlug-itemId-reviews-reviewId') {
                            this.$router.push({ name: routeName, params: { itemId: this.$route.params.itemId, reviewId: id } });
                        }
                        else if(routeName == 'itemSlug-itemId-models-modelId-reviews-reviewId') {
                            this.$router.push({ name: routeName, params: { itemId: this.$route.params.itemId, modelId: this.$route.params.modelId, reviewId: id } });
                        }
                        else {
                            console.log(2)
                            this.$router.push({ name: routeName, params: { itemId: id } });
                        }

                    } else {
                        console.log(3)
                            this.$router.push({ name: routeName, params: { id: id } });
                        }
                    }

                }
            },

            copyItem() {
                this.$axios.post(process.env.apiWebUrl+`/adm/products/c/copy`, {
                    id: this.checkedItems[0]
                })
                    .then(response => {
                        let data = response.data.data;
                        if(data.status === 'success'){
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
            destroy(){
                this.$axios.post(process.env.apiWebUrl+`/adm/${this.$route.name}/delete/checked`, {
                    checkedItems: this.checkedItems
                })
                    .then(response => {
                        let data = response.data.data;
                        if(data.status === 'success'){
                            this.$message({
                                showClose: true,
                                message: 'Успешно удалено',
                                type: 'success',
                                center: true
                            });
                             for(let i = 0; i < this.checkedItems.length; i++) {
                                let elementPos = this.items.map(function(x) {return x.id; }).indexOf(this.checkedItems[i]);
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

            startDrag(id){
                this.showActions = 'display: block;';
                this.dragging = true;
                this.checkUncheck(id);
            },
            checkUncheck(id){

                document.getElementById(id).checked = 1 - document.getElementById(id).checked;
                //console.log( document.getElementById(id).checked)
                if(document.getElementById(id).checked === false){
                    this.checkedItems = this.checkedItems.filter(function(x) {
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
                    if(document.getElementById(id).checked === false){
                        this.checkedItems = this.checkedItems.filter(function(x) {
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
                for(let i = 0; i < arr.length; i++) {
                    if(arr[i] === value) {
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
                return arr.indexOf( elem ) != -1
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
.mouse-cover-canvas {
    width: 200px;
    height: 200px;
    left: 200px  !important;
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
  button{
    vertical-align:middle;
    opacity:.5;
    cursor:unset;
    background:$color_invert_chrome_tint;
    margin-left:1em;
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
</style>
