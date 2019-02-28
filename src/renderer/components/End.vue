<template>
<div>
  <router-link to="/landing-page">
    <video id="video" width="100%" height="100%" autoplay >
      <source src="~@/assets/end.mp4" type="video/mp4">
  </video>
  </router-link>
</div>
</template>

<script>
  import router from '../router'

  export default {
    name: 'end',
    components: { },
    mounted () {

      document.getElementById('video').addEventListener('ended',onVideoEnd,false);
      function onVideoEnd(e) {
          router.push('landing-page')
      }
  },
    methods: {
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
