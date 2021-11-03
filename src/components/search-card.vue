<template>
  <div class="searchCard" @click="openModal">
    <h2>{{ title }}</h2>
    <h3>{{ displayLink }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script>
module.exports = {
  name: 'searchCard',
  props: {  // TODO add props to cards HTML
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
    }
  },
  data: function() {
    return {
      widthPercent: 20
    }
  },
  methods: {
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
    width: calc(25% - 26px);
    text-align: center;
  }
</style>