<template>
  <div class="searchCard">
    <h2>{{ title }}</h2>
    <h3>{{ link }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script>
module.exports = {
  name: 'searchCard',
  data: function() {
    return {
      title: "This will be the title",
      link: "https://www.google.com",
      description: "This will be the description of the web search. " +
          "This should take the rest of the cards space and should wrap properly once the CSS is set up.",
      widthPercent: 20
    }
  }
}
</script>

<style scoped>
  .searchCard {
    border: 3px solid;
    border-radius: 20px;
    margin: 10px;
    width: calc(25% - 26px);
    text-align: center;
  }
</style>