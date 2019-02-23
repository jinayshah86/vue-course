var app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        image: "./assets/socks-green.jpg",
        inStock: true,
        details: [
            "80% cotton",
            "20% polyester",
            "Gender-neutral",
        ],
        variants: [
            {
                variantId: 3108,
                variantColor: "green"
            },
            {
                variantId: 3109,
                variantColor: "blue"
            }
        ]
    }
});