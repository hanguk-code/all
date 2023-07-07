<template>
    <div class="kt-grid kt-grid--ver kt-grid--root">
        <div class="kt-grid__item   kt-grid__item--fluid kt-grid  kt-grid kt-grid--hor kt-login-v2" id="kt_login_v2">

            <!--begin::Item-->
            <div class="kt-grid__item  kt-grid--hor">

                <!--begin::Heade-->
                <div class="kt-login-v2__head">
                    <div class="kt-login-v2__logo">
                        <a href="#">
                            <!-- <h4>Декор Ретро</h4>  -->
                            <img src="/assets/media/logos/logo.png" alt="" style="width: 55%" />
                        </a>
                    </div>
                    <div class="kt-login-v2__signup">
                        <span>Добро пожаловать в </span>
                        <a href="#" class="kt-link kt-font-brand">Декор Ретро Админ</a>
                    </div>
                </div>

                <!--begin::Head-->
            </div>

            <!--end::Item-->

            <!--begin::Item-->
            <div class="kt-grid__item  kt-grid  kt-grid--ver  kt-grid__item--fluid" style="margin-top: 7rem;">

                <!--begin::Body-->
                <div class="kt-login-v2__body">

                    <!--begin::Wrapper-->
                    <div class="kt-login-v2__wrapper">
                        <div class="kt-login-v2__container">
                            <div class="kt-login-v2__title">
                                <h3>Войти в аккаунт </h3>
                            </div>

                            <!--begin::Form-->
                            <form  @submit.prevent="login" class="kt-login-v2__form kt-form" autocomplete="off" >
                                <div class="form-group">
                                    <input v-model="form.email"
                                           :class="errors.get('email') ? 'form-control is-invalid' : 'form-control'"
                                           type="text"
                                           placeholder="Имейл"
                                           required
                                    >
                                  <div class="invalid-feedback">{{errors.get('email')}}</div>
                                </div>
                                <div class="form-group">
                                    <input v-model="form.password"
                                           :class="errors.get('email') ? 'form-control is-invalid' : 'form-control'"
                                           type="password"
                                           placeholder="Пароль"
                                           autocomplete="off"
                                           required
                                    >
                                  <div class="invalid-feedback">{{errors.get('email')}}</div>
                                </div>

                                <!--begin::Action-->
                                <div class="kt-login-v2__actions">
                                    <!--<a href="#" class="kt-link kt-link&#45;&#45;brand">-->
                                        <!--Forgot Password ?-->
                                    <!--</a>-->
                                    <span href="#" class="kt-link kt-link--brand">
                                        <div class="form-check">
                                            <input v-model="remember"  class="form-check-input" type="checkbox"  id="remember">
                                            <label class="form-check-label kt-login-v1__forgot" for="remember">Запомнить меня</label>
                                        </div>
                                    </span>
                                    <button type="submit" class="btn btn-brand btn-elevate btn-pill" id="kt_login_submit">Войти</button>
                                </div>

                                <!--end::Action-->
                            </form>

                        </div>
                    </div>

                    <!--end::Wrapper-->

                    <!--begin::Image-->
                    <div class="kt-login-v2__image">
                        <img src="/assets/media/misc/bg_icon.svg" alt="">
                    </div>

                    <!--begin::Image-->
                </div>

                <!--begin::Body-->
            </div>

            <!--end::Item-->

            <!--begin::Item-->
            <div class="kt-grid__item" style="margin-top: 4rem;">
                <div class="kt-login-v2__footer">
                    <div class="kt-login-v2__info">
                        <a href="#" class="kt-link">&copy; {{dateYear}} Декор Ретро</a>
                    </div>
                </div>
            </div>

            <!--end::Item-->
        </div>
    </div>
</template>

<script>
  import Errors from '~/helpers/error.js'

    export default {
        middleware: 'guest',
      layout: 'authLayout',
        head () {
            return { title: 'Login' }
        },
        data: () => ({
            form: {
                email: '',
                password: ''
            },
            errors: new Errors(),
            remember: false,
            dateYear: '',
            status: false
    }),

        mounted() {
            let today = new Date();
            this.dateYear = today.getFullYear()
        },
        methods: {
            async login() {
                await this.$axios.$post('/login', this.form)
                    .then(({token, user}) => {
                        this.$store.dispatch('auth/saveToken', {
                            token: token,
                            remember: this.remember
                        })
                        this.$axios.setToken(token, 'Bearer')
                        this.status = true;
                    })
                   .catch(error => {
                     this.errors.record(error.response.data)
                   });
                if(this.status){
                    await this.$store.dispatch('auth/fetchUser')
                    this.$router.push({path: '/'});
                }

            },
        }
    }
</script>

