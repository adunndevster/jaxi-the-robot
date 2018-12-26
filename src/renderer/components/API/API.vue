<template>
  <div class="api">
      <div class="hero">
        <img src="~@/assets/logo.png" />
        <div class="hero-title">Jaxi Docs</div>
      </div>
      <div class="content">
        <div class="toc">
          <a>What's This?</a>
          <br>
          <a>Jaxi's Functions</a>
          <a href="#" v-on:click="scrollToPosition('#api_climb')">climb()</a>
          <a href="#" v-on:click="scrollToPosition('#api_dance')">dance()</a>
          <a href="#" v-on:click="scrollToPosition('#api_isnear')">isNear()</a>
          <a href="#" v-on:click="scrollToPosition('#api_istouching')">isTouching()</a>
          <a href="#" v-on:click="scrollToPosition('#api_jump')">jump()</a>
          <a href="#" v-on:click="scrollToPosition('#api_pickup')">pickUp()</a>
          <a href="#" v-on:click="scrollToPosition('#api_putdown')">putDown()</a>
          <a href="#" v-on:click="scrollToPosition('#api_run')">run()</a>
          <a href="#" v-on:click="scrollToPosition('#api_say')">say()</a>
          <a href="#" v-on:click="scrollToPosition('#api_throwsnowball')">throwSnowball()</a>
        </div>
        <div id="refs" class="refs">
          <div class="section">
            <h4>What's This?</h4>
            <p>These are Jaxi's docs. Here you can find her API reference, and some more tips and tricks to learn how to accomplish wonderful things in the world of programming.</p>
          </div>

          <div class="section">
            <h4>API Reference</h4>
            <p>What is an API? It means "application programming interface". That's just a fancy way to say, "it's how you get Jaxi to do things." This is a collection of Jaxi's functions. Once you know what these functions do, there's no limit to the things Jaxi can conquer!</p>
            <br><br>
            <principle id="api_climb" property="climb()"
                       :paramsArray="['None']"
                       description="Makes Jaxi climb up or down a ladder."
                       />
            
            <principle id="api_dance" property="dance()"
                       :paramsArray="['None']"
                       description="Makes Jaxi dance! Dancing is a nice thing to do while waiting for a flower to grow back, or if she's just feeling the urge to move her body."
                       />

            <principle id="api_isnear" property="isNear(item)"
                       :paramsArray="['item: A string for the name of an item Jaxi can interact with.']"
                       description='Helps Jaxi know if she is standing near something. For example, say she is standing near a flower... You could use: <br><br><code>if(isNear("flower")){<br> //do something...<br>}</code><br><br> You can mouse over items to see if they have a name.'
                       />

             <principle id="api_istouching" property="isTouching(item)"
                       :paramsArray="['item: A string for the name of an item Jaxi can interact with.']"
                       description='Helps Jaxi know if she is actually touching something. For example, say she is stuck in some tar, and you want her to run until she is unstuck... You could use: <br><br><code>while(isTouching("tar")){<br> run()<br>}</code><br><br> You can mouse over items to see if they have a name.'
                       />

            <principle id="api_jump" property="jump([power])"
                       :paramsArray="['power: Optional. A number from -5 to 5 that tells Jaxi how high to jump. Optional. Default is 1.']"
                       description="Makes Jaxi jump! putting a number in the function will make her jump higher. Putting a negative number in the function, will make her jump left."
                       />

             <principle id="api_pickup" property="pickUp()"
                       :paramsArray="['None']"
                       description="If Jaxi is standing over certain objects, like flowers, you can pick them up. Sometimes gatorbots want you to have flowers for them."
                       />

              <principle id="api_putdown" property="putDown(items)"
                       :paramsArray="['items: Optional. Either a string for the id of an item, an object, or an array of objects.']"
                       description="Makes Jaxi put down one or more items. By putting nothing into the function, Jaxi just puts everything down she is holding. By putting in one object reference, she will just put down that one item. If you pass in an array of objects, she will put those down."
                       />

            <principle id="api_run" property="run([speed])"
                       :paramsArray="['speed: Optional. A number from -5 to 5 that tells Jaxi how fast to run. Optional. Default is 1.']"
                       description="Makes Jaxi run! putting a number in the function will make her move all the faster. Putting a negative number in the function, will make her run left."
                       />

            <principle id="api_say" property="say(words)"
                       :paramsArray="['words: A string of text.']"
                       description="Makes Jaxi say the string of text you put into the function. Sometimes gatorbots will want an answer from Jaxi before they let her by."
                       />

            <principle id="api_throwsnowball" property="throwSnowball(angle)"
                       :paramsArray="['angle: A number that tells Jaxi which direction to throw a snowball.']"
                       description="Makes Jaxi throw a snowball. Snowbells are excellent for putting out fires."
                       />

          </div>
          

        </div>
      </div>
  </div>
</template>

<script>
// import VueResource from 'vue-resource';
// import VueAsyncData from 'vue-async-data';
import Vue from 'vue/dist/vue'
import VueScrollTo from 'vue-scrollto'
import Principle from './Principle'
window.Vue = Vue

export default {
  name: 'api',
  props: [],
  components: {Principle},
  methods: {
    scrollToPosition (el) {
      VueScrollTo.scrollTo(el)
    }
  },
  mounted: function () {
    require('smoothscroll-polyfill').polyfill()
    // You can also pass in the default options
    Vue.use(VueScrollTo, {
      container: '#refs',
      duration: 500,
      easing: 'ease',
      offset: 0,
      cancelable: true,
      onStart: false,
      onDone: false,
      onCancel: false,
      x: false,
      y: true
    })
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
