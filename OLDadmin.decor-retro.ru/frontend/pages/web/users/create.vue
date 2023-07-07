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
                                <h3 class="kt-portlet__head-title">New User</h3>
                            </div>
                        </div>

                        <!--begin::Form-->
                        <form class="kt-form"  role="form" @submit.prevent="store" v-loading="loadingOptions">
                            <div class="kt-portlet__body">
                                <div class="row" v-show="showPhoto">
                                    <div class="col-md-2">
                                        <img :src="avatar" style="border-radius: 50%; width: 100%; height: auto;">

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
                                <br>
                                <div class="row">
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <el-select
                                                    v-model="user.type"
                                                    filterable
                                                    placeholder="Choose Type">
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
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <el-select
                                                v-model="user.status"
                                                filterable
                                                placeholder="Choose status">
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
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <el-select
                                                v-model="profile.gender"
                                                filterable
                                                placeholder="Choose Gender">
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
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Name</label>
                                            <input type="text" v-model="user.name"
                                                   :class="errors.get('name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Enter name"
                                            >
                                            <div class="invalid-feedback">{{errors.get('name')}}</div>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="email" v-model="user.email"
                                                   :class="errors.get('email') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Enter email"
                                            >
                                            <div class="invalid-feedback">{{errors.get('email')}}</div>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Password</label>
                                            <input type="text" v-model="user.password"
                                                   :class="errors.get('password') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Enter password"
                                                   minlength="8"
                                            >
                                            <div class="invalid-feedback">{{errors.get('password')}}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Last name</label>
                                            <input type="text" v-model="profile.last_name"
                                                   :class="errors.get('last_name') ? 'form-control is-invalid' : 'form-control'"
                                                   placeholder="Enter last name"
                                            >
                                            <div class="invalid-feedback">{{errors.get('last_name')}}</div>
                                        </div>
                                    </div>
                                </div>

                                <hr>

                                <div class="form-group row">
                                    <label class="col-md-1 col-form-label">Social links</label>
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
                                                        >
                                                        <div class="invalid-feedback">{{errors.get('socials.'+index+'.url')}}</div>
                                                        <div class="input-group-append">
                                                            <button data-repeater-delete="" class="btn btn-danger btn-icon"  @click="removeSocialLink(index)">
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

                            </div>
                            <div class="kt-portlet__foot">
                                <div class="kt-form__actions" v-loading="loading">
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>
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
                        title: 'Create',
                        name: 'platform-users-create'
                    }
                ],

                user: {},
                profile: {},
                avatar: '',

                //Social url
                socialLinks: [{id: 1, url: ''}],
                newSocial: '',
                platforms: [],
                roles: [],
                types: [],
                statuses: [],
                loading: false,
                loadingOptions: false,
                errors: new Errors(),
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
            if(!this.$permission(['user_platform_create'])) {
                this.$router.push({ name: 'index' });
            }
            await this.getItemOptionsData()
        },
        methods: {
            getItemOptionsData() {
                this.loadingOptions = true;
                this.$axios.get(`${this.platformEndpoint}/users/create/data`)
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
                        this.loadingOptions = false;
                    });
            },
            store(){
                this.loading = true;
                this.$axios.$post(`${this.platformEndpoint}/users`, {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    type: this.user.type,
                    status: this.user.status,
                    profile: this.profile,
                    roles: this.user.role,
                    socials: this.socialLinks
                })
                    .then(response => {
                        let data = response.data;
                        if(data.status === 'success'){
                            this.$message({
                                showClose: true,
                                message: 'Successfully created',
                                type: 'success',
                                center: true
                            });
                            if(this.avatar) {
                                this.submitFiles(data.user_id, data.profile_id)
                            } else {
                                this.$router.push({ name: 'platform-users' });
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
                        this.$router.push({ name: 'platform-users' });
                    });
            },

            addSocialLink: function () {
                let socialLength = this.socialLinks.length;
                this.socialLinks.push({
                    id: socialLength  + 1,
                    url: ''
                })
                this.newSocial = ''
            },

            removeSocialLink: function (index) {
                //this.socialLinks.splice(this.socialLinks.indexOf(index), 1)
                this.socialLinks.splice(index, 1);
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
            cropSuccess(imgDataUrl){
                this.avatar = imgDataUrl;
                console.log(this.urltoFile(this.avatar))
                this.showPhoto =  true;
            },

            urltoFile(url, filename, mimeType){
                mimeType = mimeType || (url.match(/^data:([^;]+);/)||'')[1];
                return (fetch(url)
                        .then(function(res){return res.arrayBuffer();})
                        .then(function(buf){return new File([buf], filename, {type:mimeType});})
                );
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

