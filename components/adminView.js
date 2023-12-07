$(document).ready(function () {
    Vue.createApp({
      data() {
        return {
          orders
        };
  
      },

  
      created() {
        (async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/adminOC');
          let results = response.data;
  
          for (let i = 0; i < results.length; i++) {
            this.orders[i] = results[i];
        }
  
        } catch (error) {
          console.log('Error adding orders to admin view', error);
        }
    })();
  
    },
  }).mount('#adminView');
  });
