<template>
  <!-- begin:: Page -->
  <div class="kt-grid kt-grid--ver kt-grid--root">
    <div class="kt-error404-v1">
      <div class="kt-error404-v1__content">
        <div class="kt-error404-v1__title">{{error.statusCode}}</div>
        <div class="kt-error404-v1__desc"><strong>OOPS!</strong> {{error.message}}</div>
        <n-link :to="{ path: '/' }"  class="kt-error404-v4__button btn btn-pill btn-glow btn-lg btn-widest">Вернуться на главную</n-link>

      </div>
      <div class="kt-error404-v1__image">
        <img src="/assets/media/misc/404-bg1.jpg" class="kt-error404-v1__image-content" alt="" title="" />
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        layout: 'errorLayout',
        components: {

        },
        props: {
            error: {
                type: Object,
                default: () => {}
            }
        },
        head() {
            return {
                title: this.error.message || 'Something went wrong here'
            }
        }
    }
</script>

<style scoped>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.25s ease;
  }

  .page-enter,
  .page-leave-active {
    opacity: 0;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .kt-error404-v1 {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; }
  @media (max-width: 768px) {
    .kt-error404-v1 {
      padding: 2rem;
      align-items: stretch; } }
  .kt-error404-v1 .kt-error404-v1__content {
    display: flex;
    justify-content: flex-start;
    flex-direction: column; }
  @media (max-width: 768px) {
    .kt-error404-v1 .kt-error404-v1__content {
      justify-content: center;
      align-items: center; } }
  .kt-error404-v1 .kt-error404-v1__content .kt-error404-v1__title {
    font-size: 12rem;
    color: #fb2f73;
    font-weight: 700; }
  .kt-error404-v1 .kt-error404-v1__content .kt-error404-v1__desc {
    font-size: 1.5rem; }
  .kt-error404-v1 .kt-error404-v1__image {
    width: 50%;
    position: relative; }
  @media (max-width: 768px) {
    .kt-error404-v1 .kt-error404-v1__image {
      width: 100%;
      flex-basis: 100%; } }
  .kt-error404-v1 .kt-error404-v1__image .kt-error404-v1__image-content {
    width: 100%; }
  .kt-error404-v1 .kt-error404-v1__content .kt-error404-v4__button {
    color: #ffffff;
    background-color: #f7098f; }
  .kt-error404-v1 .kt-error404-v1__content .kt-error404-v4__button:hover {
    color: #ffffff; }
</style>
