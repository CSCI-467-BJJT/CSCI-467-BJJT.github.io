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
      addCart: function(name, quantity, price, img, partNum, weight) {
        const part = 
        {
          name: name,
          quantity: quantity,
          price: Number(price),
          img: img,
          partNum: partNum,
          weight: weight

        };

        this.cartItems.push(part);
        this.transfer(this.cartItems);
      },

      transfer: async function(cart){
        try {
            const response = await axios.post('http://localhost:3000/api/cart', Array.from(cart), {
            headers: {
              'Content-Type': 'application/json',
          },
        });
            console.log("response:", response.data);
        } catch(error){
            console.error("Error transfering cart to backend", error);
          }
     },
    },  

    created() {
      (async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/collect');
        let parts = response.data;

        for (let i = 0; i < parts.length; i++) {
          this.products.push(parts[i]);
          this.$forceUpdate();
          this.cartTotal += parts[i].price;
      }

      console.log(this.products);
      } catch (error) {
        console.log('Error adding item to cart: ', error);
      }
  })();

  },
}).mount('#cardProducts');
});
