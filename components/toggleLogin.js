$(document).ready(function () {
    const toggle = Vue.createApp({
      data() {
        return {
            checkbox: false,
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
        }
      },
  }).mount('#toggleLogin');
  });