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
          const firstCharacter = this.empUser.charAt(0)

          if(firstCharacter === 'w' || 'W')
          {
            console.log(this.empUser)
            console.log(this.empPassword)
            window.location.href = '/views/warehouseDash.html';
          }
          else if(firstCharacter === 'r' || 'R')
          {
            window.location.href = '/views/index.html';
          }
          else
          {
            console.log("please enter a valid username")
          }
          
        },
        login2() {
          // Handle login for Page 2
          window.location.href = '/views/adminDash.html';
        }
      },
  }).mount('#toggleLogin');
  });