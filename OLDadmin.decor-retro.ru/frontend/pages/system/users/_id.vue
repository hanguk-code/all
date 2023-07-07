<template>
    <div>
        <Breadcrumbs title="Пользователи" :items="breadcrumbsItems" />

        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div class="row">
                <div class="col-md-12">

                        <!--begin::Form-->
                        <form class="kt-form"  role="form"  v-loading="loading">
                    <!--begin::Portlet-->
                    <div class="kt-portlet">
                        <div class="kt-portlet__head">
                              <div class="kt-portlet__head-label">
                                    <n-link :to="{name: 'system-users' }" class="btn btn-secondary"><i class="fa fa-arrow-left" aria-hidden="true"></i>
                                        В таблицу
                                    </n-link>
                                </div>
                               <!--  <div class="kt-portlet__head-label">
                                    <button type="submit" class="btn btn-primary">Сохранить</button>
                                </div> -->
                        </div>

                            <div class="kt-portlet__body">

                                <div class="row">
                                   
                                    <div class="col-md-2">
                                        <div class="form-group" @mousedown="focusField('role')">
                                            <el-select
                                                v-model="user.role"
                                                v-show="showField('role')"
                                                
                                                filterable
                                                placeholder="Выберите роль"
                                                @focus="focusField('role')"
                                                @change="blurField"
                                            >
                                                <el-option
                                                    v-for="item in roles"
                                                    :key="item.name"
                                                    :label="item.label"
                                                    :value="item.name">
                                                    <span style="float: left">{{ item.label }}</span>
                                                </el-option>
                                            </el-select>
                                            <div class="item__error">
                                                {{errors.get('roles')}}
                                            </div>

                                            <el-select
                                                v-model="userDisabled.role"
                                                v-show="!showField('role')"
                                                filterable
                                                placeholder="Выберите роль"
                                                disabled
                                            >
                                            </el-select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group" @mousedown="focusField('status')">
                                            <el-select
                                                v-model="user.status"
                                                filterable
                                                placeholder="Выберите статус"
                                                v-show="showField('status')"
                                                @focus="focusField('status')"
                                                @change="blurField"
                                            >
                                                <el-option
                                                    v-for="item in statuses"
                                                    :key="item"
                                                    :label="item"
                                                    :value="item">
                                                </el-option>
                                            </el-select>
                                            <div class="item__error">
                                                {{errors.get('status')}}
                                            </div>

                                            <el-select
                                                v-model="user.status"
                                                v-show="!showField('status')"
                                                filterable
                                                placeholder="Выберите статус"
                                                disabled
                                            >
                                            </el-select>

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group" @click="focusField('name')">
                                            <label>ФИО</label>
                                            <input type="text" v-model="user.name"
                                                   :class="errors.get('name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите имя"
                                                   v-show="showField('name')"
                                                   @focus="focusField('name')"
                                                   @blur="blurField"
                                            >
                                            <div class="invalid-feedback">{{errors.get('name')}}</div>

                                            <input type="text"
                                                   v-model="user.name"
                                                   class="form-control"
                                                   placeholder="Введите имя"
                                                   v-show="!showField('name')"
                                                   disabled
                                            >
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group" @click="focusField('email')">
                                            <label>Email</label>
                                            <input type="email" v-model="user.email"
                                                   v-show="showField('email')"
                                                   :class="errors.get('email') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите email"
                                                   @focus="focusField('email')"
                                                   @blur="blurField"
                                            >
                                            <div class="invalid-feedback">{{errors.get('email')}}</div>

                                            <input type="text"
                                                   v-model="user.email"
                                                   class="form-control"
                                                   placeholder="Введите email"
                                                   v-show="!showField('email')"
                                                   disabled
                                            >
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group" @click="focusField('password')">
                                            <label>Пароль</label>
                                            <input type="text" v-model="user.password"
                                                   v-show="showField('password')"
                                                   :class="errors.get('password') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Введите пароль"
                                                   minlength="8"
                                                   @focus="focusField('password')"
                                                   @blur="blurField"
                                            >
                                            <div class="invalid-feedback">{{errors.get('password')}}</div>

                                            <input type="text"
                                                   class="form-control"
                                                   placeholder="Измените поле для нового пароля, или оставьте пустым"
                                                   minlength="8"
                                                   v-show="!showField('password')"
                                                   disabled
                                            >

                                        </div>
                                    </div>
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
    import Breadcrumbs from '~/components/Breadcrumbs.vue'
    import Errors from '~/helpers/error.js'

    export default {
        middleware: 'auth',
        components: {
            Breadcrumbs
        },
        data() {
            return {
                breadcrumbsItems: [
                    {
                        title: 'Пользователи',
                        name: 'system-users'
                    },
                    {
                        title: 'Редактирование',
                        name: 'system-users-id',
                        params: 'id: '+ this.$route.params.id,
                    }
                ],

                user: {},
                userDisabled: {},
                roles: [{label: 'Админ', name: 'admin'}],

                 statuses: [{label: 'Активен', name: 'active'}, {label: 'Не активен', name: 'inactive'}],
                loading: false,
                errors: new Errors(),
                editField : '',
                oldPass: '',
            };
        },
        async fetch() {
            if(!this.$permission(['*'])) {
                this.$router.push({ name: 'index' });
            }
            await this.getItemOptionsData()
            await this.getItemEditData()
        },
        methods: {
            getItemEditData() {
                this.loading = true;
                this.$axios.get(`/users/${this.$route.params.id}`)
                    .then(response => {
                        let data = response.data.data;
                        this.user = data;
                        //this.user.role = data.roles_id
                        this.userDisabled.role =  data.role
                    })
                    .catch(errors => {
                        console.log(errors);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            getItemOptionsData() {
                this.loading = true;
                this.$axios.get('/users/update/data')
                    .then(response => {
                        let data = response.data.data;
                        this.roles = data.role
                        this.statuses = data.status
                    })
                    .catch(errors => {
                        console.log(errors);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            update(){
                this.loading = true;
                this.$axios.$patch(`/users/${this.$route.params.id}`, {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    status: this.user.status,
                    // profile: {
                    //     id: this.profile ? this.profile.id : '',
                    //     platform_id: !isNaN(this.user.platform) ? this.user.platform : ''
                    // },
                    roles: this.user.role,
                    role: this.user.role
                })
                    .then(response => {
                        let status = response.data;
                        if(status.status === 'success'){
                            this.roleIdToName(this.roles, this.user.role)
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

            //Enable disabled btns & Edit
            focusField(name){
                if(name === 'password') {
                    this.togglePass()
                }
                this.editField = name;
            },
            saveOldValue(oldVal) {
                this.oldValueField = oldVal
            },
            togglePass() {
                if(this.user.password) {
                    this.oldPass = this.user.password
                    this.user.password = ''
                }       
            },
            blurField(){
                if(!this.user.password) {
                    this.user.password = this.oldPass
                }
                this.editField = '';
                this.update();
            },
            showField(name){
                return (this.user[name] == '' || this.editField == name)
            },

            toggleShow() {
                this.show = !this.show;
            },

            roleIdToName(array, rValue) {
                let len = rValue.length;

                let result = [];
                for(let i = 0; i < len; i++) {
                    let r = array.find(p => p.id === rValue[i]).name
                    result.push(r)
                }
                console.log(result)
                this.userDisabled.role = result
            }
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
