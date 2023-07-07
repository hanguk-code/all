<template>
    <div>
        <Breadcrumbs title="Users" :items="breadcrumbsItems" />

        <!-- begin:: Content -->
        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div class="row">
                <div class="col-md-12">

                    <!--begin::Portlet-->
                    <div class="kt-portlet">
                        <div class="kt-portlet__head">
                            <div class="kt-portlet__head-label">
                                <n-link :to="{name: 'platform-users' }" class="btn btn-secondary"><i class="fa fa-arrow-left" aria-hidden="true"></i>
                                    To table
                                </n-link>
                            </div>
                        </div>

                        <!--begin::Form-->
                        <form class="kt-form" role="form" v-loading="loading">
                            <div class="kt-portlet__body">
                                <div class="row" v-show="showPhoto">
                                    <div class="col-md-2">
                                        <img :src="avatar" style="border-radius: 50%; width: 100%; height: auto;">

                                    </div>
                                </div>
                                <br v-show="showPhoto">
                                <div class="row">

                                    <div class="col-md-2">
                                        <a class="btn btn-success btn-sm btn-block" style="color: white;" @click="toggleShow">Set Logo</a>
                                    </div>
                                    <br>
                                    <my-upload field="img"
                                               @crop-success="cropSuccess"
                                               v-model="show"
                                               :width="300"
                                               :height="300"
                                               :params="params"
                                               langType="en"
                                               img-format="png"></my-upload>

                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-2">
                                        <div class="form-group" @mousedown="focusField('type')">
                                            <el-select
                                                v-model="user.type"
                                                v-show="showField('type')"
                                                filterable
                                                placeholder="Choose Type"
                                                @focus="focusField('type')"
                                                @change="blurField"
                                            >
                                                <el-option
                                                    v-for="item in types"
                                                    :key="item"
                                                    :label="item"
                                                    :value="item">
                                                </el-option>
                                            </el-select>
                                            <div class="item__error">
                                                {{errors.get('type')}}
                                            </div>

                                            <el-select
                                                v-model="user.type"
                                                v-show="!showField('type')"
                                                filterable
                                                placeholder="Choose type"
                                                disabled
                                            >
                                            </el-select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group" @mousedown="focusField('status')">
                                            <el-select
                                                v-model="user.status"
                                                v-show="showField('status')"
                                                filterable
                                                placeholder="Choose status"
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
                                                placeholder="Choose status"
                                                disabled
                                            >
                                            </el-select>

                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group" @mousedown="focusField('gender')">
                                            <el-select
                                                v-model="profile.gender"
                                                v-show="showField('gender')"
                                                filterable
                                                placeholder="Choose Gender"
                                                @focus="focusField('gender')"
                                                @change="blurField"
                                            >
                                                <el-option
                                                    v-for="item in optionsGender"
                                                    :key="item"
                                                    :label="item"
                                                    :value="item">
                                                </el-option>
                                            </el-select>
                                            <div class="item__error">
                                                {{errors.get('gender')}}
                                            </div>

                                            <el-select
                                                v-model="profile.gender"
                                                v-show="!showField('gender')"
                                                filterable
                                                placeholder="Choose gender"
                                                disabled
                                            >
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group" @click="focusField('name')">
                                            <label>Name</label>
                                            <input type="text" v-model="user.name"
                                                   v-show="showField('name')"
                                                   :class="errors.get('name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Enter name"
                                                   @focus="focusField('name')"
                                                   @blur="blurField"
                                            >
                                            <div class="invalid-feedback">{{errors.get('name')}}</div>

                                            <input type="text"
                                                   v-model="user.name"
                                                   class="form-control"
                                                   placeholder="Enter name"
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
                                                   placeholder="Enter email"
                                                   @focus="focusField('email')"
                                                   @blur="blurField"
                                            >
                                            <div class="invalid-feedback">{{errors.get('email')}}</div>

                                            <input type="text"
                                                   v-model="user.email"
                                                   class="form-control"
                                                   placeholder="Enter email"
                                                   v-show="!showField('email')"
                                                   disabled
                                            >
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group" @click="focusField('password')">
                                            <label>Password</label>
                                            <input type="text" v-model="user.password"
                                                   v-show="showField('password')"
                                                   :class="errors.get('password') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Enter password"
                                                   minlength="8"
                                                   @focus="focusField('password')"
                                                   @blur="blurField"
                                            >
                                            <div class="invalid-feedback">{{errors.get('password')}}</div>

                                            <input type="text"
                                                   class="form-control"
                                                   placeholder="Edit password field to set new password"
                                                   minlength="8"
                                                   v-show="!showField('password')"
                                                   disabled
                                            >

                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group" @click="focusField('last_name')">
                                            <label>Last name</label>
                                            <input type="text" v-model="profile.last_name"
                                                   v-show="showField('last_name')"
                                                   :class="errors.get('last_name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Enter last name"
                                                   @focus="focusField('last_name')"
                                                   @blur="blurField"
                                            >
                                            <div class="invalid-feedback">{{errors.get('last_name')}}</div>

                                            <input type="text"
                                                   v-model="profile.last_name"
                                                   class="form-control"
                                                   placeholder="Enter last name"
                                                   minlength="8"
                                                   v-show="!showField('last_name')"
                                                   disabled
                                            >
                                        </div>
                                    </div>
                                </div>

                                <hr>

                                <div class="form-group row">
                                    <label class="col-md-1 col-form-label"> Social links</label>
                                    <div class="col-md-5">
                                        <div class="kt-repeater">
                                            <div data-repeater-list="demo1">

                                                <div v-for="socialLink, index in socialLinks"
                                                     :key="socialLink.id"
                                                     data-repeater-item="" class="kt-repeater__item" style="">
                                                    <div class="input-group">
                                                        <div class="input-group-prepend"><span class="input-group-text"><i class="la la-chain"></i></span></div>
                                                        <input type="text"
                                                               v-model="socialLink.url"
                                                               :class="errors.get('socials.'+index+'.url') ? 'form-control is-invalid' : 'form-control'"
                                                               placeholder="Enter social url"
                                                               @blur="blurField"
                                                        >
                                                        <div class="invalid-feedback">{{errors.get('socials.'+index+'.url')}}</div>
                                                        <div class="input-group-append">
                                                            <button data-repeater-delete="" class="btn btn-danger btn-icon"  @click="removeSocialLink(index, socialLink.id)">
                                                                <i class="la la-close kt-font-light"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="kt-separator kt-separator--space-sm"></div>
                                                </div>
                                            </div>
                                            <div class="kt-repeater__add-data">
                                        <span data-repeater-create="" class="btn btn-info btn-sm" @click="addSocialLink">
                                            <i class="la la-plus"></i> Add
                                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!--<div class="row">-->
                                <!--<div class="col-md-6">-->
                                <!--<label>Brand </label>&nbsp;-->
                                <!--<label class="kt-checkbox kt-checkbox&#45;&#45;single kt-checkbox&#45;&#45;solid">-->
                                <!--<input type="checkbox" v-model="user.is_brand">&nbsp;<span></span>-->
                                <!--</label>-->
                                <!--</div>-->
                                <!--</div>-->

                            </div>
                        </form>
                        <!--end::Form-->

                    </div>
                    <!--end::Portlet-->

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
                        title: 'Platform Users',
                        name: 'platform-users'
                    },
                    {
                        title: 'Edit',
                        name: 'platform-users-id',
                        params: 'id: '+ this.$route.params.id,
                    }
                ],

                user: {},
                userDisabled: {},
                profile: { gender: '' },
                avatar: '',
                socialLinks: [],
                newSocial: '',
                platforms: [],
                roles: [],
                types: [],
                statuses: [],
                loading: false,
                errors: new Errors(),
                editField : '',
                platformEndpoint: this.$store.state.auth.user.profile.platform.endpoint,
                optionsGender: ['male','female'],

                //Avatar
                show: false,
                showPhoto: false,
                params: {
                    //token: tokenN.content,
                    name: 'avatar'
                },

                mediaServerUrl: process.env.mediaUrl,
            };
        },
        async fetch() {
            if(!this.$permission(['user_platform_edit'])) {
                this.$router.push({ name: 'index' });
            }
            await this.getItemOptionsData()
            await this.getItemEditData()
        },
        methods: {
            getItemEditData() {
                this.loading = true;
                this.$axios.get(`${this.platformEndpoint}/users/${this.$route.params.id}`)
                    .then(response => {
                        let data = response.data.data;

                        this.user = data;

                        //delete this.user.password;
                        console.log(this.user)
                        //this.user.password = null;
                        if(data.profile) {
                            this.profile = data.profile
                            if(data.profile.avatar !== null){
                                this.avatar = data.profile.avatar
                                this.showPhoto = true;
                            }
                        }
                        this.socialLinks = data.socials

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
                this.$axios.get(`${this.platformEndpoint}/users/update/data`)
                    .then(response => {
                        let data = response.data.data;
                        this.platforms = data.platform
                        this.roles = data.role
                        this.types = data.type
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
                this.$axios.$patch(`${this.platformEndpoint}/users/${this.$route.params.id}`, {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    type: this.user.type,
                    status: this.user.status,
                    socials: this.socialLinks,
                    profile: {
                        id: this.profile ? this.profile.id : '',
                        last_name: this.profile.last_name,
                        gender: this.profile.gender,
                    },
                    roles: this.user.role
                })
                    .then(response => {
                        let data = response.data;
                        if(data.status === 'success'){
                            //this.$fetch();
                            this.getItemEditData();
                            //this.platformIdToName(this.platforms, this.user.platform)
                            //this.roleIdToName(this.roles, this.user.role)

                            if(this.avatar) {
                                this.submitFiles(data.user_id, data.profile_id)
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: 'Successfully updated',
                                    type: 'success',
                                    center: true
                                });
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

            submitFiles(id, profileId) {
                let formData = new FormData();
                formData.append('avatar', this.avatar);
                formData.append('id', id);
                formData.append('item', 'user');

                this.$axios.post(this.mediaServerUrl+'/api/avatar/update/'+id,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function (response) {
                    this.afterSubmitSave(response.data.path, id, profileId)
                    console.log('success');
                }.bind(this)).catch(function (data) {
                    console.log('error');
                });

            },

            afterSubmitSave(data, userId, profileId) {
                this.$axios.patch(`${this.platformEndpoint}/users/${userId}`, {
                    profile: {
                        id: profileId ? profileId : '',
                        avatar: data,
                    },
                })
                    .then(response => {
                        this.$message({
                            showClose: true,
                            message: 'Successfully updated',
                            type: 'success',
                            center: true
                        });
                    });
            },

            addSocialLink: function () {
                this.socialLinks.push({
                    url: ''
                })
                this.newSocial = ''
            },

            removeSocialLink: function (index, id) {
                this.socialLinks.splice(index, 1);
                this.$axios.delete(`${this.platformEndpoint}/users/socials/${id}`)
                    .then(response => {
                        this.$message({
                            showClose: true,
                            message: 'Successfully deleted',
                            type: 'success',
                            center: true
                        });
                    })
                    .catch(errors => {
                        console.log(errors);
                    });
            },

            //Enable disabled btns & Edit
            focusField(name){
                this.editField = name;

            },
            blurField(){
                this.editField = '';
                this.update();
            },
            showField(name){
                return (this.user[name] == '' || this.editField == name)
            },

            toggleShow() {
                this.show = !this.show;
            },

            platformIdToName(array, pValue) {
                let platform = this.platforms

                let result = array.find(p => p.id === pValue).name

                this.userDisabled.platform = result
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
            },

            /**
             * crop success
             *
             * [param] imgDataUrl
             * [param] field
             */
            cropSuccess(imgDataUrl){
                this.avatar = imgDataUrl;
                this.showPhoto =  true;
                this.update();
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
