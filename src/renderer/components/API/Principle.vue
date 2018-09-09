<template>
  <div class="principle">
      <h4>{{property}}</h4>
      <p>{{description}}</p>
      <div class="params">
        <b>Parameters:</b>
        <div v-for="param in paramsArray">{{param}}</div>
      </div>
    </div>
</template>

<script>
import router from '../../router'

  export default {
    name: 'principle',
    props: ['property', 'paramsArray', 'description']
    // data () {
    //   return {
    //     startLevel:0
    //   }
    // }
  }
</script>

<style>
  .principle
  {
    margin-bottom: 60px;
  }
</style>
