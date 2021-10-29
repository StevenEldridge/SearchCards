<template>
  <div>
    <searchBar class="searchBar"/>
  </div>
</template>

<script>
import searchBar from './search-bar.vue'

export default {
  name: "app",
  components: {
    searchBar
  }
}
</script>

<style scoped>
  .searchBar {
    width: 100%;
    vertical-align: center;
  }
</style>