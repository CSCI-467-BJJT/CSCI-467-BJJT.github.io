$(document).ready(function () {
  const cart = Vue.createApp({
    data() {
      return {
        cartTotal: 0
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
            <tr>
              <th scope="row">
                <div class="d-flex align-items-center">
                  <div class="flex-column ms-4">
                    <p class="mb-2">Engine Block</p>
                  </div>
                </div>
              </th>
              <td class="align-middle">
                <div class="d-flex flex-row">
                  <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    <i class="fas fa-minus"></i>
                  </button>

                  <input id="form1" min="0" name="quantity" value="2" type="number"
                    class="form-control form-control-sm" style="width: 50px;" />

                  <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </td>
              <td class="align-middle">
                <p class="mb-0" style="font-weight: 500;">$750.00</p>
              </td>
            </tr>
            <tr>
              <th scope="row" class="border-bottom-0">
                <div class="d-flex align-items-center">
                  <div class="flex-column ms-4">
                    <p class="mb-2">Oil Pan</p>
                  </div>
                </div>
              </th>
              <td class="align-middle border-bottom-0">
                <div class="d-flex flex-row">
                  <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    <i class="fas fa-minus"></i>
                  </button>

                  <input id="form1" min="0" name="quantity" value="1" type="number"
                    class="form-control form-control-sm" style="width: 50px;" />

                  <button class="btn btn-link px-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </td>
              <td class="align-middle border-bottom-0">
                <p class="mb-0" style="font-weight: 500;">$120.00</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card-footer bg-transparent border-0 mx-auto">
        <button type="button" class="btn btn-primary btn-block btn-lg">Checkout $820.00</button>
      </div>

    </div>
    `
  }).mount('#cart');
});