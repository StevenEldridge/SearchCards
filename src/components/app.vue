<template>
  <div>
    <search-bar class="searchBar" :windowWidth="windowWidth"/>
    <div class="cards">
      <search-card></search-card>
      <search-card></search-card>
      <search-card></search-card>
      <search-card></search-card>
      <search-card></search-card>
      <search-card></search-card>
      <search-card></search-card>
      <search-card></search-card>
    </div>

  </div>
</template>

<script>
import searchBar from './search-bar.vue'
import searchCard from './search-card.vue'

export default {
  name: "app",
  components: {
    searchBar,
    searchCard
  },
  data: function() {
    return {
      windowWidth: window.innerWidth
    }

  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<style scoped>
  .searchBar {
    width: 100%;
    vertical-align: center;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
  }
</style>