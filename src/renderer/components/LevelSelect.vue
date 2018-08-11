<template>
<div>
  <h1>Level Select</h1>
  <router-link to="/Game/1">Level 1</router-link>
  <router-link to="/Game/2">Level 2</router-link>
</div>
</template>

<script>
import router from '../router'

export default {
  name: 'level-select',
  methods: {
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  
</style>
