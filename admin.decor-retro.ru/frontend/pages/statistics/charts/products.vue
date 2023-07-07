<script>
    import {Bar} from 'vue-chartjs';

    export default {
        extends: Bar,
        data() {
            return {
                data: []
            }
        },
        async mounted () {
            this.data = (await this.$axios.get(process.env.apiWebUrl + `/adm/statistic/get`)).data.data.chart_products;
            const products = []

            for(let index in this.data) {
                const product = this.data[index]
                products.push(product)
            }
            this.renderChart({
                labels: [
                    '0-10 т.р.', '10-25 т.р.', '25-75 т.р.', 'Выше 75 т.р.'
                ],
                datasets: [
                    {
                        label: 'Статистика посещений по времени',
                        backgroundColor: '#5d78ff',
                        data: products
                    }
                ]
            }, {responsive: true, maintainAspectRatio: false})
        }
    }
</script>