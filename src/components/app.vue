<template>
  <div>
    <search-bar class="searchBar" :style="{'margin-top': searchBarTopMargin + 'px'}" :windowWidth="windowWidth" @get-search-results="getSearchResults"/>
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
  data: function () {
    return {
      searchResults: null,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }

  },
  methods: {
    getSearchResults(searchResults) {
      this.searchResults = searchResults
    }
  },
  computed: {
    searchBarTopMargin() {
      if (this.searchResults !== null) {
        console.log("NULLLLLLL")
        return 0
      } else {
        console.log("NOT NULLL")
        return 0.3 * this.windowHeight
      }
    }
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    }
  }
}
</script>

<style scoped>
  .searchBar {
    width: 100%;
    vertical-align: center;
    transition-duration: 0.5s;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
  }
</style>