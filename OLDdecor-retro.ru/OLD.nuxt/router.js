import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9941c1aa = () => interopDefault(import('../frontend/pages/checkout/cart.vue' /* webpackChunkName: "pages/checkout/cart" */))
const _4b316b34 = () => interopDefault(import('../frontend/pages/index.vue' /* webpackChunkName: "pages/index" */))
const _4ffda941 = () => interopDefault(import('../frontend/pages/_.vue' /* webpackChunkName: "pages/_" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/checkout/cart",
    component: _9941c1aa,
    name: "checkout-cart"
  }, {
    path: "/",
    component: _4b316b34,
    name: "index"
  }, {
    path: "/*",
    component: _4ffda941,
    name: "all"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
