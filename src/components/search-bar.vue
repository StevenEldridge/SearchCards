<template>
  <div id ="searchBar" class="searchBar">
    <h2>Search: </h2>
    <input v-model="search">

  </div>
</template>

<script>
  module.exports = {
    name: 'searchBar',
    data: function() {
      return {
        search: 'TEST',
      }
    }
  }
</script>

<style scoped>

</style>