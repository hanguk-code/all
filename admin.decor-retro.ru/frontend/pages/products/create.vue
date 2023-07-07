<template>
    <div>
        <Breadcrumbs title="Товары" :items="breadcrumbsItems"/>

        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div class="row">
                <div class="col-md-12">
                    <!--begin::Form-->
                    <form class="kt-form" role="form" @submit.prevent="store" v-loading="loadingOptions">
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
                                        <a class="btn btn-success btn-sm btn-block" style="color: white;"
                                           @click="toggleShow">Добавить фото</a>
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
                                            <label>Параметры фильтра</label>
                                            <br>
                                            <treeselect
                                                :options="categories"
                                                :multiple="multiple"
                                                :sort-value-by="sortValueBy"
                                                :show-count="true"
                                                placeholder="Выберите параметры фильтра"
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
                                            <input type="text" v-model="product.description.name"
                                                   :class="errors.get('name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите название"
                                                   required
                                                   v-on:blur="setSeoFields"
                                            >
                                            <div class="invalid-feedback">{{ errors.get('name') }}</div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Seo Url</label>
                                            <input type="text" v-model="product_slug"
                                                   :class="errors.get('slug') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="" readonly>
                                            <div class="invalid-feedback">{{ errors.get('slug') }}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Артикул</label>
                                            <input type="number" v-model="product.sku"
                                                   :class="errors.get('name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите артикул"
                                                   required
                                            >
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
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Цена закупки (руб)</label>
                                            <input type="number" v-model="product.price_rub"
                                                   :class="errors.get('price_rub') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите цену закупки в рублях"
                                            >
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Цена закупки (евро)</label>
                                            <input type="number" v-model="product.price_euro"
                                                   :class="errors.get('price_euro') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите цену закупки в евро"
                                            >
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Курс (Евро - Руб)</label>
                                            <input type="text" v-model="product.kurs"
                                                   class="form-control"
                                                   :class="errors.get('kurs') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Укажите текущий курс для товара"
                                            >
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Выберите зону товара</label>
                                            <!--<el-select v-model="product.zone"
                                                       class="form-control fixed-select"
                                                       filterable allow-create placeholder="Выберите зону"
                                                       required>
                                                <el-option
                                                        v-for="item in zones"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>-->


                                            <select
                                                    class="form-control"
                                                    placeholder="Выберите зону"
                                                    v-model="product.zone">
                                                <option
                                                        v-for="item in zones"
                                                        :key="item.value"
                                                        :value="item.value"
                                                        :class="item.value"
                                                        class="select-zones">
                                                    {{ item.label }}
                                                </option>
                                            </select>

                                        </div>


                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Размер скидки</label>
                                                <input type="text" v-model="product.amount_of_discount"
                                                       class="form-control"
                                                       :class="errors.get('amount_of_discount') ? 'form-control is-invalid' : 'form-control'"
                                                       placeholder="Укажите размер скидки"
                                                >
                                            </div>
                                        </div>


                                    </div>

                                    <div class="col-md-3">
                                        <div class="form-group ">
                                            <label>Статус</label>
                                            <el-select v-model="product.status" class="form-control fixed-select"
                                                       filterable placeholder="Выберите статус">
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
                                            <el-select v-model="product.upc" class="form-control fixed-select"
                                                       filterable placeholder="Выберите стикер">
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
                                            <el-select v-model="product.jan"
                                                       class="form-control fixed-select"
                                                       filterable
                                                       placeholder="Выберите позицию стикера">
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
                                        <div class="form-group">
                                            <label>Дата покупки товара</label>
                                            <input type="date" v-model="product.date_added"
                                                   class="form-control"
                                                   :class="errors.get('date_added') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Укажите дату покупки товара"
                                            >
                                        </div>
                                    </div>
