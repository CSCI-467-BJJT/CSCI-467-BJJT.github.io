$(document).ready(function () {
    const toggle = Vue.createApp({
      data() {
        return {
            checkbox: false,
            empUser: null,
            empPassword: null,
            adminUser: null,
            adminPassword: null,
            loggedIn: null,
        }
      },
      methods: {
        toggleCheckbox() {
            this.checkbox = !this.checkbox;
        },
        login1() {
          //Handle login for Page 1
          this.loggedIn = true;
          console.log(this.empUser)
          console.log(this.empPassword)
          window.location.href = '/views/warehouseDash.html';
          
        },
        login2() {
          // Handle login for Page 2
          this.loggedIn = true;
          console.log(this.adminUser)
          console.log(this.adminPassword)
          window.location.assign('/views/adminDash.html');
        }
      },
  }).mount('#toggleLogin');
  });