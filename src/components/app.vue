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
             :imageURL="proccessImageURL(item)"
             :windowWidth="windowWidth"
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
    // Input: An object containing search result data
    // Returns: None
    // Description: Receives search results from search-bar child component
    getSearchResults(searchResults) {
      this.searchResults = searchResults
    },
    // Input: Two strings containing information for the modal
    // Returns: None
    // Description: Receives data from search-card child and opens a modal dialog
    openModal(title, link) {
      this.modalTitle = title
      this.modalLink = link
      this.showModal = true
    },
    // Input: None
    // Returns: None
    // Description: Receives a request from search-card-modal to close the modal dialog
    closeModal() {
      this.showModal = false
    },
    // Input: An object of the google search results
    // Returns: Either null or a URL String
    // Description: Checks to ensure there is a URL present and catches uninitialized
    //              variables that results if there is no image url given
    proccessImageURL(item) {
      try {
        if (item.pagemap.cse_image[0].src !== undefined) {
          return item.pagemap.cse_image[0].src
        }
        else {
          return null
        }
      }
      catch {
        return null
      }
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
    width: 100%;
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