<!--                                    <div class="col-md-3">-->
<!--                                        <div class="form-group ">-->
<!--                                            <label>Товар забронирован</label>-->
<!--                                            <br>-->
<!--                                            <el-select v-model="product.is_booked" class="form-control fixed-select"-->
<!--                                                       filterable placeholder="Выберите...">-->
<!--                                                <el-option-->
<!--                                                    v-for="item in productBooking"-->
<!--                                                    :key="item.value"-->
<!--                                                    :label="item.label"-->
<!--                                                    :value="item.value">-->
<!--                                                </el-option>-->
<!--                                            </el-select>-->
<!--                                        </div>-->
<!--                                    </div>-->
                                </div>

                                <div class="row">
                                    <div class="col-md-10">
                                        <div class="form-group ">
                                            <label>Связи</label>
                                            <el-select v-model="product.description.tag"
                                                       class="form-control fixed-select"
                                                       filterable allow-create placeholder="Выберите или создайте связи"
                                                       required>
                                                <el-option
                                                        v-for="item in tags"
                                                        :key="item.tag"
                                                        :label="item.tag"
                                                        :value="item.tag">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group ">
                                            <label></label>
                                            <button type="button" class="btn btn-primary btn-block" @click="product.description.tag = ''">Очистить поле</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group form-group-last">
                                            <label>Комментарий</label>
                                            <textarea v-model="product.comment" class="form-control" placeholder="Комментарий к товару.." size="4"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-2">
                                    <div class="col-md-12">
                                        <div class="form-group form-group-last">
                                            <label>Описание</label>
                                            <quill-editor
                                                v-model="product.description.description"
                                                :options="editorOption">
                                            </quill-editor>
                                        </div>
                                    </div>
                                </div>
                                <br>

                                <div class="card">
                                    <div class="card-header" id="headingOne3">
                                        <div class="card-title collapsed" data-toggle="collapse"
                                             data-target="#collapseOne3" aria-expanded="false"
                                             aria-controls="collapseOne3">
                                            SEO
                                        </div>
                                    </div>

                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>HTML H1 Заголовок</label>
                                                    <input type="text" v-model="product.description.seo_h1"
                                                           class="form-control" placeholder="" required>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Seo заголовок</label>
                                                    <input type="text" v-model="product.description.seo_title"
                                                           class="form-control" placeholder="" required>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group form-group-last">
                                                    <label>Seo описание</label>
                                                    <textarea class="form-control"
                                                              v-model="product.description.meta_description"
                                                              rows="4" required></textarea>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group form-group-last">
                                                    <label>Seo ключевые слова</label>
                                                    <textarea class="form-control"
                                                              v-model="product.description.meta_keyword"
                                                              rows="4" required></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <h4 class="kt-heading kt-heading--md">Атрибуты товара</h4>
                                <div class="form-group row" v-for="attribute in product.attributes" :key="index">

                                    <div class="col-md-4">
                                        <div class="form-group ">
                                            <label>Атрибут</label>
                                            <el-select v-model="attribute.attribute_id"
                                                       class="form-control fixed-select"
                                                       allow-create filterable
                                                       placeholder="Выберите Атрибут или создайте новый" required>
                                                <el-option
                                                    v-for="item in attributes"
                                                    :key="item.id"
                                                    :label="item.label"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group form-group-last">
                                            <label>Текст</label>
                                            <textarea class="form-control" v-model="attribute.text" rows="2"
                                                      required></textarea>
                                        </div>
                                    </div>

                                    <div class="col-md-1"><label></label>
                                        <div class="input-group-append" style="display: block;">
                                            <button type="button" class="btn btn-icon btn-font-danger"
                                                    @click="removeAttribute(index)">
                                                <i class="la la-close kt-font-danger"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="kt-separator kt-separator--space-sm"></div>
                                </div>
                                <div class="kt-repeater__add-data " @click="addAttribute(index)">
                                                                    <span data-repeater-create=""
                                                                          class="btn btn-accent btn-sm ">
                                                                        <i class="la la-plus kt-font-light"></i> Добавить атрибут
                                                                    </span>
                                </div>


                                <Media @update="onMedia"/>
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

import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import slug from 'limax';

