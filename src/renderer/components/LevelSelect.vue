<template>
<div class="level-select">
  <nav>
    <div class="title">Level Selection</div>
  </nav>

  <div class="zones">
    
    <div class="zone">
      
      <div class="sidebar">
        The Junkyard
      </div>
      
      <levels @fadeFunc="setFade" startLevel="0" />

      <div v-bind:class="{'zone-bg':true, junkyard:true, brighten:(zone==1)}"></div>

    </div>
    <div class="zone">
      
      <div class="sidebar">
        The Forest
      </div>
      
      <levels startLevel="10" />

      <div v-bind:class="{'zone-bg':true, forest:true, brighten:(zone==2)}"></div>
      
    </div>
    <div class="zone">
      
      <div class="sidebar">
        Sprockets Cavern
      </div>
      
      <levels startLevel="20" />

      <div v-bind:class="{'zone-bg':true, cave:true, brighten:(zone==3)}"></div>
      
    </div>
    <div class="zone">
      
      <div class="sidebar">
        Candy City
      </div>

      <levels startLevel="30" />
      
      <div v-bind:class="{'zone-bg':true, 'candy-city':true, brighten:(zone==4)}"></div>
      
    </div>
    <div class="zone">
      
      <div class="sidebar">
        Motherboard's Factory
      </div>

      <levels startLevel="40" />
      
      <div v-bind:class="{'zone-bg':true, factory:true, brighten:(zone==5)}"></div>
      
    </div>
  </div>

<!--
  <h1>Level Select</h1>
  <router-link to="/Game/1">Level 1</router-link>
  <router-link to="/Game/2">Level 2</router-link>
  -->
</div>
</template>

<script>
import router from '../router'
import Levels from './LevelSelect/Levels'

export default {
  name: 'level-select',
  components: { Levels },
  data () {
    return {
      zone: 1
    }
  },
  methods: {
    handleScroll () {
      this.zone = Math.ceil((window.scrollY - 100) / 732) + 1
    },
    setFade () {
      this.$emit('fadeFunc', true)
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>

.level-select *{
  font-family: Righteous;
}

nav{
  width: 100%;
  position: fixed;
  top: 0px;
  height: 100px;
  background-color: #72254C;
  text-align: center;
  padding-top: 10px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
    -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
    -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
    z-index: 1000;
}

.title{
  color:white;
  font-size: 56px;
}

.zones
{
  padding-top:100px;
}

.zone
{
  position: relative;
  width: 100%;
  height: 732px;
}
.zone div{
  position: absolute;
}
.zone .sidebar{
  background-color: rgba(255, 255, 255, 0.6);
  width: 732px;
  transform: rotate(270deg);
  color: black;
  height: 90px;
  z-index: 100;
  top:322px;
  left: -322px;
  text-align: center;
  font-size: 42px;
  padding-top: 10px;
}
.zone-bg
{
  position: absolute;
  top:0px;
  width: 100%;
  height: 732px;
  background-size: cover;
  background-position-x: center;
  opacity: .3;
}
.zone .brighten
{
  opacity: 1;
}

.zone .junkyard
{
  background-image: url("~@/assets/levels/mcJunkyard.png");
}
.zone .forest
{
  background-image: url("~@/assets/levels/mcForest.png");
}
.zone .cave
{
  background-image: url("~@/assets/levels/mcCave.png");
}
.zone .candy-city
{
  background-image: url("~@/assets/levels/mcCandyCity.png");
}
.zone .factory
{
  background-image: url("~@/assets/levels/mcFactory.png");
}
  
</style>
