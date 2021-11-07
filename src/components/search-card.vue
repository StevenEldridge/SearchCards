<template>
  <div class="searchCard" :style="{width: widthPercent,
        'border-color': colors.colorDark,
        'background': colors.searchCardBackground}"
        @click="openModal">
    <div class="title" :style="{'background': colors.colorLight}">
      <h2>{{ title }}</h2>
    </div>
    <img v-if="imageURL" :src="imageURL">
    <div v-else style="height: 6em"></div>
    <h3>{{ displayLink }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script>
module.exports = {
  name: 'searchCard',
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    displayLink: {
      type: String,
      required: false,
      default: this.link
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    imageURL: {
      type: String,
      required: false,
      default: null
    },
    windowWidth: {
      type: Number,
      required: false,
      default: window.innerWidth
    },
    colors: {
      type: Object,
      required: true
    }
  },
  computed: {
    widthPercent() {
      if (this.windowWidth > 2000) {
        return 'calc(20% - 26px)'
      }
      else if (this.windowWidth > 1500) {
        return 'calc(25% - 26px)'
      }
      else if (this.windowWidth > 1150) {
        return 'calc(33.333% - 26px)'
      }
      else if (this.windowWidth > 770) {
        return 'calc(50% - 26px)'
      }
      else {
        return 'calc(100% - 26px)'
      }
    }
  },
  methods: {
    // Input: None
    // Returns: None
    // Description: Sends title and link information to the app parent
    openModal() {
      this.$emit('open-modal', this.title, this.link)
    }
  }
}
</script>

<style scoped>
  .searchCard {
    cursor: pointer;
    border: 3px solid;
    border-radius: 20px;
    margin: 10px;
    text-align: center;
  }

  h2 {
    margin: 0;
  }

  .title {
    margin: 0;
    padding: 10px 10px;
    height: calc(4.5em + 5px);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 17px;
    border-top-right-radius: 17px;
  }

  img {
    margin: 10px;
    width: calc(100% - 20px);
    height: 12em;
    border-radius: 20px;
    object-fit: cover;
  }

  h3 {
    margin-top: 0;
  }

  p {
    padding: 0 10px;
  }
</style>