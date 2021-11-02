<template>
  <div>
    <search-bar class="searchBar" :windowWidth="windowWidth" @get-search-results="getSearchResults"/>
    <div class="cards" v-if="searchResults">
      <search-card v-for="item in searchResults.items"
                   :key="item.link"
                   :title="item.title"
                   :link="item.link"
                   :displayLink="item.displayLink"
                   :description="item.snippet"
      ></search-card>
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
      searchResults: null,
      windowWidth: window.innerWidth
    }

  },
  methods: {
    getSearchResults(searchResults) {
      this.searchResults = searchResults
    }
  },
  watch: {
    searchJSON: function() {
      console.log("searchJSON has been changed!")
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