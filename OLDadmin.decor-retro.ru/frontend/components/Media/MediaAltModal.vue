<template>
    <div class="row">
        <div class="col-md-9">
            <div  v-for="(item, index) in defaultAlt" v-show="newAlt[index].lang === activeLang">
                <div class="row">
                    <div class="col-md-3">
                        <h4>{{newAlt[index].lang_n}}</h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group" @click="focusField('alt')">
                            <label>Alt</label>
                            <textarea v-model="newAlt[index].alt"
                                      name="entryCategory"
                                      v-show="!showField('alt')"
                                      class="form-control"
                                      placeholder=""
                                      disabled
                                      rows="4"
                                      required></textarea>


                            <textarea
                                class="form-control"
                                name="entryCategory"
                                v-model="newAlt[index].alt"
                                v-show="showField('alt')"
                                placeholder=""
                                @focus="focusField('alt')"
                                @blur="blurField"
                                rows="4"
                                required></textarea>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <div class="col-md-3">
            <!--begin::Portlet-->
            <div class="kt-portlet">
                <div class="kt-portlet__head">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">Languages</h3>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="kt-portlet__body kt-portlet__body--fit">
                        <ul class="kt-nav kt-nav--bold kt-nav--md-space kt-nav--v3 kt-margin-t-20 kt-margin-b-20 nav nav-tabs" role="tablist">

                            <li class="kt-nav__item" v-for="item, index in lang">
                                <a :class="  (activeLang === item.name) ?  'kt-nav__link active': 'kt-nav__link '" data-toggle="tab"
                                   @click="changeActiveLang(item.name)"
                                   href="#kt_profile_tab_account_information" role="tab" aria-selected="false">
                                    <span class="kt-nav__link-icon"><i class="flaticon2-soft-icons-1"></i></span>
                                    <span class="kt-nav__link-text">{{ item.display_name }}</span>
                                </a>
                            </li>


                        </ul>
                    </div>
                </div>
            </div>
            <!--end::Portlet-->
        </div>

    </div>
</template>

<script>
    export default {
        props: ['media_id'],
        data() {
            return {
                name: '',

                alt_lang: [],

                lang: [],
                activeLang: 'en',

                defaultAlt: [],
                newAlt: [],

                editField : '',
            }
        },

        mounted() {


        },
        watch: {
            media_id: function(newVal, oldVal) {
                console.log(newVal)
                this.defaultAlt = [];
                this.newAlt = [];
                this.getAltMedia();
            }
        },
        methods: {
            getAltMedia(){
                // this.$axios.get(`/api/products/media-alt/${this.media_id}`).then((response) => {
                //     this.alt_lang = response.data;
                //
                //     //console.log('alt_lang')
                //     //console.log(this.alt_lang)
                // });
                //
                // this.$axios.get('/api/products/get-lang')
                //     .then(response => {
                //         this.lang = response.data;
                //         //console.log(this.lang.length)
                //         if(this.lang.length >= 1){
                //
                //             let self = this;
                //
                //             //Increase defaultCategory array
                //             self.lang.forEach(function (value, key) {
                //                 self.defaultAlt.push({lang_id: self.lang[key].id,
                //                     lang: self.lang[key].name, lang_n: self.lang[key].display_name});
                //                 // console.log(value);
                //                 // console.log(key);
                //             });
                //
                //             //Increase newCategory array
                //             self.lang.forEach(function (value, key) {
                //                 self.newAlt.push({lang_id: self.lang[key].id,
                //                     lang: self.lang[key].name, lang_n: self.lang[key].display_name});
                //                 // console.log(value);
                //                 // console.log(key);
                //             });
                //
                //             self.lang.forEach(function (value, key) {
                //                 self.newAlt[key].alt = self.alt_lang[key].alt;
                //             });
                //
                //         }
                //     })
                //     .catch(errors => {
                //         console.log(errors);
                //     });
            },

            update(){

                // this.$axios.post('/api/products/media/alt/update', {media_id: this.media_id, newAlt: this.newAlt})
                //     .then(response => {
                //         let status = response.data;
                //         if(status === 'ok'){
                //
                //             toastr.success("Successfully updated!");
                //             this.$emit('fetch-media');
                //         }
                //     })
                //     .catch(errors => {
                //         console.log(errors);
                //     });
            },

            changeActiveLang(lang)
            {
                this.activeLang = lang;
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
                return (this.name == '' || this.editField == name)
            },


        }

    }
</script>

<style scoped>

</style>
