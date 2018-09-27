<template>
  <div class="levels">
        <div class="row">
          <div class="col" v-for="n in 5">
            <a href="#" v-on:click="gotoLevel(n + Number(startLevel))"><div class="level">{{n + Number(startLevel)}}</div></a>
          </div>
        </div>
        <div class="row">
          <div class="col" v-for="n in 5">
            <a href="#" v-on:click="gotoLevel(n + 5 + Number(startLevel))"><div class="level">{{n + 5 + Number(startLevel)}}</div></a>
          </div>
        </div>
      </div>
</template>

<script>
import router from '../../router'

export default {
  name: 'levels',
  props: ['startLevel'],
  methods: {
    gotoLevel: function (levelNum) {
      this.$emit('fadeFunc')
      window.setTimeout(function () {
        router.push({ name: 'Game', params: { level: (levelNum)}})
        location.reload() // TODO: find a way to clear the memory space, and smoothly transition between pages... Why? So we can stick to the SPA vue paradigm.
      }, 650)
    }
  }
  // data () {
  //   return {
  //     startLevel:0
  //   }
  // }
}
</script>

<style>
  .zone .levels{
  color: white;
  z-index: 1;
  top:100px;
  left: 210px;
}
.zone .levels div{
  position: relative;
}
.zone .levels .level{
  color: black;
  width: 160px;
  height: 160px;
  border-style: solid;
  border-color: white;
  border-width: 6px;
  background-color: rgba(255, 255, 255, 0.6);
  text-align: center;
  font-size: 72px;
  padding-top: 20px;
  margin: 50px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
}
.zone .levels a:hover,a:focus{
  text-decoration: underline black;
  color: black;
}
</style>
