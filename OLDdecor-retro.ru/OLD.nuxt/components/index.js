export { default as Archive } from '../../frontend/components/Archive.vue'
export { default as Catalog } from '../../frontend/components/Catalog.vue'
export { default as Category } from '../../frontend/components/Category.vue'
export { default as Contacts } from '../../frontend/components/Contacts.vue'
export { default as Delivery } from '../../frontend/components/Delivery.vue'
export { default as Footer } from '../../frontend/components/Footer.vue'
export { default as Header } from '../../frontend/components/Header.vue'
export { default as News } from '../../frontend/components/News.vue'
export { default as Product } from '../../frontend/components/Product.vue'
export { default as ProductAll } from '../../frontend/components/ProductAll.vue'
export { default as ProductNew } from '../../frontend/components/ProductNew.vue'
export { default as Menu } from '../../frontend/components/Menu/Menu.vue'
export { default as MenuMobile } from '../../frontend/components/Menu/MenuMobile.vue'

export const LazyArchive = import('../../frontend/components/Archive.vue' /* webpackChunkName: "components/Archive" */).then(c => c.default || c)
export const LazyCatalog = import('../../frontend/components/Catalog.vue' /* webpackChunkName: "components/Catalog" */).then(c => c.default || c)
export const LazyCategory = import('../../frontend/components/Category.vue' /* webpackChunkName: "components/Category" */).then(c => c.default || c)
export const LazyContacts = import('../../frontend/components/Contacts.vue' /* webpackChunkName: "components/Contacts" */).then(c => c.default || c)
export const LazyDelivery = import('../../frontend/components/Delivery.vue' /* webpackChunkName: "components/Delivery" */).then(c => c.default || c)
export const LazyFooter = import('../../frontend/components/Footer.vue' /* webpackChunkName: "components/Footer" */).then(c => c.default || c)
export const LazyHeader = import('../../frontend/components/Header.vue' /* webpackChunkName: "components/Header" */).then(c => c.default || c)
export const LazyNews = import('../../frontend/components/News.vue' /* webpackChunkName: "components/News" */).then(c => c.default || c)
export const LazyProduct = import('../../frontend/components/Product.vue' /* webpackChunkName: "components/Product" */).then(c => c.default || c)
export const LazyProductAll = import('../../frontend/components/ProductAll.vue' /* webpackChunkName: "components/ProductAll" */).then(c => c.default || c)
export const LazyProductNew = import('../../frontend/components/ProductNew.vue' /* webpackChunkName: "components/ProductNew" */).then(c => c.default || c)
export const LazyMenu = import('../../frontend/components/Menu/Menu.vue' /* webpackChunkName: "components/Menu/Menu" */).then(c => c.default || c)
export const LazyMenuMobile = import('../../frontend/components/Menu/MenuMobile.vue' /* webpackChunkName: "components/Menu/MenuMobile" */).then(c => c.default || c)
