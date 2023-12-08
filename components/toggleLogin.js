$(document).ready(function () {
    const toggle = Vue.createApp({
      data() {
        return {
            //checkbox: false,
            selectedLogin: 'login1',
            empUser: null,
            empPassword: null,
            adminUser: null,
            adminPassword: null,
            loggedIn: null,
        }
      },
      computed: {
        pageTitle() {
          if (this.selectedLogin === 'login1') {
            return 'Warehouse';
          } else if (this.selectedLogin === 'login2') {
            return 'Receiving';
          } else if (this.selectedLogin === 'login3') {
            return 'Admin';
          }
          return '';
        },
      },
      methods: {
        login1() {
          //Handle login for Page 1 Warehouse
          this.loggedIn = true;
          console.log(this.empUser)
          console.log(this.empPassword)
          window.location.href = '/views/warehouseDash.html';
          
        },
        login2() {
          // Handle login for Page 2 Receiving
          this.loggedIn = true;
          console.log(this.empUser)
          console.log(this.empPassword)
          window.location.href = '/views/receivingDash.html'
        },
        login3() {
          // Handle login for Page 3 Admin
          this.loggedIn = true;
          console.log(this.adminUser)
          console.log(this.adminPassword)
          window.location.assign('/views/adminDash.html');
        },
      },
  }).mount('#toggleLogin');
  });