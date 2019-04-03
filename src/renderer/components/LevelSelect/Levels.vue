<template>
  <div class="levels">
        <div class="row">
          <div class="col" v-for="n in 5">
            <a v-on:click="gotoLevel(n + Number(startLevel))"><div class="level">{{n + Number(startLevel)}}</div></a>
          </div>
        </div>
        <div class="row">
          <div class="col" v-for="n in 5">
            <a v-on:click="gotoLevel(n + 5 + Number(startLevel))"><div class="level">{{n + 5 + Number(startLevel)}}</div></a>
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
      
      let parent = this.$parent

      parent.$emit('fadeFunc', true)

      setTimeout(function () {
        router.push({ name: 'Game', params: { level: (levelNum), playAnim:true}})
        parent.$emit('fadeFunc', false)
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
  margin: 0 auto;
  position: relative;
  padding-left: 160px;
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
  margin: 1vw;
  margin-bottom: 80px;
  /* margin: 20px; */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
}
.zone .levels a:hover,a:focus{
  text-decoration: underline black;
  cursor: pointer;
  color: black;
}
</style>
