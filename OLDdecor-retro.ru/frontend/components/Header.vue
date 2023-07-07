<template>
<header class="header">
  <div class="container">
    <div class="row d-flex d-lg-none">
      <div class="col-5 d-flex align-items-center">
        <n-link :to="{name: 'index'}">
          <img src="/img/logo.png" alt="" class="header-logo">
        </n-link>
      </div>
      <div class="col-7 d-flex justify-content-center">
        <n-link :to="{name: 'index'}" class="logo-main">
          <img src="/img/logo2.png" alt="">
        </n-link>
      </div>
      <div class="col-12 d-flex flex-column justify-content-center align-items-center">
        <a href="tel:89067894567" class="header-phone">
          8 (906) <span>789 45 67</span>
        </a>
        <a href="#modal-1" class="btn-header">
          Заказать звонок
        </a>
        <div id="search" class="search">
          <input type="text" name="search" placeholder="Поиск" value="" />
              <a class="button-search">&nbsp;&nbsp;&nbsp;</a>
          </div>
      </div>
    </div>
    <div class="row d-none d-lg-flex">
      <div class="col-lg-3 d-flex align-items-center">
        <n-link :to="{name: 'index'}">
          <img src="/img/logo.png" alt="" class="header-logo">
        </n-link>
      </div>
      <div class="col-lg-6">
        <n-link :to="{name: 'index'}" class="logo-main">
          <img src="/img/logo2.png" alt="">
        </n-link>
      </div>
      <div class="col-lg-3 d-flex flex-column justify-content-center align-items-end p-0">
        <a href="tel:89067894567" class="header-phone">
          8 (906) <span>789 45 67</span>
        </a>
        <a href="#modal-1" class="btn-header">
          Заказать звонок
        </a>
        <div id="search" class="search">
        <!--   <input type="text" name="search" placeholder="Поиск" value="" /> -->
          <el-select
                                                v-model="searchProduct"
                                                filterable
                                                remote
                                                reserve-keyword
                                                placeholder="Поиск"
                                                :remote-method="remoteMethod"
                                                >
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item">
                                                    <span style="float: left"><img :src="'http://193.169.179.233/image/'+item.image" width="40px"> id: {{item.product_id}}</span>
                                                    <span style="float: right; color: #8492a6; font-size: 13px"> {{ item.name }} | Цена: {{item.price}} </span>
                                                </el-option>
                                            </el-select>
              <a class="button-search">&nbsp;&nbsp;&nbsp;</a>
          </div>
      </div>
    </div>
  </div>
</header>
</template>

<script>
    export default {
       data() {
          return {
            searchProduct: '',
              queryProducts: '',
              options: [],
          }
        },


    methods: {

      remoteMethod(query) {
                if (query !== '') {
                    //this.loading = true;
                    setTimeout(() => {

                        this.$axios.get('/search/products', {params: { search: query }})
                            .then(response => {
                                let data = response.data.data;
                                this.options = data

                            })
                            .catch(errors => {
                                console.log(errors);
                            })
                            .finally(() => {
                                //this.loading = false;
                            });
                    }, 200);
                } else {
                    this.options = [];
                }
            },
    }
        
    }
</script>

<style scoped>

</style>