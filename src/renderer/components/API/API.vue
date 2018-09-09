<template>
  <div class="api">
      <div class="hero">
        <img src="~@/assets/logo.png" />
        <div class="hero-title">API Reference</div>
      </div>
      <div class="content">
        <div class="toc">
          <a>What's This?</a>
          <br>
          <a>Jaxi's Functions</a>
          <a href="#" v-on:click="scrollToPosition('#run')">run()</a>
          <a>jump()</a>
        </div>
        <div id="refs" class="refs">
          <div class="section">
            <h4>What's This?</h4>
            <p>This is Jaxi's API reference. What is an API? It means "application programming interface". That's just a fancy way to say, "it's how you get Jaxi to do things."</p>
          </div>

          <div class="section">
            <h4>Jaxi's Functions</h4>
            <p>Here is a collection of Jaxi's functions. Once you know what these functions do, there's no limit to the things Jaxi can conquer!</p>
            <br><br>
            <principle property="run([speed])"
                       :paramsArray="['speed: A number from -5 to 5 that tells Jaxi how fast to run. Optional. Default is 1.']"
                       description="Makes Jaxi run! putting a number in the function will make her move all the faster. Putting a negative number in the function, will make her run left."
                       />

            <principle property="jump([power])"
                       :paramsArray="['power: A number from -5 to 5 that tells Jaxi how high to jump. Optional. Default is 1.']"
                       description="Makes Jaxi jump! putting a number in the function will make her jump higher. Putting a negative number in the function, will make her jump left."
                       />


          </div>
          

        </div>
      </div>
  </div>
</template>

<script>
//import VueResource from 'vue-resource';
//import VueAsyncData from 'vue-async-data';
import Vue from 'vue/dist/vue';
import VueScrollTo from 'vue-scrollto';
import Principle from './Principle'
window.Vue = Vue;

  export default {
    name: 'api',
    props: [],
    components: {Principle}, 
    methods: {
      scrollToPosition(el)
      {
        VueScrollTo.scrollTo(el);
      }
    },
    mounted: function()
    {
      require('smoothscroll-polyfill').polyfill();
      // You can also pass in the default options
      Vue.use(VueScrollTo, {
          container: "#refs",
          duration: 500,
          easing: "ease",
          offset: 0,
          cancelable: true,
          onStart: false,
          onDone: false,
          onCancel: false,
          x: false,
          y: true
      });

    }
    // data () {
    //   return {
    //     startLevel:0
    //   }
    // }
  }
</script>

<style>
  
.api
{
  height: 100%;
  overflow: hidden;
}

.hero
{
  background-image: url("~@/assets/api/hero_bg.png");
  background-size: cover;
  width: 100%;
  height: 200px;
}

.hero img
{
  width: 150px;
  float: left;
  margin: 15px;
  margin-left: 25px;
}

.hero .hero-title
{
  padding-top: 60px;
  font-size: 40px;
  font-family: Righteous;
}

.content{
  height: 100%;
  font-size: 13px;
}

.toc
{
  background-color: #93D1BE;
  padding: 20px;
  width: 150px;
  height: 100%;
  float: left;
  margin-right: 20px;
}
.toc a{
  display: block;
}

.refs{
  padding: 20px;
  overflow: auto;
  height: 80%;
}
.refs .section
{
  margin-bottom: 50px;
}

</style>
