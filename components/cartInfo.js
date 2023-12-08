$(document).ready(function () {
    Vue.createApp({
      data() {
        return {
          cartTotal,
          cartItems,
        };
  
      },

  
      created() {
        (async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/obtainCart');
          let parts = (response.data).cart;
          let total = (response.data).shippingtotal;
          for (let i = 0; i < parts.length; i++) {
            this.cartItems[i] = parts[i];
            this.cartTotal += (parts[i].price * parts[i].quantity);
        }
          this.cartTotal += total;
  
        } catch (error) {
          console.log('Error collecting cart info', error);
        }
    })();
  
    },
  }).mount('#cartInfo');
  });
