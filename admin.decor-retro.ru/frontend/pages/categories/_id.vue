<template>
    <div>
        <Breadcrumbs title="Категории" :items="breadcrumbsItems"/>

        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div class="row">
                <div class="col-md-12">
                    <!--begin::Form-->
                    <form class="kt-form" role="form" @submit.prevent="update" v-loading="loading">
                        <!--begin::Portlet-->
                        <div class="kt-portlet">
                            <div class="kt-portlet__head">
                                <div class="kt-portlet__head-label">
                                    <n-link :to="{name: 'categories' }" class="btn btn-secondary"><i
                                        class="fa fa-arrow-left" aria-hidden="true"></i>
                                        В таблицу
                                    </n-link>
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
                                <div class="row">
                                    <div class="col-md-2">
                                        <a class="btn btn-success btn-sm btn-block"
                                           style="color: white; margin: 10px 0;"
                                           @click="toggleShow">
                                            <span v-show="showPhoto">Изменить фото</span>
                                            <span v-show="!showPhoto">Добавить фото</span>
                                        </a>
                                    </div>
                                    <my-upload field="img"
                                               @crop-success="cropSuccess"
                                               v-model="show"
                                               :params="params"
                                               langType="ru"></my-upload>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Название</label>
                                            <span style="display: none;"> {{ iSlug }}</span>
                                            <input type="text" v-model="category.name"
                                                   :class="errors.get('name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите название категории"
                                                   required
                                            >
                                            <div class="invalid-feedback">{{ errors.get('name') }}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Seo Url</label>
                                            <input type="text" v-model="category.slug"
                                                   :class="errors.get('slug') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="" readonly>
                                            <div class="invalid-feedback">{{ errors.get('slug') }}</div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group ">
                                            <label>Категория</label>
                                            <treeselect
                                                :options="categories"
                                                :sort-value-by="sortValueBy"
                                                :show-count="true"
                                                placeholder="Выберите категорию"
                                                v-model="category.parent_id"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group ">
                                            <label>Статус</label>
                                            <el-select v-model="category.status" class="form-control fixed-select"
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
                                                    <label>Seo заголовок</label>
                                                    <input type="text" v-model="category.seo_title" class="form-control"
                                                           placeholder="">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group form-group-last">
                                                    <label>Seo описание</label>
                                                    <textarea class="form-control" v-model="category.meta_description"
                                                              rows="4"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group form-group-last">
                                                    <label>Seo ключевые слова</label>
                                                    <textarea class="form-control" v-model="category.meta_keyword"
                                                              rows="4"></textarea>
                                                </div>
                                            </div>

                                        </div>


                                        <div class="row mt-5">
                                            <div class="col-md-12">
                                                <div class="form-group form-group-last">
                                                    <label>SEO текст</label>
                                                    <quill-editor
                                                            v-model="category.seo_text"
                                                            :options="editorOption">
                                                    </quill-editor>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
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
import slug from 'limax';

import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
    middleware: 'auth',
    components: {
        Breadcrumbs, 'my-upload': myUpload, Treeselect,  quillEditor
    },
    data() {
        return {
            apiImgUrl: process.env.apiImgUrl,
            breadcrumbsItems: [
                {
                    title: 'Категории',
                    name: 'categories'
                },
                {
                    title: 'Редактирование',
                    name: 'categories-id',
                    params: 'id: ' + this.$route.params.id,
                }
            ],

            editorOption: {},
            category: {},
            photo: '',
            statuses: [
                {
                    label: 'Включено',
                    value: 1
                },
                {
                    label: 'Отключено',
                    value: 0
                },
            ],

            categories: [],
            sortValueBy: 'ORDER_SELECTED',

            //Photo
            show: false,
            showPhoto: false,
            params: {
                //token: tokenN.content,
                name: 'photo'
            },

            loading: false,
            errors: new Errors(),
        };
    },
    computed: {
        iSlug: function () {
            if (this.category.name) {
                let iSlug = this.sanitizeTitle(this.category.name);
                this.category.slug = iSlug;
                return iSlug;
            }
        },

    },
    async fetch() {
        if (!this.$permission(['*'])) {
            await this.$router.push({name: 'index'});
        }
        await this.getItemOptionsData()
        await this.getEditData()
    },

    methods: {
        async getItemOptionsData() {
            const response = await this.$axios.$get(process.env.apiWebUrl + `/adm/categories/options/data`, {params: {id: this.$route.params.id}})
            if (response) {
                this.categories = response.data
                // this.categories.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
            }
        },

        async getEditData() {
            const response = await this.$axios.$get(process.env.apiWebUrl + `/adm/categories/${this.$route.params.id}`)
            if (response) {
                this.category = response.data
                if (this.category.description) {
                    this.category.name = this.category.description.name
                    this.category.seo_title = this.category.description.seo_title
                    this.category.meta_description = this.category.description.meta_description
                    this.category.meta_keyword = this.category.description.meta_keyword
                }
                if (this.category.image) {
                    this.photo = process.env.apiImgUrl + 'image/' + this.category.image
                    this.showPhoto = true
                }
                if (this.category.parent_id === null) {
                    this.category.parent_id = 0
                }
            }
        },

        update() {
            this.loading = true;
            if (this.category.parent_id === 0) {
                this.category.parent_id = null
            }
            if (this.category.description) {
                this.category.description.name = this.category.name
                this.category.description.seo_title = this.category.seo_title
                this.category.description.meta_description = this.category.meta_description
                this.category.description.meta_keyword = this.category.meta_keyword
            }
            this.$delete(this.category, 'dates')

            this.$axios.patch(process.env.apiWebUrl + `/adm/categories/${this.$route.params.id}`, {
                category: this.category,
                photo: this.photo
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
.item__error {
    color: #F56C6C;
    font-size: 11px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
}
</style>
