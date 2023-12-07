$(document).ready(function () {
    Vue.createApp({
      data() {
        return {
          orders: [],
          modalData: []
        };
  
      },

      methods: {
        viewOrder: async function(orderId) {
            try {
              const response = await axios.post('http://localhost:3000/api/orderItems', {
                orderId: orderId,
              });

              this.modalData = this.orders[orderId-1];

              console.log(response.data);
            } catch (error) {
              console.error(error.message);
            }
        },

      },
  
      created() {
        (async () => {
        try {
          console.log("made it to created");
          const response = await axios.get('http://localhost:3000/api/adminOC');
          this.orders = response.data;
          console.log(response.data);
        }
         catch (error) {
          console.log('Error adding orders to admin view', error);
        }
    })();
  
    },
  }).mount('#adminView');
  });
