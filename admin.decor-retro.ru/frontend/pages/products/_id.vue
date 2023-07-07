<template>
    <div>
        <Breadcrumbs title="Товары" :items="breadcrumbsItems"/>

        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div class="row">
                <div class="col-md-12">
                    <!--begin::Form-->
                    <form class="kt-form" role="form" @submit.prevent="update" v-loading="loadingOptions">
                        <!--begin::Portlet-->
                        <div class="kt-portlet">
                            <div class="kt-portlet__head">
                                <div class="kt-portlet__head-label">
                                    <n-link :to="{path: '/products', query: { search: this.$route.query.search } }"
                                            class="btn btn-secondary"><i
                                            class="fa fa-arrow-left" aria-hidden="true"></i>
                                        В таблицу
                                    </n-link>
                                </div>
                                <div class="kt-portlet__head-label">
                                    <button type="button" class="btn btn-success" @click="sellProduct">Продажа</button>
                                </div>
                                <div class="kt-portlet__head-label">
                                    <button type="button" class="btn btn-danger" @click="backSellProduct">Возврат
                                    </button>
                                </div>
                                <div class="kt-portlet__head-label">
                                    <button type="submit" class="btn btn-primary">Сохранить</button>
                                </div>
                            </div>

                            <div class="kt-portlet__body">
                                <div class="form-group ">
                                    <div class="row" v-if="!showPhoto">
                                        <div class="col-md-2">
                                            <img :src="photo" style="border-radius: 50%; width: 100px;"/>
                                        </div>
                                        <div class="col-md-4">
                                            <h5>Добавить фото_</h5>
                                            <input type="file" @change="onFileChange">
                                        </div>
                                    </div>
                                    <div class="row" v-else style="margin-bottom: 10px;">
                                        <div class="col-md-2">
                                            <img :src="photo" style="border-radius: 50%; width: 100px; height: auto;"/>
                                        </div>
                                        <div class="col-md-4">
                                            <h5>Изменить фото</h5>
                                            <input type="file" @change="onFileChange">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group ">
                                            <label>Главная категория</label>
                                            <treeselect
                                                    :options="categories"
                                                    :sort-value-by="sortValueBy"
                                                    :show-count="true"
                                                    placeholder="Выберите категорию"
                                                    v-model="product.main_category_id"
                                                    required
                                            />
                                        </div>
                                    </div>

                                    <div class="col-md-8">
                                        <div class="form-group ">
                                            <label>Параметры фильтра</label>
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
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Название</label>
                                            <span style="display: none;"> {{ iSlug }}</span>
                                            <input type="text" v-model="product.description.name"
                                                   :class="errors.get('name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите название"
                                                   required
                                            >
                                            <!--                                            <div class="invalid-feedback">{{ errors.get('name') }}</div>-->
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Seo Url</label>
                                            <input type="text" v-model="product_slug"
                                                   :class="errors.get('slug') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="" readonly>
                                            <!--                                            <div class="invalid-feedback">{{ errors.get('slug') }}</div>-->
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
                                            <!--                                            <div class="invalid-feedback">{{ errors.get('name') }}</div>-->
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Цена продажи, руб</label>
                                            <input type="number" v-model="product.price"
                                                   :class="errors.get('price') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите цену"
                                                   required
                                            >
                                            <!--                                            <div class="invalid-feedback">{{ errors.get('price') }}</div>-->
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
                                        <div class="form-group ">
                                            <label>Статус</label>
                                            <br>
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


                                    <div class="col-md-6">
                                        <form class="d-flex" @submit.prevent="updateZone" v-loading="loadingOptions">
                                            <div class="form-group">
                                                <label>Выберите зону товара</label>
                                                <select
                                                        class="form-control"
                                                        placeholder="Выберите зону"
                                                        v-model="zone">
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
                                            <div class="form-group mt-auto ml-3">
                                                <button type="submit" class="btn btn-primary">Изменить зону</button>
                                            </div>
                                        </form>
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

                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group ">
                                            <label>Стикеры</label>
                                            <el-select v-model="product.upc"
                                                       class="form-control fixed-select"
                                                       filterable
                                                       placeholder="Выберите стикер">
                                                <el-option
                                                        v-for="item in stickers"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
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
                                            <input type="date" v-model="product.date_zakup"
                                                   class="form-control"
                                                   :class="errors.get('date_zakup') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Укажите дату покупки товара"
                                            >
                                        </div>
                                    </div>
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
                                            <button type="button" class="btn btn-primary btn-block"
                                                    @click="product.description.tag = ''">Очистить поле
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group form-group-last">
                                            <label>Комментарий</label>
                                            <textarea v-model="product.comment" class="form-control"
                                                      placeholder="Комментарий к товару.." size="4"></textarea>
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

                                <div class="card mt-4">
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
                                                           class="form-control" placeholder="">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Seo заголовок</label>
                                                    <input type="text" v-model="product.description.seo_title"
                                                           class="form-control" placeholder="">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group form-group-last">
                                                    <label>Seo описание</label>
                                                    <textarea class="form-control"
                                                              v-model="product.description.meta_description"
                                                              rows="4"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group form-group-last">
                                                    <label>Seo ключевые слова</label>
                                                    <textarea class="form-control"
                                                              v-model="product.description.meta_keyword"
                                                              rows="4"></textarea>
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
                                                    @click="removeAttribute(index, product.product_id, attribute.attribute_id)">
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

                                <media-update itemType="product"/>

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
                apiImgUrl: process.env.API_IMG_URL,
                editorOptions: {
                    hideModeSwitch: false
                },
                content: [
                    '<span class="size" style="font-size:16px"><span class="font" style="font-family:arial, helvetica, sans-serif">Очень красивая фигурка лебедя, времен СССР, скорей всего хрусталь, <span class="size" style="font-size:16px">очень эффектно и антуражно смотрится, не хуже чем у Сваровски, <span class="size" style="font-size:16px">необыкновенно хорошо вписывается в любой интерьер, </span></span>высота 16см. Состояние идеальное, без сколов и трещин</span></span>.',
                ].join("\n"),
                breadcrumbsItems: [
                    {
                        title: 'Товары',
                        name: 'products'
                    },
                    {
                        title: 'Редактирование',
                        name: 'products-id',
                        params: 'id: ' + this.$route.params.id,
                    }
                ],
                editorOption: {},
                description: '',

                product: {
                    description: [],
                    attributes: [],
                    categories: [],
                    gallery: [],
                    main_category_id: null,
                },
                product_slug: '',

                categories: [],
                categoriesShow: [],
                tags: [],
                attributes: [],

                files: [],
                sortValueBy: 'ORDER_SELECTED',
                multiple: true,
                zone: '',

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
                    },
                ],

                statuses: [
                    {
                        label: 'Включен',
                        value: 1
                    },
                    {
                        label: 'Отключен',
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
                    },
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
                productBooking: [
                    {
                        label: 'Нет',
                        value: 0
                    },
                    {
                        label: 'Да',
                        value: 1
                    },
                ],

                //Photo
                photo: 'https://retro-decor.ru/image/no_image.jpg',
                show: false,
                showPhoto: false,
                params: {
                    //token: tokenN.content,
                    name: 'photo'
                },
                images: [],

                loading: false,
                loadingOptions: false,
                errors: new Errors(),
            };
        },
        computed: {
            iSlug: function () {
                if (this.product.description.name) {
                    let iSlug = this.sanitizeTitle(this.product.description.name);
                    this.product_slug = iSlug;
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
            async updateZone() {
                this.loading = true;
                this.$axios.patch(process.env.apiWebUrl + `/adm/products/${this.$route.params.id}/set-zone`, {
                    zone: this.zone,
                })
                    .then(response => {
                        let status = response.data.data;
                        if (status.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Зона товара успешно обновлена',
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

            imageUrlAlt(event) {
                event.target.src = process.env.API_IMG_URL + "image/no_image.jpg"
            },

            async getItemOptionsData() {
                const response = await this.$axios.$get(process.env.apiWebUrl + `/adm/products/options/data`)
                if (response) {
                    this.tags = response.data.tags
                    this.attributes = response.data.attributes
                    this.categories = response.data.categories
                }
            },

            async getEditData() {
                const response = await this.$axios.$get(process.env.apiWebUrl + `/adm/products/${this.$route.params.id}`)
                if (response) {

                    this.zone = response.data.zone;
                    delete response.data.zone;
                    this.product = response.data;

                    if (this.product.image) {
                        this.photo = process.env.apiImgUrl + '/image/' + this.product.image
                        this.showPhoto = true
                    }

                    if (this.product.description) {
                        this.description = this.product.description.description
                        // this.product.name = this.product.description.name
                    }

                    if (this.product.images) {
                        this.images = this.product.images
                        // this.product.name = this.product.description.name
                    }

                    this.product_slug = this.product.keyword

                    // let f = this.product.tags
                    // self.product.tags = []
                    // f.forEach(function (value, key) {
                    //     self.product.tags.push(f[key].id);
                    // });

                    let c = this.product.categories
                    let list_categories = []
                    let main_category = null
                    c.forEach(function (value, key) {
                        if (value.main_category === 1) {
                            main_category = value.category_id
                        }
                        list_categories.push(value.category_id);
                    });
                    this.product.categories = list_categories
                    this.product.main_category_id = main_category
                }
            },

            update() {
                this.loading = true;
                this.$axios.patch(process.env.apiWebUrl + `/adm/products/${this.$route.params.id}`, {
                    product: this.product,
                    photo: this.photo,
                    product_slug: this.product_slug,
                })
                    .then(response => {
                        let status = response.data.data;
                        if (status.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Товар успешно обновлен',
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


            sellProduct() {
                this.$router.push({path: '/orders/order', query: {product_id: this.$route.params.id}});
            },

            backSellProduct() {
                this.loading = true;
                this.$axios.patch(process.env.apiWebUrl + `/adm/products/${this.$route.params.id}/reset`, {
                    product: this.product
                })
                    .then(response => {
                        let status = response.data.data;
                        if (status.status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Статус товара успешно изменён',
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


            addAttribute: function () {
                this.product.attributes.push({
                    name: '',
                    description: '',
                    id: '',
                })
            },

            removeAttribute: function (index, id, attr) {
                this.product.attributes.splice(index, 1)
                if (id) {
                    this.$axios.delete(process.env.apiWebUrl + `/adm/products/attribute/delete/${id}/${attr}`)
                        .then(response => {
                            this.$message({
                                showClose: true,
                                message: 'Успешно удалено',
                                type: 'success',
                                center: true
                            });
                        })
                        .catch(errors => {
                            console.log(errors);
                        });
                }

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

            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;

                this.showPhoto = true
                this.createImage(files[0]);
            },

            createImage(file) {
                let image = new Image();
                let reader = new FileReader();
                let vm = this;

                reader.onload = (e) => {
                    vm.photo = e.target.result;
                };
                reader.readAsDataURL(file);
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
        color: white !important;
    }

    option.select-zones.blue {
        background: rgba(64, 158, 255, 0.84);
        color: white !important;
    }

    option.select-zones.green {
        background: rgba(29, 201, 107, 0.81);
        color: white !important;
    }

    option.select-zones.yellow {
        background: rgba(255, 255, 0, 0.64);
        color: black !important;
    }

    option.select-zones.siniy {
        background: #0067c2;
        color: white !important;
    }

    option.select-zones.violet {
        background: #bc09b3;
        color: white !important;
    }

    option.select-zones.black {
        background: #222;
        color: white !important;
    }

    option.select-zones.grey {
        background: #ccc;
        color: white;
    }

    option.select-zones {
        height: 50px !important;
        cursor: pointer;
    }

    option.select-zones {
        padding: 20px;
        min-height: 50px;
        curson: pointer;
    }

    .item__error {
        color: #F56C6C;
        font-size: 11px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
    }


</style>
