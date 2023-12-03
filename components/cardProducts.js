$(document).ready(function () {

  Vue.createApp({
    data() {
      return {
        products,
        cartTotal,
        cartItems,
      };

    },

    methods: {
      addCart: function(name, quantity, price) {
        console.log(name, quantity, price);
        const part = [];
        part["name"] = name;
        part["quantity"] = quantity;
        part["price"] = Number(price)

        this.cartItems.push(part);
      },
    },

    created() {
      (async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/collect');
        let parts = response.data;
        console.log("made it here");
        for (let i = 0; i < parts.length; i++) {
          this.products.push(parts[i]);
          this.$forceUpdate();
      }

      console.log(this.products);
      } catch (error) {
        console.log('Error adding item to cart: ', error);
      }
  })();

  },
}).mount('#cardProducts');
});