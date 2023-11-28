$(document).ready(function () {
    const products = Vue.createApp({
      data() {
        return {
          products: [
            {
              name: "Car Part",
              img: "/assets/car-engine.jpeg",
              description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
              price: 250
            },
            {
              name: "Car Part",
              img: "/assets/car-engine.jpeg",
              description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
              price: 250
            },
            {
              name: "Car Part",
              img: "/assets/car-engine.jpeg",
              description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
              price: 250
            },
            {
              name: "Car Part",
              img: "/assets/car-engine.jpeg",
              description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
              price: 250
            },
            {
              name: "Car Part",
              img: "/assets/car-engine.jpeg",
              description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
              price: 250
            },
            {
              name: "Car Part",
              img: "/assets/car-engine.jpeg",
              description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
              price: 250
            },
            {
              name: "Car Part",
              img: "/assets/car-engine.jpeg",
              description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
              price: 250
            },
            {
              name: "Car Part",
              img: "/assets/car-engine.jpeg",
              description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
              price: 250
            },
          ]
        };
      }
    }).mount('#cardProducts');
  });