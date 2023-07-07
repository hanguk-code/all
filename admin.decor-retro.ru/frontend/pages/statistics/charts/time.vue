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
            this.data = (await this.$axios.get(process.env.apiWebUrl + `/adm/statistic/get`)).data.data.chart_time;
            const time = []

            for(let index in this.data) {
                const hour = this.data[index]
                time.push(hour)
            }

            this.renderChart({
                labels: [
                    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
                    '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
                    '22:00', '23:00'
                ],
                datasets: [
                    {
                        label: 'Статистика посещений по времени',
                        backgroundColor: '#6cc100',
                        data: time
                    }
                ]
            }, {responsive: true, maintainAspectRatio: false})
        },
    }
</script>