$(document).ready(function () {

  Vue.createApp({
    data() {
      return {
        products
      };

    },

    methods: {
      async addCart(name) {
        console.log(name);
        try {
          const response = await axios.get('http://localhost:3000/api/data');
          this.responseData = response.data;
        } catch (error) {
          console.log('Error adding item to cart: ', error);
        }
      },
    },

    created() {
      (async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/collect');
        let parts = response.data;
        console.log("made it here");
        for (let i = 0; i < parts.length; i++) {
  //        console.log(parts[i]);
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