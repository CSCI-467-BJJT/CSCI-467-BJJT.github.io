$(document).ready(function () {
  const cart = Vue.createApp({
    data() {
      return {
        cartTotal: 0,
        cartItems: [
          {name: 'Engine Block', quantity: '2', price: 100.87},
          {name: 'Seat', quantity: '1', price: 350.53}
        ]
      }
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

                  <input id="form1" min="0" name="quantity" :value="items.quantity" type="number"
                    class="form-control form-control-sm" style="width: 50px;" />

                  <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </td>
              <td class="align-middle">
                <p class="mb-0" style="font-weight: 500;">\${{ items.price }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card-footer bg-transparent border-0 mx-auto">
        <button type="button" class="btn btn-primary btn-block btn-lg">Checkout \${{ cartTotal }}</button>
      </div>

    </div>
    `,
    methods() {

    }
  }).mount('#cart');
});