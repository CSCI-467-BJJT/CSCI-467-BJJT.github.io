$(document).ready(function () {
  const cart = Vue.createApp({
    data() {
      return {
        cartItems,
        cartTotal: 0,
      }
    },

    computed: {
      total() {
        return this.getPrice(this.cartItems);
      }
    },

    watch: {
      cartItems: {
        handler: function () {
          this.cartTotal = this.total;
        },
        deep: true,
      },
    },

    template: `
    <div class="card border-0">
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="items in cartItems">
              <th scope="row">
                <div class="d-flex align-items-center">
                  <div class="flex-column ms-4">
                    <p class="mb-2">{{ items.name }}</p>
                  </div>
                </div>
              </th>
              <td class="align-middle">
                <div class="d-flex flex-row">
                  <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    <i class="fas fa-minus"></i>
                  </button>

                  <input id="form1" min="0" name="quantity" v-model="items.quantity" :value="items.quantity" type="number"
                    class="form-control form-control-sm" style="width: 50px;" />

                  <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </td>
              <td class="align-middle">
                <p class="mb-0" style="font-weight: 500;">\${{ items.price * items.quantity }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card-footer bg-transparent border-0 mx-auto" id="cart">
        <a href="/views/checkout.html">
          <button type="button" class="btn btn-primary btn-block btn-lg">Checkout \${{ cartTotal.toFixed(2) }}</button>
        </a>
      </div>

    </div>
    `,

    methods: {
      getPrice: function (cart) {
      let cartTotal = 0;

      for (var i = 0; i < cart.length; i++) {
        cartTotal += cart[i].price * cart[i].quantity;
      }
      return cartTotal
      },
    },

    created() {
      this.cartTotal = this.getPrice(this.cartItems);
    },
}).mount('#cart');
});