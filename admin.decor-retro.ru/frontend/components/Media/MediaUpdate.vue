<template>
    <div class="row">
        <div class="col-md-12">
            <div class="kt-pricing-v2">
                <!--begin::Portlet-->
                <div class="kt-portlet">
                    <div
                            class="kt-portlet__body"
                            @dragenter="activeDrop = false"
                            @drop="activeDrop = false"
                            @mouseout="activeDrop = false"
                    >
                        <button
                                v-show="activeDrop"
                                type="button"
                                class="btn btn-outline-brand btn-elevate btn-pill filezone"
                                style="color: #ffffff; background-color: rgb(93, 120, 255, 0.7); border: none;"
                        >
                            <i class="la la-cloud-download"></i>
                            <input
                                    id="files"
                                    ref="files"
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/jpg,image/png,image/gif,audio/mp3,audio/mpga,audio/ogg,video/mp4,video/mpeg,application/pdf,application/msword,application/vnd.oasis.opendocument.text"
                                    @change="submitFiles"
                            />
                            Перетащите файлы сюда
                        </button>

                        <!--                        <div class="kt-separator kt-separator&#45;&#45;height-xs"></div>-->
                        <h3
                                class="kt-heading kt-heading--center kt-heading--space-sm kt-heading--xl kt-heading--bolder"
                                style="width: 90%;"
                        >
                            Фото
                        </h3>
                        <!--                        <div class="kt-separator kt-separator&#45;&#45;height-sm"></div>-->

                        <div v-if="loading" style="margin-left: 49%;">
                            <div
                                    class="kt-spinner kt-spinner--v2 kt-spinner--md kt-spinner--info"
                                    style=" top: 2rem;"
                            ></div>
                        </div>

                        <!--                        <div class="kt-separator kt-separator&#45;&#45;height-md"></div>-->

                        <div class="tab-content">
                            <div
                                    id="kt_tabs_3_1"
                                    class="tab-pane active"
                                    role="tabpanel"
                            >
                                <!-- begin:: Content -->

                                <div
                                        class="kt-section__content kt-section__content--border"
                                >
                                    <div
                                            v-if="pagination.total == 0"
                                            v-cloak
                                            class="row"
                                    >
                                        <div class="col-md-12">
                                            <p style="text-align: center;">
                                                Перетащите файлы сюда для
                                                добавления изображений
                                            </p>
                                        </div>
                                    </div>

                                    <draggable
                                            v-model="files"
                                            :disabled="!canDrag"
                                            class="row"
                                            v-bind="dragOptions"
                                            @start="drag = false"
                                            @end="drag = false"
                                            @change="sort()"
                                    >
                                        <div
                                                v-for="(file, key) in files"
                                                :key="file.id"
                                                class="card col-md-3"
                                                style="margin-top: 20px; margin-left: 25px; box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);"
                                        >
                                            <div class="kt-bg-metal w-100 ">
                                                <i
                                                        class="flaticon-close delete-file"
                                                        @click="
                                                        deleteFile(
                                                            file.product_image_id,
                                                            file.image
                                                        )
                                                    "
                                                ></i>

                                                <img
                                                        :src="
                                                        apiImgUrl +
                                                            'image/' +
                                                            file.image
                                                    "
                                                        :alt="file.name"
                                                        width="100%"
                                                        style="border-radius: 0.3rem;"
                                                />
                                            </div>
                                        </div>
                                    </draggable>
                                </div>
                                <div
                                        v-if="pagination.last_page > 1"
                                        v-cloak
                                        class="row"
                                        style="width: 90%; margin-top: 10px;"
                                >
                                    <ul class="pagination pagination--grid">
                                        <li class="page-item">
                                            <a
                                                    class="page-link"
                                                    href="#"
                                                    :disabled="
                                                    pagination.current_page <= 1
                                                "
                                                    style="width: 100px;"
                                                    @click.prevent="changePage(1)"
                                            >First page</a
                                            >
                                        </li>
                                        <li class="page-item">
                                            <a
                                                    class="page-link"
                                                    href="#"
                                                    :disabled="
                                                    pagination.current_page <= 1
                                                "
                                                    style="width: 100px;"
                                                    @click.prevent="
                                                    changePage(
                                                        pagination.current_page -
                                                            1
                                                    )
                                                "
                                            >Previous</a
                                            >
                                        </li>
                                        <li
                                                v-for="page in pages"
                                                :class="
                                                isCurrentPage(page)
                                                    ? 'page-item active'
                                                    : 'page-item '
                                            "
                                        >
                                            <a
                                                    class="page-link"
                                                    href="#"
                                                    @click.prevent="
                                                    changePage(page)
                                                "
                                            >{{ page }}</a
                                            >
                                        </li>
                                        <li class="page-item">
                                            <a
                                                    class="page-link"
                                                    href="#"
                                                    :disabled="
                                                    pagination.current_page >=
                                                        pagination.last_page
                                                "
                                                    style="width: 100px;"
                                                    @click.prevent="
                                                    changePage(
                                                        pagination.current_page +
                                                            1
                                                    )
                                                "
                                            >Next</a
                                            >
                                        </li>
                                        <li class="page-item">
                                            <a
                                                    class="page-link"
                                                    href="#"
                                                    :disabled="
                                                    pagination.current_page >=
                                                        pagination.last_page
                                                "
                                                    style="width: 100px;"
                                                    @click.prevent="
                                                    changePage(
                                                        pagination.last_page
                                                    )
                                                "
                                            >Last page</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                                <!--end:: Content -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 align-self-start">
                    <a
                            class="btn btn-success btn-sm btn-block"
                            style="color: white;"
                            @click="activeDrop = !activeDrop"
                    >
                        <span v-show="activeDrop">Закрыть</span>
                        <span v-show="!activeDrop">Добавить фото</span>
                    </a>
                </div>
                <div class="col-md-4 align-self-center"></div>
                <div class="col-md-4 align-self-end">
                    <a
                            class="btn btn-danger btn-sm btn-block"
                            style="color: white;"
                            @click="activeDropGallery"
                    >
                        <span>Удалить все фото</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        components: {
            draggable
        },
        props: ['itemType'],
        data() {
            return {
                apiImgUrl: process.env.apiImgUrl,
                files: [],
                pagination: {},
                offset: 5,
                activeTab: 'image',
                isVideo: false,
                loading: false,
                canDrag: true,
                label: '',
                labels: [],
                editingFile: {},
                activeDrop: false
            }
        },
        computed: {
            dragOptions() {
                return {
                    animation: 200,
                    group: 'description',
                    disabled: false,
                    ghostClass: 'ghost'
                }
            },
            pages() {
                const pages = []
                let from =
                    this.pagination.current_page - Math.floor(this.offset / 2)
                if (from < 1) {
                    from = 1
                }
                let to = from + this.offset - 1
                if (to > this.pagination.last_page) {
                    to = this.pagination.last_page
                }
                while (from <= to) {
                    pages.push(from)
                    from++
                }
                return pages
            }
        },
        mounted() {
            this.fetchFile(this.activeTab, this.pagination.current_page)
        },
        methods: {
            sort() {
                this.$axios
                    .post(process.env.apiWebUrl + `/adm/media/sort`, {
                        item_type: this.itemType,
                        files: this.files
                    })
                    .then((response) => {
                        const status = response.data.data.status
                        if (status === 'success') {
                            this.$message({
                                showClose: true,
                                message: 'Сортировка успешно обновлена!.',
                                type: 'success',
                                center: true
                            })
                        }
                    })
            },
            deleteFile(id, path) {
                this.$confirm('Полностью удалить файл?', 'Warning', {
                    confirmButtonText: 'Да',
                    cancelButtonText: 'Отмена',
                    type: 'warning'
                })
                    .then(() => {
                        this.$axios
                            .delete(process.env.apiWebUrl + `/adm/media/` + id, {
                                params: { item_type: this.itemType }
                            })
                            .then((response) => {
                                // console.log(response.data.data )
                                if (response.data.data.status === 'success') {
                                    this.fetchFile(
                                        this.activeTab,
                                        this.pagination.current_page
                                    )
                                    this.$message({
                                        message: 'Успешно удалено!',
                                        type: 'success',
                                        duration: 2000,
                                        center: true
                                    })
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: 'Удаление отменено'
                        })
                    })
            },
            activeDropGallery(id) {
                console.log(this.$route);
                this.$confirm('Полностью удалить файлы?', 'Warning', {
                    confirmButtonText: 'Да',
                    cancelButtonText: 'Отмена',
                    type: 'warning'
                })
                    .then(() => {
                        this.$axios
                            .delete(
                                process.env.apiWebUrl + `/adm/media/delete-gallery/` + this.$route.params.id)
                            .then((response) => {
                                // console.log(response.data.data )
                                if (response.data.data.status === 'success') {
                                    this.fetchFile(
                                        this.activeTab,
                                        this.pagination.current_page
                                    )
                                    this.$message({
                                        message: 'Успешно удалено!',
                                        type: 'success',
                                        duration: 2000,
                                        center: true
                                    })
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: 'Удаление отменено'
                        })
                    })
            },
            submitFiles() {
                for (let i = 0; i < this.$refs.files.files.length; i++) {
                    const formData = new FormData()
                    formData.append('id', this.$route.params.id)
                    formData.append('item_type', this.itemType)
                    formData.append('file', this.$refs.files.files[i])
                    this.$axios
                        .post(process.env.apiWebUrl + '/adm/media', formData, {
                            headers: {
                                // 'X-Requested-With': 'XMLHttpRequest',
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(
                            function(response) {
                                this.afterSubmitSave(response.data.media_data)
                            }.bind(this)
                        )
                        .catch(function(data) {
                            console.log('error')
                        })
                }
                // for (let i = 0; i < uploadedFiles.length; i++) {
                // if (uploadedFiles[i].id) {
                //     continue;
                // }
                // console.log('uploadedFiles[i]', uploadedFiles[i])
                // console.log('this.$route.params.id', this.$route.params.id)
                // console.log('this.itemType', this.itemType)
                // let formData = new FormData()
                // formData.set('file', uploadedFiles[i])
                // formData.set('id', this.$route.params.id)
                // formData.set('item_type', this.itemType)
                // const formData = {
                //     "file": uploadedFiles[i],
                //     "id": this.$route.params.id,
                //     "item_type": this.itemType,
                // }
                //
                // console.log('formData', formData)
                // // return false
                //
                // this.$axios.post(process.env.apiWebUrl + '/adm/media',
                //     formData,
                //     {
                //         headers: {
                //             'X-Requested-With': 'XMLHttpRequest',
                //             'Content-Type': 'multipart/form-data'
                //         }
                //     }
                // ).then(function (response) {
                //     this.afterSubmitSave(response.data.media_data)
                // }.bind(this)).catch(function (data) {
                //     console.log('error');
                // });
                // }
            },
            afterSubmitSave() {
                this.fetchFile(this.activeTab, this.pagination.current_page)
                this.$message({
                    showClose: true,
                    message: 'Успешно загружено',
                    type: 'success',
                    center: true
                })
            },
            isActive(tabItem) {
                return this.activeTab === tabItem
            },
            setActive(tabItem) {
                this.activeTab = tabItem
            },
            getFiles(type) {
                this.setActive(type)
                this.fetchFile(type)
                this.canDrag = true
            },
            fetchFile(type, page) {
                const currentUrlId = window.location.pathname.split('/')
                this.loading = true
                this.$axios
                    .get(
                        process.env.apiWebUrl +
                        `/adm/media` +
                        '?page=' +
                        page +
                        '&item_id=' +
                        this.$route.params.id +
                        '&item_type=' +
                        this.itemType
                    )
                    .then((result) => {
                        this.loading = false
                        this.files = result.data.data.data
                        this.pagination = result.data.pagination
                    })
                    .catch((error) => {
                        console.log(error)
                        this.loading = false
                    })
            },
            isCurrentPage(page) {
                return this.pagination.current_page === page
            },
            changePage(page) {
                if (page > this.pagination.last_page) {
                    page = this.pagination.last_page
                }
                this.pagination.current_page = page
                this.fetchFile(this.activeTab, page)
            },
            editFile(file) {
                // this.editingFile = file;
                // this.label = file.label;
            },
            closeEdit() {
                this.editingFile = {}
            },
            convertDate(dateTime) {
                const monthNames = [
                    'Январь',
                    'Февраль',
                    'Март',
                    'Апрель',
                    'Май',
                    'Июнь',
                    'Июль',
                    'Август',
                    'Сентябрь',
                    'Октябрь',
                    'Ноябрь',
                    'Декабрь'
                ]
                const d = new Date(dateTime)
                const m = monthNames[d.getMonth()]
                const day = d.getDate()
                let hr = d.getHours()
                let min = d.getMinutes()
                if (min < 10) {
                    min = '0' + min
                }
                if (hr < 10) {
                    hr = '0' + hr
                }
                return m + ', ' + day + ' в ' + hr + ':' + min
            }
        }
    }
</script>

<style scoped>
    @import '@/assets/media.css';
    input[type='file'] {
        position: absolute;
        cursor: pointer;
        top: 0px;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .filezone {
        outline-offset: -10px;
        padding: 10px 10px;
        cursor: pointer;
        height: 92%;
        width: 92%;
        position: absolute;
        z-index: 9000;
    }
    @media (min-width: 1661px) {
        .w-cl {
            max-width: 25% !important;
        }
    }
    @media (min-width: 770px) and (max-width: 1600px) {
        .w-cl {
            max-width: 33%;
        }
    }
    .flag-file {
        z-index: 1;
        color: #00c5dc;
        cursor: pointer;
        font-size: 2rem;
        font-weight: 600;
        position: absolute;
        left: 0.8em;
        top: 0.2em;
    }
    .delete-file {
        z-index: 1;
        color: #fff;
        cursor: pointer;
        font-size: 2rem;
        font-weight: 600;
        position: absolute;
        right: 0.8em;
        top: 0.1em;
    }
    .delete-file:hover {
        color: #f00;
    }
</style>