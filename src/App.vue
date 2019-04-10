<template>
  <div id="app">
    <navbar />
    <router-view keep-alive />
  </div>
</template>

<script>
import Store from './store/index'
import TheNavbar from './components/TheNavbar.vue'

export default {
  name: 'app',

  components: {
    navbar: TheNavbar
  },

  data() {
    return {
      Store
    } 
  }
}
</script>

<style>

body {
  background: rgb(36, 36, 36);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
