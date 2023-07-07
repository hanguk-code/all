<template>
    <div>
        <!-- begin:: Aside -->
        <button class="kt-aside-close " id="kt_aside_close_btn"><i class="la la-close"></i></button>
        <div class="kt-aside  kt-aside--fixed  kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop" id="kt_aside">

            <!-- begin::Aside Brand -->
            <div class="kt-aside__brand kt-grid__item " id="kt_aside_brand">
                <div class="kt-aside__brand-logo">
                    <a href="#">
                        <img alt="Logo" src="/assets/media/logos/logo.png" style="width: 40%" />
                    </a>
                </div>
                <div class="kt-aside__brand-tools">
                    <button class="kt-aside__brand-aside-toggler kt-aside__brand-aside-toggler--left" id="kt_aside_toggler"><span></span></button>
                </div>
            </div>
            <!-- end:: Aside Brand -->

            <!-- begin:: Aside Menu -->
            <div class="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid" id="kt_aside_menu_wrapper">
                <div id="kt_aside_menu" class="kt-aside-menu " data-ktmenu-vertical="1" data-ktmenu-scroll="1" data-ktmenu-dropdown-timeout="500">
                    <ul class="kt-menu__nav ">

                        <template v-for="(item,i) in menuItems">
                            <li v-if="item.section & $permission(item.permission)"  class="kt-menu__section">
                                <h4 class="kt-menu__section-text">{{item.title}}</h4>
                                <i :class="'kt-menu__section-icon'+ item.icon"></i>
                            </li>

                            <li v-if="!item.section & !item.nested.length & $permission(item.permission)" :class="activeRouteParse() === item.url ? 'kt-menu__item kt-menu__item--active' : 'kt-menu__item'" aria-haspopup="true">
                                <n-link :to="{ path: item.url }" class="kt-menu__link ">
                                    <i :class="'kt-menu__link-icon '+ item.icon"></i><span class="kt-menu__link-text">{{item.title}}</span>
                                </n-link>
                            </li>

                            <li v-if="!item.section & item.nested.length & $permission(item.permission)" :class="activeRouteParseItem() === nestedActiveRouteParse(activeRouteParseItem(), item.nested)  ? 'kt-menu__item  kt-menu__item--submenu kt-menu__item--open kt-menu__item--here' : 'kt-menu__item  kt-menu__item--submenu '"
                                aria-haspopup="true"
                                data-ktmenu-submenu-toggle="hover"
                            >
                                <a href="#" class="kt-menu__link kt-menu__toggle">
                                    <i :class="'kt-menu__link-icon '+ item.icon "></i>
                                    <span class="kt-menu__link-text">{{item.title}}</span>
                                    <i class="kt-menu__ver-arrow la la-angle-right"></i>
                                </a>
                                <div class="kt-menu__submenu "><span class="kt-menu__arrow"></span>
                                    <ul class="kt-menu__subnav">
                                        <li v-for="(nItem,ind) in item.nested" :class="activeRouteParseItem() === nItem.url ? 'kt-menu__item kt-menu__item--active' : 'kt-menu__item'" aria-haspopup="true">
                                            <n-link :to="{ path: nItem.url }" class="kt-menu__link"><i :class="'kt-menu__link-bullet '+ nItem.icon "><span></span></i>
                                                <span class="kt-menu__link-text">{{nItem.title}}</span>
                                            </n-link>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                        </template>

                        <!--<li :class="$route.path.split('/')[1] === '' ? 'kt-menu__item kt-menu__item&#45;&#45;active' : 'kt-menu__item'" aria-haspopup="true">-->
                            <!--<n-link :to="{ path: '/' }" class="kt-menu__link ">-->
                                <!--<i class="kt-menu__link-icon flaticon2-gear"></i><span class="kt-menu__link-text">Dashboard</span>-->
                            <!--</n-link>-->
                        <!--</li>-->
                       <!---->

                        <!--<li class="kt-menu__section ">-->
                            <!--<h4 class="kt-menu__section-text">Platform Api</h4>-->
                            <!--<i class="kt-menu__section-icon flaticon-more-v2"></i>-->
                        <!--</li>-->


                        <!--<li :class="$route.path.split('/')[1] !== '' ? 'kt-menu__item  kt-menu__item&#45;&#45;submenu kt-menu__item&#45;&#45;open kt-menu__item&#45;&#45;here' : 'kt-menu__item  kt-menu__item&#45;&#45;submenu '"-->
                            <!--aria-haspopup="true"-->
                            <!--data-ktmenu-submenu-toggle="hover"-->
                        <!--&gt;-->
                            <!--<a href="#" class="kt-menu__link kt-menu__toggle">-->
                                <!--<i class="kt-menu__link-icon flaticon2-graphic"></i>-->
                                <!--<span class="kt-menu__link-text">Items</span>-->
                                <!--<i class="kt-menu__ver-arrow la la-angle-right"></i>-->
                            <!--</a>-->
                            <!--<div class="kt-menu__submenu "><span class="kt-menu__arrow"></span>-->
                                <!--<ul class="kt-menu__subnav">-->
                                    <!--<li :class="$route.path.split('/')[1] === 'products' ? 'kt-menu__item kt-menu__item&#45;&#45;active' : 'kt-menu__item'" aria-haspopup="true">-->
                                        <!--<n-link :to="{ path: '/products' }" class="kt-menu__link"><i class="kt-menu__link-bullet kt-menu__link-bullet&#45;&#45;dot"><span></span></i>-->
                                            <!--<span class="kt-menu__link-text">Products</span>-->
                                        <!--</n-link>-->
                                    <!--</li>-->
                                <!--</ul>-->
                            <!--</div>-->
                        <!--</li>-->

                    </ul>
                </div>
            </div>
            <!-- end:: Aside Menu -->

            <!-- begin:: Aside Footer -->
           <!--  <div class="kt-aside__footer kt-grid__item" id="kt_aside_footer">
                <div class="kt-aside__footer-nav">
                    <div class="kt-aside__footer-item">
                        <a href="#" class="btn btn-icon"><i class="flaticon2-gear"></i></a>
                    </div>
                    <div class="kt-aside__footer-item">
                        <a href="#" class="btn btn-icon"><i class="flaticon2-cube"></i></a>
                    </div>
                    <div class="kt-aside__footer-item">
                        <a href="#" class="btn btn-icon"><i class="flaticon2-bell-alarm-symbol"></i></a>
                    </div>
                    <div class="kt-aside__footer-item">
                        <button type="button" class="btn btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="flaticon2-add"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-left">
                            <ul class="kt-nav">
                                <li class="kt-nav__section kt-nav__section--first">
                                    <span class="kt-nav__section-text">Export Tools</span>
                                </li>
                                <li class="kt-nav__item">
                                    <a href="#" class="kt-nav__link">
                                        <i class="kt-nav__link-icon la la-print"></i>
                                        <span class="kt-nav__link-text">Print</span>
                                    </a>
                                </li>
                                <li class="kt-nav__item">
                                    <a href="#" class="kt-nav__link">
                                        <i class="kt-nav__link-icon la la-copy"></i>
                                        <span class="kt-nav__link-text">Copy</span>
                                    </a>
                                </li>
                                <li class="kt-nav__item">
                                    <a href="#" class="kt-nav__link">
                                        <i class="kt-nav__link-icon la la-file-excel-o"></i>
                                        <span class="kt-nav__link-text">Excel</span>
                                    </a>
                                </li>
                                <li class="kt-nav__item">
                                    <a href="#" class="kt-nav__link">
                                        <i class="kt-nav__link-icon la la-file-text-o"></i>
                                        <span class="kt-nav__link-text">CSV</span>
                                    </a>
                                </li>
                                <li class="kt-nav__item">
                                    <a href="#" class="kt-nav__link">
                                        <i class="kt-nav__link-icon la la-file-pdf-o"></i>
                                        <span class="kt-nav__link-text">PDF</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="kt-aside__footer-item">
                        <a href="#" class="btn btn-icon"><i class="flaticon2-calendar-2"></i></a>
                    </div>
                </div>
            </div> -->
            <!-- end:: Aside Footer-->

        </div>
        <!-- end:: Aside -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                menuItems: [
                   {
                        title: 'Меню',
                        url: false,
                        section: true,
                        nested: false,
                        icon: 'flaticon-more-v2',
                        permission: ['*'],
                    },
                    {
                        title: 'Рабочий стол',
                        url: '/',
                        section: false,
                        nested: false,
                        icon: 'flaticon2-graphic',
                        permission: ['*'],
                    },
                    {
                        title: 'Пользователи',
                        url: '/web/users',
                        section: false,
                        nested: false,
                        icon: 'flaticon2-calendar-3',
                        permission: ['user_web_show', 'user_web_create', 'user_web_edit'],
                    },
                    

                    {
                        title: 'Меню',
                        url: false,
                        section: true,
                        nested: false,
                        icon: 'flaticon-more-v2',
                        permission: ['item_show', 'language_platform_show'],
                    },
                    {
                        title: 'Категории',
                        url: '/categories',
                        section: false,
                        nested: false,
                        icon: 'flaticon2-cube-1',
                        permission: ['*'],
                    },
                    {
                        title: 'Товары',
                        url: '/products',
                        section: false,
                        nested: false,
                        icon: 'flaticon2-cube-1',
                        permission: ['*'],
                    },
                    {
                        title: 'Заказы',
                        url: '/orders',
                        section: false,
                        nested: false,
                        icon: 'flaticon2-cube-1',
                        permission: ['*'],
                    },
                  
                 
                    
                    {
                        title: 'Системное',
                        url: false,
                        section: true,
                        nested: false,
                        icon: 'flaticon-more-v2',
                        permission: ['user_system_show', 'role_system_show', 'platform_system_show'],
                    },
                    {
                        title: 'Пользователи ',
                        url: '/system/users',
                        section: false,
                        nested: false,
                        icon: 'flaticon2-calendar-3',
                        permission: ['*'],
                    },
                ]
            };
        },

        methods: {
            activeRouteParse() {
                let route = this.$route.path.split('/');
                let result = '';
                if(route.length[1] === '') {
                    result = '';
                }
                if(route.length === 2 && route.length[1] !== '') {
                    result = '/' + route[1];
                }
                if(route.length >= 3) {
                    result = '/' + route[1] + '/' + route[2];
                }

                return result;
            },

            activeRouteParseItem() {
                let route = this.$route.path.split('/');
                let result = '';
                if(route.length[0] === '') {
                    result = '';
                }
                if(route.length === 1 && route.length[0] !== '') {
                    result = '/' + route[1];
                }
                if(route.length >= 2) {
                    result = '/' + route[1];
                }

                return result;
            },

            nestedActiveRouteParse(parsedActiveRoute, nestedItems) {
                let item = nestedItems.filter(p => p.url == parsedActiveRoute)
                if(item[0]){
                    return item[0].url
                } else {
                    return false
                }
            }
        }

    }
</script>

<style scoped>

</style>
