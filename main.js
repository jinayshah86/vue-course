var app = new Vue({
    el: '#app',
    data: {
        brand: "Mickey",
        product: "Socks",
        selectedVariant: 0,
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
                variantImage: "./assets/socks-green.jpg",
                variantQuantity: 10,
            },
            {
                variantId: 3109,
                variantColor: "blue",
                variantImage: "./assets/socks-blue.jpg",
                variantQuantity: 0
            }
        ]
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        }
    }

});