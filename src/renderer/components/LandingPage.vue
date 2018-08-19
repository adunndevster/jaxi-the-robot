<template>
<div>
  <router-link to="/level-select">
    <video id="video" width="100%" height="100%" autoplay loop>
      <source src="~@/assets/title.mp4" type="video/mp4">
  </video>
  </router-link>
</div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import router from '../router'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    mounted(){
      window.addEventListener("keypress", function(){
       router.push('level-select');
      }, false);
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link);
      }
    }
    
  }
</script>

<style>

@font-face {
  font-family: Righteous;
  src: url('~@/assets/fonts/Righteous-Regular.ttf');
}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { 
    font-family: 'Source Sans Pro', sans-serif; 
  }

  .title-img{
    width: 100%;
    height: 100%;;
  }
  
#video{
  position: absolute  ;
  top: 50%;
  transform: translateY(-50%);
}

</style>
