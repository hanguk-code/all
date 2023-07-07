<template>
    <!-- begin:: Subheader -->
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-container  kt-container--fluid ">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">{{title | capitalize}}</h3>
                <span class="kt-subheader__separator kt-hidden"></span>
                <div class="kt-subheader__breadcrumbs">
                    <n-link :to="{ path: '/' }" class="kt-subheader__breadcrumbs-home"><i class="flaticon2-shelter"></i></n-link>

                    <template v-for="(item, i) in items">
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <n-link :to="{ name: item.name, params: item.params }" class="kt-subheader__breadcrumbs-link">
                        {{item.title | capitalize}} </n-link>
                    </template>

                </div>
            </div>

            <div class="kt-subheader__toolbar">
                <div class="kt-subheader__wrapper">
                    <a href="#" class="btn btn-sm btn-elevate btn-brand btn-elevate" id="kt_dashboard_daterangepicker" data-toggle="kt-tooltip" title="" data-placement="left" data-original-title="Йо! Это я, сегодняшняя дата!">
                        <span class="kt-opacity-7" id="kt_dashboard_daterangepicker_title">Сегодня:</span>&nbsp;
                        <span class="kt-font-bold" id="kt_dashboard_daterangepicker_date">{{ monthName }} {{ day }}</span>
                        <i class="flaticon-calendar-with-a-clock-time-tools kt-padding-l-5 kt-padding-r-0"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <!-- end:: Subheader -->
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '',
            },
            items: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                monthName: '',
                day: '',
            }
        },
        mounted() {
            const monthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
                "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
            ];

            const d = new Date();
            this.monthName = monthNames[d.getMonth()];
            this.day = d.getDate();
        }
    }
</script>

<style scoped>

</style>
