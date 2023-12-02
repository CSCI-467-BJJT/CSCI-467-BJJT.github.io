$(document).ready(function () {
    const nav = Vue.createApp({
      data() {
        return {
          //activePage: 0,
          links: [
            {text: 'Home', url: '/views/index.html'},
            {text: 'Employee', url: '/views/employeeLogin.html'}
          ]
          // pages: [
          //   {
          //     link: {text: 'Home', url: 'index.html'},
          //     pageTitle: 'Wheely Good Auto Parts',
          //     content: 'Welcome, we have wheely good car parts :3'
          //   },
          //   {
          //     link: {text: 'Employee', url: '/employeeLogin.html'},
          //     pageTitle: 'Employee Page',
          //     content: 'This is an employee sign in page'
          //   },
          // ]
        };
      }
    }).mount('#navbarComponents');
  });