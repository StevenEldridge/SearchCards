<template>
  <div class="app" :style="{'color': colors.fontColor}">
    <button style="position: relative; top: 20px; font-size: 1.6em"
          :style="buttonColors"
          @click="openSettingsModal"
    >
      Settings
    </button>
    <search-bar class="searchBar"
          :style="{'margin-top': searchBarTopMargin + 'px'}"
          :windowWidth="windowWidth"
          :colors="colors"
          @get-search-results="getSearchResults"/>
    <div class="cards" v-if="searchResults">
      <search-card v-for="item in searchResults.items"
             @open-modal="openCardModal"
             :key="item.link"
             :title="item.title"
             :link="item.link"
             :displayLink="item.displayLink"
             :description="item.snippet"
             :imageURL="proccessImageURL(item)"
             :colors="colors"
             :windowWidth="windowWidth"
      ></search-card>
    </div>
    <search-card-modal class="modal"
           v-show="showCardModal"
           :title="modalTitle"
           :link="modalLink"
           :window-height="windowHeight"
           :colors="colors"
           @close-modal="closeCardModal"
    ></search-card-modal>
    <settings-modal class="modal"
           v-show="showSettingsModal"
           :window-height="windowHeight"
           @close-modal="closeSettingsModal"
           @update-color-theme="updateColorTheme"
    ></settings-modal>
  </div>
</template>

<script>
import searchBar from './search-bar.vue'
import searchCard from './search-card.vue'
import searchCardModal from './search-card-modal.vue'
import settingsModal from './settings-modal.vue'

export default {
  name: "app",
  components: {
    searchBar,
    searchCard,
    searchCardModal,
    settingsModal
  },
  data: function () {
    return {
      searchResults: null,
      modalTitle: '',
      modalLink: '',
      showCardModal: false,
      showSettingsModal: false,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      colors: null
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
    // Description: Receives data from search-card child and opens a search card modal dialog
    openCardModal(title, link) {
      this.modalTitle = title
      this.modalLink = link
      this.showCardModal = true
    },
    // Input: None
    // Returns: None
    // Description: Receives a request from search-card-modal to close the modal dialog
    closeCardModal() {
      this.showCardModal = false
    },
    // Input: None
    // Returns: None
    // Description: Opens the settings modal dialog
    openSettingsModal() {
      this.showSettingsModal = true
    },
    // Input:
    // Returns:
    // Description:
    closeSettingsModal() {
      this.showSettingsModal = false
    },
    // Input: An object of the google search results
    // Returns: Either null or a URL String
    // Description: Checks to ensure there is a URL present and catches uninitialized
    //              variables that results if there is no image url given
    updateColorTheme(colors) {
      this.colors = colors
    },
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
    },
    buttonColors() {
      return {
        left: (this.windowWidth - 160) + 'px',
        '--background': this.colors.backgroundDark,
        '--backgroundHover': this.colors.colorDark,
      }
    }
  },
  beforeMount() {
    this.colors = new function() {
      this.fontColor = 'black'
      this.backgroundLight = 'white'
      this.backgroundDark = '#3F3F3F'
      this.colorLight = 'lightgreen'
      this.colorDark = 'darkgreen'
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

  button {
    border: none;
    color: white;
    padding: 0.2em 0.5em;
    font-size: 1.4em;
    cursor: pointer;
    outline: none;
    background: var(--background);
    border-radius: 5px;
    transition-duration: 0.3s;
  }

  button:hover {
    transition-duration: 0.3s;
    background: var(--backgroundHover);
  }
</style>