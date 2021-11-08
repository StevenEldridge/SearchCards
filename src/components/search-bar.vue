<template>
  <div class="searchBarBackground">
    <div id ="searchBar" class="searchBar" :style="{'margin-left': searchInputMarginLeft.toString() + 'px'}">
      <h2>Search: <span style="color: red" v-if="errorMessage">{{ errorMessage }}</span></h2>
      <input v-model="search" class="searchInput" @keyup.enter="getSearch" autofocus :style="{
            width: searchInputWidth.toString() + 'px',
            'padding-left': searchInputPadding.toString() + 'px',
            'padding-right': searchInputPadding.toString() + 'px'}">
      <button class="buttons" v-if="windowWidth > 770" :style="buttonColors" @click="getSearch()">Search</button>
    </div>
    <div v-if="windowWidth <= 770" style="text-align: center; width: 100%; margin-top: 20px;">
      <button class="buttons" :style="buttonColors" style="font-size: 2em" @click="getSearch()">Search</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'searchBar',
    props: {
      windowWidth: {
        type: Number,
        required: false,
        default: window.innerWidth
      },
      dateRestrict: {  // Only shows search results that are newer than this many days. 0 disables restriction
        type: String,
        required: false,
        default: '0'
      },
      safeSearch: {  // Helps to filter explicit content. Either "active" or "off" allowed
        type: String,
        required: false,
        default: 'off'
      },
      colors: {
        type: Object,
        required: true
      }
    },
    data: function() {
      return {
        search: '', // User search request
        apiKey: '',  // API key TODO create separate file to store API
        searchID: '',  // ID of the programmable search engine TODO create separate file to store ID
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
      },
      buttonColors() {
        return {
          '--background': this.colors.backgroundDark,
          '--backgroundHover': this.colors.colorDark,
        }
      }
    },
    methods: {
      // Input: None
      // Returns: An object that contains results of a google API call
      // Description: Calls the Google search engine API
      getSearch() {
        if(this.formValidation()) {
          this.errorMessage = ''
          fetch('https://www.googleapis.com/customsearch/v1?key=' + this.apiKey
              + '&cx=' + this.searchID
              + '&dateRestrict=d' + this.dateRestrict
              + '&safe=' + this.safeSearch
              + '&q=' + this.search

          )
              .then(response => response.json())
              .then(data => (this.$emit('get-search-results', data)))
        }
      },
      // Input: None
      // Returns: True or False
      // Description: Ensures that all user input forms are valid
      formValidation() {
        // Ensures search length is less than 2048 characters
        if (this.search.length > 2048) {
          this.errorMessage = 'Your search is too long'
          return false
        }
        // Ensures the user enters something to search
        else if (this.search.length === 0) {
          this.errorMessage = 'You must enter something to search'
          return false
        }
        // Ensures the safe search only has the values 'off' or 'active'
        else if (this.safeSearch !== 'off' && this.safeSearch !== 'active') {
          this.errorMessage = 'Invalid safe search value'
          return false
        }
        // Ensures there are only numbers in the data restrict field
        else if (this.dateRestrict.match(/^[0-9]+$/) == null) {
          this.errorMessage = 'Invalid date restrict value'
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
    background: var(--background);
    cursor: pointer;
    outline: none;
    border-radius: 5px;
    transition-duration: 0.3s;
  }

  button:hover {
    transition-duration: 0.3s;
    background: var(--backgroundHover);
  }
</style>