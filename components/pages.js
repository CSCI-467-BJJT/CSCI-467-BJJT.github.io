$(document).ready(function () {
    const pages = Vue.createApp({
      data() {
        return {
          activePage: 0,
          pages: [
            {
              link: {text: 'Home', url: 'index.html'},
              pageTitle: 'Wheely Good Auto Parts',
              content: 'Welcome, we have wheely good car parts :3'
            },
            {
              link: {text: 'Employee', url: 'employeeLogin.html'},
              pageTitle: 'Employee Page',
              content: 'This is an employee sign in page'
            },
          ]
        };
      }
    }).mount('#pages');
  });