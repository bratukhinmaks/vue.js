Vue.component('product',{
    props:{
        premium:{
            type:Boolean,
            required:true,
        }
    },
    template:
        `    <div class="row">
        <div class="col-12 col-md-6 col-lg-7 product-main">
            <div class="product-image">
                <img class="img-fluid" :src="image" alt="">
            </div>
            <button class="btn btn-danger w-50 mr-10" @click="Addtocard()" :disabled="!inStock">BUY ME</button>
        </div>
        <div class="col-12 col-md-6 col-lg-5">
            <div class="product-info">
                <h1 >{{title}}</h1>
                <p v-if="inStock">IN stock</p>
                <p v-else>OUT of stock</p>
                <p>Shipping:{{shipping}}</p>
                <ul class="list-group ">
                    <li class="list-group-item list-color" v-for="(variant,index) in variants" :style="{backgroundColor:variant.color}" @mouseover="updateProduct(index)">{{variant.color}}</li>
                </ul>
                <hr>
                <ul class="list-group">
                    <li class="list-group-item" v-for="detail in details">{{detail}}</li>
                </ul>
                <div class="sizes-container container mb-2">
                    <div class="row">
                        <div class="col-1 size-box" v-for="size in sizes">{{size}}</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    `,
    data:function(){
        return{
            brand:'Vue mastery',
            message: 'Scooter',
            name:"Max",
            details:["Max speed:35km/h","Max distance:35km","weight:15kg"],
            selectedVariant:0,
            link:'https://www.ted.com/talks/adam_grant_the_surprising_habits_of_original_thinkers#t-455847',

            sizes:[36,37,38,39,40,41,42,43,44,45,46],
            variants:[{color:"green",image:'./images/green.jpg',number:10,id:324567876},{color:"black",image:'./images/black.jpg',number:0,id:445757956}],
        }
    },
    methods:{
        Addtocard:function () {
            this.$emit('add-to-card',this.variants[this.selectedVariant].id);
            alert("Item was added to the cart")
        },
        updateProduct(index){
            this.selectedVariant=index;
            console.log(index);
        }
    },
    computed:{
        title(){
            return this.brand + ' ' + this.message;
        },
        image(){
            return this.variants[this.selectedVariant].image;
        },
        inStock(){
            return this.variants[this.selectedVariant].number;
        },
        shipping(){
            if(this.premium){
                return "Free"
            }else{
                return"2.99"
            }
        }
    }

});
Vue.component('custom-nav',{
    template:`<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Scooter for all</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Shop <span class="sr-only">(current)</span></a>
            </li>
        </ul>
    </div>
</nav>`,
    data(){
        return{
        }
    }
});

Vue.component('product-review',{
    template:`
    <form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Name:</label>
        <input id="name" class="form-control" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" class="form-control" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" class="form-control" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" class="btn btn-primary" value="Submit">  
      </p>    
    
    </form>
    `,
    data(){
        return{
            name: null,
            review: null,
            rating: null
        }

    },
    methods:{
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        }
    }
});

Vue.component('product-tab',{
    props:{
        reviews:{
            type:Array,
            required: true,
        }
    },
    template:`
<div>

<div>
    <span class="tab"
    :class="{activeTab:selectedTab===tab}"
    v-for="tab in tabs"
    @click="selectedTab=tab">{{tab}}</span>
</div>
 <div v-show="selectedTab==='Review'">
      <h2>Reviews</h2>
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul class="list-group">
           <li v-for="review in reviews" class="list-group-item">
              <p> Name:{{ review.name }}</p>
              <p>Rating: {{ review.rating }}</p>
              <p>Comment:{{ review.review }}</p>
          </li>
      </ul>
</div>
</div>
`,
    data(){
        return{
            tabs:[' Make a Review','Review'],
            selectedTab:'Review'
        }
    }
})


var app = new Vue({
    el: '#app',
    data:{
        premium:true,
        card:[],
        reviews:[]
    },
    methods: {
        UpdateCard(id){
            this.card.push(id);
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    }
});







