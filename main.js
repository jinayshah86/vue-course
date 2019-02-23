Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `        
        <div class="product">

            <div class="product-image">
                <img :src="image">
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>

                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <!--@ substitute for v-on-->
                <div v-for="(variant, index) in variants"
                     :key="variant.variantId"
                     class="color-box"
                     :style="{ backgroundColor: variant.variantColor }"
                     @mouseover="updateProduct(index)">
                </div>

                <button @click="addToCart"
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }">
                    Add to Cart
                </button>

            </div>

        </div>
`,

    data() {
        return {
            brand: "Mickey",
            product: "Socks",
            selectedVariant: 0,
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
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
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
        },
        shipping() {
            console.log(this.premium)
            if (this.premium) {
                return "Free"
            } else {
                return "$2.99"
            }
        }
    }
})
var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: [],
    },
    methods: {
        updateCart(variantId) {
            this.cart.push(variantId)
        },
    }
});