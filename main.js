var app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        image: "./assets/socks-green.jpg",
        inStock: true,
        cart: 0,
        details: [
            "80% cotton",
            "20% polyester",
            "Gender-neutral",
        ],
        variants: [
            {
                variantId: 3108,
                variantColor: "green",
                variantImage: "./assets/socks-green.jpg"
            },
            {
                variantId: 3109,
                variantColor: "blue",
                variantImage: "./assets/socks-blue.jpg"
            }
        ]
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(image) {
            this.image = image
        }
    }

});