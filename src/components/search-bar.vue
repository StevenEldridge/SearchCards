<template>
  <div class="searchBarBackground">
    <div id ="searchBar" class="searchBar" :style="{'margin-left': searchInputMarginLeft.toString() + 'px'}">
      <h2>Search: <span style="color: red" v-if="errorMessage">{{ errorMessage }}</span></h2>
      <input v-model="search" class="searchInput" :style="{
      width: searchInputWidth.toString() + 'px',
      'padding-left': searchInputPadding.toString() + 'px',
      'padding-right': searchInputPadding.toString() + 'px'}">
      <button class="buttons" @click="getSearch()">Search</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'searchBar',
    props: {
      windowWidth: {  // TODO add dynamic scaling to the search cards
        type: Number,
        required: false,
        default: window.innerWidth
      }
    },
    data: function() {
      return {
        search: '', // User search request
        apiKey: '',  // API key TODO create separate file to store API
        searchID: '',  // ID of the programmable search engine TODO create separate file to store ID
        dateRestrict: 0, // Only shows URLs that are newer than this many days. 0 disables restriction TODO add feature
        safeSearch: 'off', // Filters inappropriate content. Either "active" or "off" allowed TODO add feature
        searchCount: 10,  // Number of items to be returned from a search TODO add feature
        errorMessage: '', // Holds an error message to be displayed
        searchInputPadding: 20  // Padding of the search input bar
      }
    },
    computed: {
      searchInputWidth() {
        return (5 * Math.pow(this.windowWidth,0.68))
      },
      searchInputMarginLeft() {
        return (this.windowWidth - this.searchInputWidth - this.searchInputPadding * 3) / 2
      }
    },
    methods: {
      getSearch() {
        if(this.formValidation()) {
          this.errorMessage = ''
          fetch('https://www.googleapis.com/customsearch/v1?key=' + this.apiKey + '&cx=' + this.searchID + '&q=' + this.search)
              .then(response => response.json())
              .then(data => (this.$emit('get-search-results', data)))
        }
      },
      formValidation() {
        if(this.search.length > 2048) {
          this.errorMessage = 'Your search is too long'
          return false
        }
        else {
          return true
        }
      }
    }
  }
</script>

<style scoped>
  h2 {
    margin-bottom: 5px;
  }

  .searchBarBackground {
    padding-top: 10px;
    padding-bottom: 40px;
    background: white;
  }

  .searchBar {

  }

  .searchInput {
    font-size: 1.2em;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 10px;
    margin-right: 10px;
  }

  button {
    border: none;
    color: white;
    padding: 0.2em 0.5em;
    font-size: 1.4em;
    cursor: pointer;
    outline: none;
    background: #3F3F3F;
    border-radius: 5px;
    transition-duration: 0.3s;
  }

  button:hover {
    transition-duration: 0.3s;
    background-color: green;
  }
</style>