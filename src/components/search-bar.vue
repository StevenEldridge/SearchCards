<template>
  <div id ="searchBar" class="searchBar" :style="{'margin-left': searchInputMarginLeft.toString() + 'px'}">
    <h2>Search: </h2>
    <input v-model="search" class="searchInput" :style="{
      width: searchInputWidth.toString() + 'px',
      'padding-left': searchInputPadding.toString() + 'px',
      'padding-right': searchInputPadding.toString() + 'px'}">

  </div>
</template>

<script>
  module.exports = {
    name: 'searchBar',
    props: {
      windowWidth: {
        type: Number,
        required: false,
        default: window.innerWidth
      }
    },
    data: function() {
      return {
        search: 'TEST',
        searchInputPadding: 20
      }
    },
    computed: {
      searchInputWidth() {
        return (5 * Math.pow(this.windowWidth,0.68))
      },
      searchInputMarginLeft() {
        return (this.windowWidth - this.searchInputWidth - this.searchInputPadding * 3) / 2
      }
    }
  }
</script>

<style scoped>
  h2 {
    margin-bottom: 5px;
  }

  .searchBar {

  }

  .searchInput {
    font-size: 1.2em;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 10px;
  }

</style>