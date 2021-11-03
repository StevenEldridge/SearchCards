<template>
  <div class="app">
    <search-bar class="searchBar"
          :style="{'margin-top': searchBarTopMargin + 'px'}"
          :windowWidth="windowWidth"
          @get-search-results="getSearchResults"/>
    <div class="cards" v-if="searchResults">
      <search-card v-for="item in searchResults.items"
             @open-modal="openModal"
             :key="item.link"
             :title="item.title"
             :link="item.link"
             :displayLink="item.displayLink"
             :description="item.snippet"
      ></search-card>
    </div>
    <search-card-modal class="modal"
           v-show="showModal"
           :title="modalTitle"
           :link="modalLink"
           :window-height="windowHeight"
           @close-modal="closeModal"
    ></search-card-modal>
  </div>
</template>

<script>
import searchBar from './search-bar.vue'
import searchCard from './search-card.vue'
import searchCardModal from './search-card-modal.vue'

export default {
  name: "app",
  components: {
    searchBar,
    searchCard,
    searchCardModal
  },
  data: function () {
    return {
      searchResults: null,
      modalTitle: '',
      modalLink: '',
      showModal: false,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }

  },
  methods: {
    getSearchResults(searchResults) {
      this.searchResults = searchResults
    },
    openModal(title, link) {
      this.modalTitle = title
      this.modalLink = link
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    }
  },
  computed: {
    searchBarTopMargin() {
      if (this.searchResults !== null) {
        return 0
      } else {
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
  .app {
    font-family: Arial, Helvetica, sans-serif;
  }

  .searchBar {
    width: 100%;
    vertical-align: center;
    transition-duration: 0.8s;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
  }

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
  }
</style>