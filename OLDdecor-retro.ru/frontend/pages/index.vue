<template>
  <section class="content" id="content">

  	<n-link :to="{ name: 'checkout-cart' }" title="Корзина" v-if="cartData">
		<div class="mycart-container">
			<div class="mycart"></div>
			<div class="mycart-button"> {{cartData.price }} руб.(1)</div>
		</div>
	</n-link>

	<div id="modal-1" class="modal-1" style="display: none;">
	<h3>
		Написать нам
	</h3>
	<form action="#">
		<label>Ваше имя:</label>
		<input type="text" name="name">
		<label>Ваш E-Mail:</label>
		<input type="email" name="email">
		<label>Ваш вопрос:</label>
		<textarea name="question" rows="10">
			
		</textarea>
		<button type="submit">
			Отправить
		</button>
	</form>
	</div>

	<div class="container" v-if="!$fetchState.pending">
		<div class="img-vector">
			<img src="/img/vector-left.png" alt="">
			<img src="/img/vector-right.png" alt="">
			<img src="/img/vector-left-bot.png" alt="">
			<img src="/img/vector-bot-right.png" alt="">
		</div>
		<MenuMobile />   							
		<div class="row d-none d-lg-flex">
			<Menu />   
		</div>
		<div class="row">
			<div class="col-sm-4 col-md-3">
				<ul class="left-menu d-none d-lg-block">
					<li v-for="cat, index in categories">
						<n-link :to="cat.url" class="open-submenu menu__dropdown">
								{{cat.name}}
							<img src="/img/minus.png" alt="">
						</n-link>
						<ul class="sub-menu" :style="showChild(cat.url,index)">
							<li v-for="catChild, indexChild in cat.children">
								<n-link :to="catChild.url">
									  {{catChild.name}}
								</n-link>
							</li>
						</ul>
					</li>
				</ul>
				<div class="left-news">
					<h2>
						Новинки
					</h2>
					<div class="product" v-for="product, index in newProducts">
						<!-- <div class="product__head">
							<img :src="product.image_url" :alt="product.name">
						</div> -->
						<div class="product__content">
							<img :src="'http://193.169.179.233/image/'+product.image_url" alt="" :data-image="'http://193.169.179.233/image/'+product.image_url" :data-zoom-image="'http://193.169.179.233/image/'+product.image_url" 
							class="zoom_01"
							>
							<img src="/img/new-st-1.png" alt="Новинка" class="product__head_top-right">
						</div>
						<div class="product__price">
							<span>
								{{product.price}}Р
							</span>
							<span>
								Арт: {{product.article}}
							</span>
						</div>
						<div class="product__link">
							<n-link :to="product.url">
								{{product.name}}
							</n-link>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-8 col-md-9">
				<n-link to="/products/all" class="all-catalog">
					Показать весь ассортимент товара
				</n-link>
				<div class="catalog">
					<n-link :to="cat.url" class="catalog__card" v-for="cat, index in categories">
						<div class="catalog__image">
							<img :src="'http://193.169.179.233/image/'+cat.image_url" :alt="cat.name">
						</div>
						<div class="catalog__text">
							{{cat.name}}
						</div>
					</n-link>
				</div>
				<div class="content-info">
					<h2>
						Заголовок для текст
					</h2>
					<p>
						Как жаль, что современный мир с его прогрессами, социальными нормами и темпами жизни заставляет нас забыть о самом главном – о нашей личности. Так сегодня женщина просто вынуждена порой утрачивать свою природную женственность. Речь идет об одежде, которою мы обычно надеваем на работе и дома, и даже в гостях и на праздники. Брюки, джинсы, рубашки и футболки – это стало не только мужским, но и женским стандартом. А ведь существует одежда, которая предназначена именно для прекрасного пола. Она подчеркивает
					</p>
					<a href="#">
						Читать далее
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
</template>

<script>
	import { mapGetters } from 'vuex'

    import MenuMobile from '~/components/Menu/MenuMobile'
    import Menu from '~/components/Menu/Menu'

    export default {
      components: {
        MenuMobile,
        Menu
      },
        head: {
    		bodyAttrs: {
      			class: 'main-page'
    		},
    		title: 'Главная Декор Ретро',
    		meta: [
    		 		
                    // {
                    //     //hid: 'description',
                    //     name: 'description',
                    //     content: this.productData.product.seo.seo_description,
                    // },
                    // {
                    //     //hid: 'keywords',
                    //     name: 'keywords',
                    //     content: this.productData.product.seo.seo_keywords,
                    // },

            ],
  		},
  		  data() {
            return {
                categories: [],
                newProducts: [],

                mainCat: 'farfor-fayans-keramika',
            	showChildren: 'display: block;',

                loading: false
            };
        },
        computed: {
            ...mapGetters({
                cartData: 'item/cartData'
            }),
        },
  		async fetch() {
             await this.getCategories()
             await this.getNewProducts()
        },

        methods: {
        	async getCategories() {
                const {data} = await this.$axios.get(
                    `/categories`
                ).catch(() => {
                    //this.$nuxt.error({statusCode: 404, message: 'Oops! Something went wrong!'})
                });
                this.categories = data.data
            },

            async getNewProducts() {
                const {data} = await this.$axios.get(
                    `/new/products`
                ).catch(() => {
                    //this.$nuxt.error({statusCode: 404, message: 'Oops! Something went wrong!'})
                }); //
                this.newProducts = data.data
                console.log(this.newProducts)
            },

            showChild(url, index) {
            		let urlSplit = url.split('/')
            			if(urlSplit[1] === this.mainCat) {
            				return 'display: block;'	
            			} else {
            				//return 'display: none;'
            			}
            			
            	},
        }
    }
</script>

<style scoped>

</style>
