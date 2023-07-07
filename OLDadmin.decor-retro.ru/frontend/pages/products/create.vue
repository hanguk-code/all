<template>
    <div>
        <Breadcrumbs title="Товары" :items="breadcrumbsItems" />

        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div class="row">
                <div class="col-md-12">
                    <!--begin::Form-->
                        <form class="kt-form"  role="form" @submit.prevent="store" v-loading="loadingOptions">
                    <!--begin::Portlet-->
                    <div class="kt-portlet">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">Новый Товар</h3>
                            </div>
                            <div class="kt-portlet__head-label">
                                <button type="submit" class="btn btn-primary">Сохранить</button>
                                </div>
                        </div>

                        
                            <div class="kt-portlet__body">
                                 <div class="row" v-show="showPhoto">
                                    <div class="col-md-2">
                                        <img :src="photo" style="border-radius: 50%; width: 100%; height: auto;">

                                    </div>
                                </div>
                                <br v-show="showPhoto">
                                <div class="row">

                                    <div class="col-md-2">
                                        <a class="btn btn-success btn-sm btn-block" style="color: white;" @click="toggleShow">Добавить фото</a>
                                    </div>
                                    <br>
                                    <my-upload field="img"
                                               @crop-success="cropSuccess"
                                               v-model="show"
                                               :params="params"
                                               langType="ru"></my-upload>

                                </div>
                                <br>


                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group ">
                                            <label>Главная категория</label>
                                            <br>
                                            <treeselect
                                                :options="categories"
                                                :sort-value-by="sortValueBy"
                                                :show-count="true"
                                                placeholder="Выберите категорию"
                                                v-model="product.category_id"
                                                required
                                            />
                                        </div>
                                    </div>
      
                                    <div class="col-md-8">
                                        <div class="form-group ">
                                            <label>Показывать в категориях</label>
                                            <br>
                                            <treeselect
                                                :options="categories"
                                                 :multiple="multiple"
                                                :sort-value-by="sortValueBy"
                                                :show-count="true"
                                                placeholder="Выберите категории"
                                                v-model="product.categories"
                                            />
                                           
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Название</label>
                                            <span style="display: none;"> {{ iSlug }}</span>
                                            <input type="text" v-model="product.name"
                                                   :class="errors.get('name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите название"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('name')}}</div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Seo Url</label>
                                            <input type="text" v-model="product.slug" :class="errors.get('slug') ? 'form-control is-invalid' : 'form-control'" placeholder="" readonly>
                                            <div class="invalid-feedback">{{errors.get('slug')}}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Артикул</label>
                                            <span style="display: none;"> {{ iSlug }}</span>
                                            <input type="number" v-model="product.article"
                                                   :class="errors.get('name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите артикул"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('name')}}</div>
                                        </div>
                                    </div>
                                     <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Цена, руб</label>
                                            <input type="number" v-model="product.price"
                                                   :class="errors.get('price') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите цену"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{errors.get('price')}}</div>
                                        </div>
                                    </div>
                                      <div class="col-md-3">
                                        <div class="form-group ">
                                            <label>Статус</label>
                                            <br>
                                            <el-select v-model="product.status" class="form-control fixed-select" filterable placeholder="Выберите статус">
                                                <el-option
                                                    v-for="item in statuses"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>

                                </div>

                                <div class="row">
                                      <div class="col-md-3">
                                        <div class="form-group ">
                                            <label>Стикеры</label>
                                            <br>
                                            <el-select v-model="product.sticker" class="form-control fixed-select" filterable placeholder="Выберите стикер">
                                                <el-option
                                                    v-for="item in stickers"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group ">
                                            <label>Расположение стикера</label>
                                            <br>
                                            <el-select v-model="product.sticker_position    " class="form-control fixed-select" filterable placeholder="Выберите позицию стикера">
                                                <el-option
                                                    v-for="item in stickerPositions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group ">
                                            <label>Товар забронирован</label>
                                            <br>
                                            <el-select v-model="product.is_booked    " class="form-control fixed-select" filterable placeholder="Выберите...">
                                                <el-option
                                                    v-for="item in productBooking"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group ">
                                            <label>Теги</label>
                                            <br>
                                            <el-select v-model="product.tags" class="form-control fixed-select" multiple filterable allow-create placeholder="Выберите или создайте теги">
                                                <el-option
                                                    v-for="item in tags"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group form-group-last">
                                                <label>Описание</label>

                                                <quill-editor ref="myTextEditor"
                                                              v-model="product.description"
                                                              :options="editorOption">
                                                </quill-editor>
                                            </div>
                                        </div>
                                    </div>
                                    <br>

                                <div class="card">
                                        <div class="card-header" id="headingOne3">
                                            <div class="card-title collapsed" data-toggle="collapse" data-target="#collapseOne3" aria-expanded="false" aria-controls="collapseOne3">
                                                SEO
                                            </div>
                                        </div>

                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>HTML H1 Заголовок</label>
                                                        <input type="text" v-model="product.html_h1"  class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Seo заголовок</label>
                                                        <input type="text" v-model="product.seo_title"  class="form-control" placeholder="">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group form-group-last">
                                                        <label>Seo описание</label>
                                                        <textarea class="form-control" v-model="product.seo_description"
                                                                   rows="4"></textarea>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group form-group-last">
                                                        <label>Seo ключевые слова</label>
                                                        <textarea class="form-control" v-model="product.seo_keywords"
                                                                   rows="4"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <h4 class="kt-heading kt-heading--md">Атрибуты товара</h4>
                                         <div class="form-group row" v-for="attr, index in product.attributes" :key="index">

                                             <div class="col-md-4">
                                                <div class="form-group ">
                                            <label>Атрибут</label>
                                            <br>
                                            <el-select v-model="attr.name" class="form-control fixed-select" allow-create filterable placeholder="Выберите Атрибут или создайте новый" required>
                                                <el-option
                                                    v-for="item in attributes"
                                                    :key="item.name"
                                                    :label="item.name"
                                                    :value="item.name">
                                                </el-option>
                                            </el-select>
                                        </div>
                                                    </div>

                                             <div class="col-md-4">
                                                                <div class="form-group form-group-last">
                                                                <label>Текст</label>
                                                                <textarea class="form-control" v-model="attr.description"
                                                                   rows="2" required></textarea>
                                                                </div>
                                                                </div>

                                            <div class="col-md-1"> <label></label>
                                                                    <div class="input-group-append" style="display: block;">
                                                                <button  class="btn btn-icon btn-font-danger" @click="removeAttribute(index)">
                                                                        <i class="la la-close kt-font-danger"></i>
                                                                </button>
                                                                    </div>
                                                                </div>



                                        
                                                                <div class="kt-separator kt-separator--space-sm"></div>
                                                               
                                        </div>

                                          <div class="kt-repeater__add-data " @click="addAttribute(index)">
                                                                    <span data-repeater-create="" class="btn btn-accent btn-sm ">
                                                                        <i class="la la-plus kt-font-light"></i> Добавить атрибут
                                                                    </span>
                                                                    </div>
                                                              
                                                     
                                                        

                                    <Media @update="onMedia" />
                            </div>
                            <div class="kt-portlet__foot">
                                <div class="kt-form__actions" v-loading="loading">
                                    <button type="submit" class="btn btn-primary">Сохранить</button>
                                </div>
                            </div>

                       

                    </div>
                    <!--end::Portlet-->
                     </form>
                        <!--end::Form-->
                </div>

            </div>
        </div>
        <!-- end:: Content -->

    </div>
