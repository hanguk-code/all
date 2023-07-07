<script>
    import {Line} from 'vue-chartjs';

    export default {
        extends: Line,
        data() {
            return {
                data: []
            }
        },
        async mounted () {
            this.data = (await this.$axios.get(process.env.apiWebUrl + `/adm/statistic/get`)).data.data.chart_date;
            const days = []

            for(let index in this.data) {
                const day = this.data[index]
                days.push(day)
            }
            this.renderChart({
                labels: [
                    'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'
                ],
                datasets: [
                    {
                        label: 'Статистика посещений по дням',
                        backgroundColor: '#f87979',
                        data: days
                    }
                ]
            }, {responsive: true, maintainAspectRatio: false})
        }
    }
</script>