Vue.component('blog-post', {
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
})
new Vue({ el: '#blog-post-container' });

Vue.component('product',{
    data:function () {
        return{}
    },
    template:
        `
        <div>
        <h1>{{message}}</h1>
        <h2>{{name}}</h2>
        <p>{{gender}}</p>
</div>
        `,
    props:['message','name','gender'],

});
new Vue({ el: '#product-main' });