</template>

<script>
    import myUpload from 'vue-image-crop-upload';
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    import Breadcrumbs from '~/components/Breadcrumbs.vue'
    import Errors from '~/helpers/error.js'

    import { quillEditor } from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import slug from 'limax';

    export default {
        middleware: 'auth',
        components: {
            Breadcrumbs,'my-upload': myUpload, Treeselect, quillEditor
        },
        data() {
            return {
                breadcrumbsItems: [
                    {
                        title: 'Товары',
                        name: 'products'
                    },
                    {
                        title: 'Создать',
                        name: 'products-create'
                    }
                ],

                product: {
                    name: '',
                    slug: '',
                    is_booked: false,
                    attributes: [],
                },

                categories: [],
                categoriesShow: [],
                tags: [],
                attributes: [],

                files: [],
                sortValueBy: 'ORDER_SELECTED',
                multiple: true,

                statuses: [
                    {
                        label: 'Включен', 
                        value: 'active'
                    },
                    {
                        label: 'Отключено', 
                        value: 'inactive'
                    },
                ],
                stickers: [
                    {
                        label: 'Нет', 
                        value: null
                    },
                    {
                        label: 'Новинка', 
                        value: 'new'
                    },
                ],
                stickerPositions: [
                    {
                        label: 'Справа сверху', 
                        value: 'top_right'
                    },
                    {
                        label: 'Слева сверху', 
                        value: 'top_left'
                    },
                    {
                        label: 'Справа снизу', 
                        value: 'bottom_right'
                    },
                    {
                        label: 'Слева снизу', 
                        value: 'bottom_left'
                    },
                ],
                productBooking: [
                    {
                        label: 'Нет', 
                        value:  false
                    },
                    {
                        label: 'Да', 
                        value: true
                    },
                ],

                //Photo
                 photo: '',
                show: false,
                showPhoto: false,
                params: {
                    //token: tokenN.content,
                    name: 'photo'
                },

                loading: false,
                loadingOptions: false,
                errors: new Errors(),
            };
        },
        computed: {
            iSlug: function() {
                if(this.product.name) {
                    let iSlug = this.sanitizeTitle(this.product.name);
                    this.product.slug = iSlug;
                    return iSlug;
                }
            },

        },
        // multiple(newValue) {
        // if (newValue) {
        //     this.product.category_in = this.product.category_in ? [ this.product.category_in ] : []
        // } else {
        //     this.product.category_in = this.product.category_in[0]
        // }
        // },
        async fetch() {
            if(!this.$permission(['*'])) {
                this.$router.push({ name: 'index' });
            }
            await this.getItemOptionsData()
        },
        methods: {
             getItemOptionsData() {
                this.loadingOptions = true;
                this.$axios.get(process.env.apiWebUrl+`/adm/products/options/data`)
                    .then(response => {
                        let data = response.data.data;
                        this.tags = data.tags
                        this.categories = data.categories
                        this.attributes = data.attributes

                        // this.categories.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
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
                this.$axios.post(process.env.apiWebUrl+`/adm/products`, {
                    product: this.product,
                    photo: this.photo
                })
                    .then(response => {
                        let data = response.data.data;
                        if(data.status === 'success'){
                            this.$message({
                                showClose: true,
                                message: 'Товар успешно создан',
                                type: 'success',
                                center: true
                            });
                             if(this.files.length >= 1) {
                                this.submitFiles(data.item_id)
                            } else {
                                this.$router.push({ name: 'products' });
                            }
                        }
                    })
                    .catch(error =>
                        this.errors.record(error.response.data)
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            },

              submitFiles(id) {
                this.loadingItem = true;
                for (let i = 0; i < this.files.length; i++) {
                    if (this.files[i].id) {
                        continue;
                    } else {
                        setTimeout(() => {
                            this.$router.push({ name: 'products' });
                        }, 1000);
                    }
                    let formData = new FormData();
                    formData.append('file', this.files[i]);
                    formData.append('id', id);
                    formData.append('item_type', 'product');

                    this.$axios.post(process.env.apiWebUrl+'/adm/media',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    ).then(function (response) {
                        console.log('success');
                    }.bind(this)).catch(function (data) {
                        console.log('error');
                    });
                }
            },

             addAttribute: function () {
                this.product.attributes.push({
                    name: '',
                    description: '',
                })
            },

            removeAttribute: function (index) {
                this.product.attributes.splice(index, 1);
            },


            onMedia (data) {
                this.files = data;
                console.log('v1');
                console.log(this.files);
            },

            sanitizeTitle: function(name) {
                return slug(name);
            },

            toggleShow() {
                this.show = !this.show;
            },

            /**
             * crop success
             *
             * [param] imgDataUrl
             * [param] field
             */
            cropSuccess(imgDataUrl){
                this.photo = imgDataUrl;
                this.showPhoto =  true;
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
