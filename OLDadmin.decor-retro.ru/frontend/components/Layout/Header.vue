<template>
    <!-- begin:: Header -->
    <div id="kt_header" class="kt-header kt-grid__item  kt-header--fixed "  v-loading="loading">

        <!-- begin:: Header Menu -->
        <button class="kt-header-menu-wrapper-close" id="kt_header_menu_mobile_close_btn"><i class="la la-close"></i></button>
        <div class="kt-header-menu-wrapper" id="kt_header_menu_wrapper">
            <div id="kt_header_menu" class="kt-header-menu kt-header-menu-mobile  kt-header-menu--layout- ">
                
            </div>
        </div>
        <!-- end:: Header Menu -->

        <!-- begin:: Header Topbar -->
        <div class="kt-header__topbar">

            <!--begin: User Bar -->
            <div class="kt-header__topbar-item kt-header__topbar-item--user">
                <div class="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="0px,0px">

                    <!--use "kt-rounded" class for rounded avatar style-->
                    <div class="kt-header__topbar-user kt-rounded-">
                        <span class="kt-header__topbar-welcome kt-hidden-mobile">Привет,</span>
                        <span class="kt-header__topbar-username kt-hidden-mobile">{{user.name}}</span>
                        <img alt="Pic" src="/assets/media/users/300_25.jpg" class="kt-rounded-" />

                        <!--use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) -->
                        <span class="kt-badge kt-badge--username kt-badge--lg kt-badge--brand kt-hidden kt-badge--bold">S</span>
                    </div>
                </div>
                <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-sm">
                    <div class="kt-user-card kt-margin-b-40 kt-margin-b-30-tablet-and-mobile" style="background-image: url(assets/media/misc/head_bg_sm.jpg)">
                        <div class="kt-user-card__wrapper">
                            <div class="kt-user-card__pic">

                                <!--use "kt-rounded" class for rounded avatar style-->
                                <img alt="Pic" src="/assets/media/users/300_21.jpg" class="kt-rounded-" />
                            </div>
                            <div class="kt-user-card__details">
                                <div class="kt-user-card__name">{{user.name}}</div>
                                <div class="kt-user-card__position">{{user.roles[0]}}, Декор Ретро</div>
                            </div>
                        </div>
                    </div>
                    <ul class="kt-nav kt-margin-b-10">
                        <li class="kt-nav__separator kt-nav__separator--fit"></li>
                        <li class="kt-nav__custom kt-space-between">
                            <a  @click.prevent="logout" href="#" class="btn btn-label-brand btn-upper btn-sm btn-bold">Выйти</a>
                       
                        </li>
                    </ul>
                </div>
            </div>
            <!--end: User Bar -->
        </div>
        <!-- end:: Header Topbar -->

    </div>
    <!-- end:: Header -->
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: mapGetters({
            user: 'auth/user'
        }),
      data() {
        return {
          loading: false,
        }
      },
        methods: {
            async logout() {
                // Log out the user.
                await this.$store.dispatch('auth/logout')

                // Redirect to login.
                this.$router.push({ name: 'login' })
            },
         
          checkProfile() {
            let userProfile = this.user.profile
            if(userProfile) {
              return userProfile.id
            } else {
              return null
            }

          }
        }
    }
</script>

<style scoped>

</style>