export default {
    middleware: 'auth',
    components: {
        Breadcrumbs, 'my-upload': myUpload, Treeselect, quillEditor
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
                is_booked: false,
                attributes: [],
                description: {
                    name: '',
                    description: '',
                    tag: '',
                    seo_h1: '',
                    seo_title: '',
                    meta_description: '',
                    meta_keyword: '',
                },
            },
            product_slug: '',

            categories: [],
            categoriesShow: [],
            tags: [],
            attributes: [],
            editorOption: {},

            files: [],
            sortValueBy: 'ORDER_SELECTED',
            multiple: true,

            zones: [
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
                }
            ],

            statuses: [
                {
                    label: 'Включен',
                    value: 1
                },
                {
                    label: 'Отключено',
                    value: 0
                },
            ],
            stickers: [
                {
                    label: 'Не новинка',
                    value: ''
                },
                {
                    label: 'Новинка',
                    value: 'new'
                }
            ],
            stickerPositions: [
                {
                    label: 'Нет',
                    value: ''
                },
                {
                    label: 'Справа сверху',
                    value: '4'
                },
                {
                    label: 'Слева сверху',
                    value: '3'
                },
                {
                    label: 'Справа снизу',
                    value: '2'
                },
                {
                    label: 'Слева снизу',
                    value: '1'
                },
            ],
            productArchive: [
                {
                    label: 'Нет',
                    value: 0
                },
                {
                    label: 'Да',
                    value: 8
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
        iSlug: function () {
            if (this.product.description.name) {
                let iSlug = this.sanitizeTitle(this.product.description.name);
                this.product_slug = iSlug
                return iSlug
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
        if (!this.$permission(['*'])) {
            this.$router.push({name: 'index'});
        }
        await this.getItemOptionsData()
    },
    methods: {
        setSeoFields() {
            this.product.description.seo_h1 = this.product.description.name
            this.product.description.seo_title = this.product.description.name
            this.product.description.meta_description = this.product.description.name
            this.product.description.meta_keyword = this.product.description.name
        },
        getItemOptionsData() {
            this.loadingOptions = true;
            this.$axios.get(process.env.apiWebUrl + `/adm/products/options/data`)
                .then(response => {
                    let data = response.data.data;
                    this.product.sku = data.new_article
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

        store() {
            if (!this.product.description.description) {
                alert('Зполните описание товара');
                return false
            }
            this.loading = true;
            this.$axios.post(process.env.apiWebUrl + `/adm/products`, {
                product: this.product,
                photo: this.photo,
                product_slug: this.product_slug,
            })
                .then(response => {
                    let data = response.data.data;
                    if (data.status === 'success') {
                        this.$message({
                            showClose: true,
                            message: 'Товар успешно создан',
                            type: 'success',
                            center: true
                        });
                        if (this.files.length >= 1) {
                            this.submitFiles(data.item_id)
                        } else {
                            this.$router.push({name: 'products'});
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
                        this.$router.push({name: 'products'});
                    }, 1000);
                }
                let formData = new FormData();
                formData.append('file', this.files[i]);
                formData.append('id', id);
                formData.append('item_type', 'product');

                this.$axios.post(process.env.apiWebUrl + '/adm/media',
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


        onMedia(data) {
            this.files = data;
            console.log('v1');
            console.log(this.files);
        },

        sanitizeTitle: function (name) {
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
        cropSuccess(imgDataUrl) {
            this.photo = imgDataUrl;
            this.showPhoto = true;
        },
    }
}
</script>

<style scoped>
    select.form-control.fixed-select {
        border: 1px solid #d3dae6;
    }

    option.select-zones.red {
        background: rgba(253, 57, 122, 0.9);
        color: white!important;
    }

    option.select-zones.blue {
        background: rgba(64, 158, 255, 0.84);
        color: white!important;
    }

    option.select-zones.green {
        background: rgba(29, 201, 107, 0.81);
        color: white!important;
    }

    option.select-zones.yellow {
        background: rgba(255, 255, 0, 0.64);
        color: black!important;
    }

    option.select-zones.siniy {
        background: #0067c2;
        color: white!important;
    }

    option.select-zones.violet {
        background: #bc09b3;
        color: white!important;
    }

    option.select-zones.black {
        background: #222;
        color: white!important;
    }

    option.select-zones.grey {
        background: #ccc;
        color: white;
    }

    option.select-zones {
        height: 50px!important;
        cursor: pointer;
    }

    option.select-zones {
        padding: 20px;
        min-height: 50px;
        curson:pointer;
    }
.item__error {
    color: #F56C6C;
    font-size: 11px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
}
</style>
