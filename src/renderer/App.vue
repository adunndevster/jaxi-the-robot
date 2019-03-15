<template>
  <div id="app">
    <router-view @fadeFunc="setFade"></router-view>
    
    <transition name="fade">
      <div v-if="isShowing" id="fader">
      </div>
    </transition>


  </div>
  
</template>

<script>
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

</style>
