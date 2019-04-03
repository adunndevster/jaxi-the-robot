<template>
  <div id="app">
    <router-view @fadeFunc="setFade"></router-view>
    
    <transition name="fade">
      <div v-if="isShowing" id="fader">
      </div>
    </transition>

    <div id="btnClose" @click="closeApp">&#10006;</div>
  </div>

</template>

<script>

const { remote } = require('electron')

export default {
  name: 'jaxi-the-robot',
  data () {
    return {
      isShowing: true
    }
  },
  methods: {
    fadeOut () {
      var vue = this
      window.setTimeout(function () {
        vue.isShowing = false
      }, 1000)
    },
    fadeIn () {
      this.isShowing = true
    },
    setFade (fadeState) {
      this.isShowing = fadeState
    },
    closeApp (){
      remote.app.quit()
    }
  },
  mounted () {
    this.fadeOut()
  }
}
</script>

<style>


html, body{
  background-color: black !important;
}

#fader{
  position: fixed;
  top:0px;
  bottom:0px;
  right:0px;
  left:0px;
  background-color: black;
  z-index: 999999;
}

fade-enter-active, .fade-leave-active {
  transition: opacity .6s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#btnClose
{
  font-size: 24px;
  color: white;
  position: fixed;
  right: 12px;
  top:12px;
  z-index: 30000;
  user-select: none;
}

/* Turn on custom 8px wide scrollbar */
::-webkit-scrollbar {
  width: 8px; /* 1px wider than Lion. */
  /* This is more usable for users trying to click it. */
  background-color: rgba(0,0,0,0);
  -webkit-border-radius: 100px;
}
/* hover effect for both scrollbar area, and scrollbar 'thumb' */
::-webkit-scrollbar:hover {
  background-color: rgba(0, 0, 0, 0.09);
}

/* The scrollbar 'thumb' ...that marque oval shape in a scrollbar */
::-webkit-scrollbar-thumb:vertical {
  /* This is the EXACT color of Mac OS scrollbars. 
     Yes, I pulled out digital color meter */
  background: rgba(0,0,0,0.5);
  -webkit-border-radius: 100px;
}
::-webkit-scrollbar-thumb:vertical:active {
  background: rgba(0,0,0,0.61); /* Some darker color when you click it */
  -webkit-border-radius: 100px;
}
</style>
