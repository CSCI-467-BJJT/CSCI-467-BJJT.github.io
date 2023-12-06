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
          window.location.href = 'employeeDash.html';
        },
        login2() {
          // Handle login for Page 2
          window.location.href = 'adminDash.html'
        }
      },
  }).mount('#toggleLogin');
  });