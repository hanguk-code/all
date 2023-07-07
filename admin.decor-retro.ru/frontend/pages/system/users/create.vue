<template>
    <div>
        <Breadcrumbs title="Пользователи" :items="breadcrumbsItems"/>

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
                                    <h3 class="kt-portlet__head-title">Новый Пользователь</h3>
                                </div>
                                <div class="kt-portlet__head-label">
                                    <button type="submit" class="btn btn-primary">Сохранить</button>
                                </div>
                            </div>


                            <div class="kt-portlet__body">
                                <!--  <div class="row" v-show="showPhoto">
                                     <div class="col-md-2">
                                         <img :src="user.avatar" style="border-radius: 50%; width: 100%; height: auto;">

                                     </div>
                                 </div>
                                 <br v-show="showPhoto">
                                 <div class="row">

                                     <div class="col-md-2">
                                         <a class="btn btn-success btn-sm btn-block" style="color: white;" @click="toggleShow">Set Avatar</a>
                                     </div>
                                     <br>
                                     <my-upload field="img"
                                                @crop-success="cropSuccess"
                                                v-model="show"
                                                :width="300"
                                                :height="300"
                                                :params="params"
                                                langType="en"></my-upload>

                                 </div>
                                 <br> -->
                                <div class="row">

                                    <div class="row">
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <el-select
                                                    v-model="user.role"
                                                    filterable
                                                    placeholder="Выберите роль"
                                                    :disabled="user.role === 'admin'"
                                                >
                                                    <el-option
                                                        v-for="item in roles"
                                                        :key="item.name"
                                                        :label="item.label"
                                                        :value="item.name">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <el-select
                                                    v-model="user.status"
                                                    filterable
                                                    placeholder="Выберите статус"
                                                    :disabled="user.role === 'admin'"
                                                >
                                                    <el-option
                                                        v-for="item in statuses"
                                                        :key="item.name"
                                                        :label="item.label"
                                                        :value="item.name">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Имя</label>
                                            <input type="text" v-model="user.name"
                                                   :class="errors.get('name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите Имя"
                                            >
                                            <div class="invalid-feedback">{{ errors.get('name') }}</div>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="email" v-model="user.email"
                                                   :class="errors.get('email') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите email"
                                            >
                                            <div class="invalid-feedback">{{ errors.get('email') }}</div>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Пароль</label>
                                            <input type="text" v-model="user.password"
                                                   :class="errors.get('password') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите пароль"
                                                   minlength="8"
                                            >
                                            <div class="invalid-feedback">{{ errors.get('password') }}</div>
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
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import Errors from '~/helpers/error.js'

export default {
    middleware: 'auth',
    components: {
        Breadcrumbs, 'my-upload': myUpload
    },
    data() {
        return {
            breadcrumbsItems: [
                {
                    title: 'Пользователи',
                    name: 'system-users'
                },
                {
                    title: 'Новый',
                    name: 'system-users-create'
                }
            ],

            user: {},
            profile: {
                platform_id: ''
            },
            platforms: [],
            roles: [{label: 'Админ', name: 'admin'}, {label: 'Редактор', name: 'editor'}],
            types: [],
            statuses: [{label: 'Активен', name: 'active'}, {label: 'Не активен', name: 'inactive'}],
            loading: false,
            loadingOptions: false,
            errors: new Errors(),

            //Avatar
            show: false,
            showPhoto: false,
            params: {
                //token: tokenN.content,
                name: 'avatar'
            },
        };
    },
    async fetch() {
        if (!this.$permission(['*'])) {
            this.$router.push({name: 'index'});
        }
    },
    methods: {
        store() {
            this.loading = true;
            this.$axios.$post('/users', {
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                status: this.user.status,
                roles: this.user.role,
                role: this.user.role
            })
                .then(response => {
                    let status = response.data;
                    if (status.status === 'success') {
                        this.$message({
                            showClose: true,
                            message: 'Успешно создано',
                            type: 'success',
                            center: true
                        });
                        this.$router.push({name: 'system-users'});
                    }
                })
                .catch(error =>
                    this.errors.record(error.response.data)
                )
                .finally(() => {
                    this.loading = false;
                });
        },

        toggleShow() {
            this.show = !this.show;
            //document.querySelector(".vue-image-crop-upload").style.display = 'block';
        },

        /**
         * crop success
         *
         * [param] imgDataUrl
         * [param] field
         */
        cropSuccess(imgDataUrl) {
            this.user.avatar = imgDataUrl;
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