<style scoped>
    .kt-login-v2 {
        background-color: #fff; }
    .kt-login-v2 .kt-login-v2__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row wrap;
        padding: 2rem 3rem; }
    .kt-login-v2 .kt-login-v2__head .kt-login-v2__logo > a {
        display: inline-block; }
    .kt-login-v2 .kt-login-v2__head .kt-login-v2__signup {
        display: flex;
        align-items: center; }
    .kt-login-v2 .kt-login-v2__head .kt-login-v2__signup > span {
        margin-bottom: 0;
        color: #9D9FB1;
        font-size: 1.1rem;
        padding-right: 0.5rem;
        font-weight: 500; }
    .kt-login-v2 .kt-login-v2__head .kt-login-v2__signup > a {
        font-weight: 500;
        font-size: 1.1rem; }
    .kt-login-v2 .kt-login-v2__body {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 3rem; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper {
        width: 50%;
        justify-content: flex-end;
        display: flex; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container {
        width: 100%;
        max-width: 500px;
        -webkit-box-shadow: 0px 0px 80px 0px rgba(77, 84, 124, 0.09);
        -moz-box-shadow: 0px 0px 80px 0px rgba(77, 84, 124, 0.09);
        box-shadow: 0px 0px 80px 0px rgba(77, 84, 124, 0.09);
        border-radius: 0.6rem; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__title {
        text-align: center; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__title > h3 {
        color: #636576;
        margin-top: 3rem;
        font-size: 1.5rem; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__form {
        padding: 3rem 4rem 2rem 4rem; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__form .form-control {
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-radius: 0;
        padding-left: 0; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0;
        margin-top: 3rem; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__actions a {
        display: inline-block; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__actions a span {
        font-size: 1rem;
        font-weight: 500; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__actions .btn {
        padding: 1rem 3rem;
        color: #fff;
        font-size: 1.2rem;
        font-weight: 500; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__desc {
        text-align: center;
        color: #A5A7BB;
        font-size: 1.2rem;
        font-weight: 400; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__options {
        display: flex;
        justify-content: space-between;
        padding: 2rem 4rem 3rem 4rem; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__options > a {
        flex: 1;
        font-weight: 400;
        font-size: 1rem;
        padding: 1rem 0;
        color: #fff; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__options > a > i {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.5);
        padding-right: 0.4rem; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__options > a:not(:first-child):not(:last-child) {
        margin: 0 2rem; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__options > a.btn-facebook {
        background-color: #3b5998; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__options > a.btn-facebook:hover {
        transition: background-color 0.3s ease;
        background-color: #324c82; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__options > a.btn-twitter {
        background-color: #1da1f2; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__options > a.btn-twitter:hover {
        transition: background-color 0.3s ease;
        background-color: #0d92e3; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__options > a.btn-google {
        background-color: #ea4335; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__options > a.btn-google:hover {
        transition: background-color 0.3s ease;
        background-color: #e72919; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__image {
        width: 50%;
        margin-left: 8rem;
        justify-content: flex-start;
        display: flex; }
    .kt-login-v2 .kt-login-v2__body .kt-login-v2__image > img {
        width: 100%;
        max-width: 500px; }
    .kt-login-v2 .kt-login-v2__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 3rem; }
    .kt-login-v2 .kt-login-v2__footer .kt-login-v2__info > a {
        font-weight: 500;
        font-size: 1rem;
        color: #A5A7BB; }
    .kt-login-v2 .kt-login-v2__footer .kt-login-v2__link {
        order: 2; }
    .kt-login-v2 .kt-login-v2__footer .kt-login-v2__link > a {
        color: #9C9FB1;
        font-weight: 500;
        font-size: 1rem; }
    .kt-login-v2 .kt-login-v2__footer .kt-login-v2__link > a:not(:first-child):not(:last-child) {
        margin: 0 2rem; }

    @media (max-width: 1024px) {
        .kt-login-v2 .kt-login-v2__head {
            display: flex;
            flex-direction: column;
            padding: 1.5rem 2rem; }
        .kt-login-v2 .kt-login-v2__head .kt-login-v2__logo {
            margin-bottom: 2rem; }
        .kt-login-v2 .kt-login-v2__head .kt-login-v2__signup > span {
            padding-left: 0; }
        .kt-login-v2 .kt-login-v2__body {
            padding-top: 1rem;
            display: flex;
            flex-direction: column; }
        .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper {
            padding-left: 0;
            width: 100%;
            display: flex;
            justify-content: center; }
        .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container {
            margin-left: 0; }
        .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__title {
            padding-top: 1rem; }
        .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__form {
            padding: 3rem 2rem; }
        .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__actions {
            padding: 0; }
        .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__options {
            margin: 1rem 0;
            padding: 2rem 2rem; }
        .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__options > a > i {
            padding: 0.4rem 0.3rem 0.4rem 0; }
        .kt-login-v2 .kt-login-v2__body .kt-login-v2__wrapper .kt-login-v2__container .kt-login-v2__options > a:not(:first-child):not(:last-child) {
            margin: 0 2rem; }
        .kt-login-v2 .kt-login-v2__body .kt-login-v2__image {
            display: flex;
            justify-content: center;
            width: 100%;
            margin-left: 0;
            padding: 4rem 0; }
        .kt-login-v2 .kt-login-v2__body .kt-login-v2__image > img {
            width: 100%;
            max-width: 500px;
            height: 100%; }
        .kt-login-v2 .kt-login-v2__footer {
            padding: 1.5rem 2rem; }
        .kt-login-v2 .kt-login-v2__footer .kt-login-v2__info > a {
            padding-right: 0.5rem; }
        .kt-login-v2 .kt-login-v2__footer .kt-login-v2__link > a:not(:first-child):not(:last-child) {
            margin: 0 1rem; } }
</style>
