$(document).ready(function () {
    const toggle = Vue.createApp({
      data() {
        return {
            checkbox: false,
            empUser: '',
            empPassword: '',
            adminUser: '',
            adminPassword: ''
        }
      },
      computed: {
        classObject() {
            return {
                'Employee': !this.checkbox,
                'Admin': this.checkbox,

            }
        }
      },
      methods: {
        toggleCheckbox() {
            this.checkbox = !this.checkbox;
        },
        login1() {
          // Handle login for Page 1
          console.log('Login Page 1:', this.username1, this.password1);
        },
        login2() {
          // Handle login for Page 2
          console.log('Login Page 2:', this.username2, this.password2);
        }
      },
  }).mount('#toggleLogin');
  });