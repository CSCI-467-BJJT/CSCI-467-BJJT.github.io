$(document).ready(function () {
    const toggle = Vue.createApp({
      data() {
        return {
            checkbox: false,
            empUser: '',
            empPassword: '',
            adminUser: '',
            adminPassword: '',
            loggedinUser: null
        }
      },
      // computed: {
      //   classObject() {
      //       return {
      //           'Employee': !this.checkbox,
      //           'Admin': this.checkbox,

      //       }
      //   }
      // },
      methods: {
        toggleCheckbox() {
            this.checkbox = !this.checkbox;
        },
        login1() {
          // Handle login for Page 1
          if(empUser[0] == 'w' || 'W')
          {
            window.location.href = 'employeeDash.html';
          }
          else if(empUser[0] == 'r' || 'R')
          {
            
          }
          
        },
        login2() {
          // Handle login for Page 2
          window.location.href = 'adminDash.html'
        }
      },
  }).mount('#toggleLogin');
  });