<template>
    <div class="row">
        <div class="col-md-12">
            <div class="kt-pricing-v2">

                <!--begin::Portlet-->
                <div class="kt-portlet">
                    <div class="kt-portlet__body">
                        <div class="kt-separator kt-separator--height-xs"></div>
                        <h3 class="kt-heading kt-heading--center kt-heading--space-sm kt-heading--xl kt-heading--bolder">

                            <button type="button" class="btn btn-outline-brand btn-elevate btn-pill filezone"><i class="la la-cloud-download"></i>
                                <input type="file"
                                       id="files"
                                       ref="files"
                                       multiple
                                       accept="image/jpeg,image/jpg,image/png,image/gif"
                                       v-on:change="handleFiles()"/>
                                Загрузить фото
                            </button>
                        </h3>
<!--                         <div class="kt-separator kt-separator--height-sm"></div>
 -->                      <!--   <div class="kt-align-center">
                            <div class="btn-group btn-pill btn-elevated">
                                <div class="nav" role="tablist">
                                    <a class="btn btn-square btn-bold btn-widest btn-taller active show kt-font-transform-u" data-toggle="tab" href="#kt_tabs_3_1" role="tab"><i class="fa fa-image"></i> All</a>
                                   
                                </div>
                            </div>
                        </div> -->
<!--                         <div class="kt-separator kt-separator--height-md"></div>
 -->                        <div class="tab-content">
                            <div class="tab-pane active" id="kt_tabs_3_1" role="tabpanel">
                                <!-- begin:: Content -->
                                <div class="kt-section__content kt-section__content--border">
                                    <div class="row">
                                        <div class="card col-md-2"
                                             style="margin-top: 20px; margin-left: 25px; box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);"
                                             v-for="(file, key) in files">

                                            <div class="kt-bg-metal w-100 ">
                                                <i class="flaticon-close delete-file"  v-on:click="removeFile(key)"></i>

                                                <img class="preview kt-blog-grid__image" width="100%"  style="border-radius: 0.3rem; background-color: white;" v-bind:ref="'preview'+parseInt(key)"/>
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title"> {{ file.name }}</h5>
                                                <!--<div class="success-container" v-if="file.id > 0">-->
                                                    <!--Success-->
                                                    <!--<input type="hidden" :name="input_name" :value="file.id"/>-->
                                                <!--</div>-->
                                            </div>


                                        </div>


                                    </div>

                                </div>
                                <!-- end:: Content -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['onMedia'],
        data() {
            return {
                files: []
            }
        },

        methods: {
            removeFile( key ){
                this.files.splice( key, 1 );
                this.getImagePreviews();
            },
            handleFiles() {

                let uploadedFiles = this.$refs.files.files;

                for(var i = 0; i < uploadedFiles.length; i++) {
                    this.files.push(uploadedFiles[i]);
                }
                this.$emit('update', this.files)
                this.getImagePreviews();
            },
            getImagePreviews(){
                for( let i = 0; i < this.files.length; i++ ){
                    if ( /\.(jpe?g|png|gif)$/i.test( this.files[i].name ) ) {
                        let reader = new FileReader();
                        reader.addEventListener("load", function(){
                            this.$refs['preview'+parseInt(i)][0].src = reader.result;
                        }.bind(this), false);
                        reader.readAsDataURL( this.files[i] );
                    }else{
                        this.$nextTick(function(){
                            this.$refs['preview'+parseInt(i)][0].src = '/generic.png';
                        });
                    }
                }
            },
        },

        mounted() {

        },

        computed: {

        }
    }
</script>

<style scoped>
    @import '@/assets/media.css';
    input[type="file"]{
        opacity: 0;
        width: 100%;
        height: 200px;
        position: absolute;
        cursor: pointer;
    }
    .filezone {
        outline-offset: -10px;
        padding: 10px 10px;
        position: relative;
        cursor: pointer;
    }
    @media (min-width: 1661px) {
        .w-cl {
            max-width: 25%!important;
        }
    }

    @media (min-width: 770px) and (max-width: 1600px) {
        .w-cl {
            max-width: 33%;
        }
    }

    .flag-file {
        z-index: 1;
        color: #00c5dc;;
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
