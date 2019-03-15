<template>
<div>
  <router-link to="/level-select">
    <video id="video" width="100%" height="100%" loop autoplay>
      <source src="~@/assets/title.mp4" type="video/mp4">
  </video>
  </router-link>

  <div>
    <router-link to="/intro" class="intro-link">
      Watch Intro
    </router-link>
  </div>

</div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import router from '../router'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    beforeCreate() {
      var watchedIntro = localStorage.getItem('watchedIntro');
      if(!watchedIntro)
      {
        router.push('intro')
      } else {

      }
      
    },
    mounted () {
      window.addEventListener('keypress', function () {
        router.push('level-select')
      }, false)
  },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
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
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.intro-link
{
  position: absolute;
  top: 14px;
  right: 40px;
  font-family: Righteous;
  font-size: 28px;
  color: white !important;
  text-decoration: none !important;
  text-shadow: 1px 1px 4px black;
}
.intro-link :hover{
  color: #CFC777 !important;
}

</style>
