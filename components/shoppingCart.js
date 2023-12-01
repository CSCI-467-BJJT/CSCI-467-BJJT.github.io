$(document).ready(function () {
  const cart = Vue.createApp({
    data() {
      return {
        cartTotal: 0
      }
    },
    template: `
    <div class="cart">
      <p>Hello</p>
    </div>
    `
  }).mount('#cart');
});