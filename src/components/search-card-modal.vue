<template>
  <div>
    <div class="modalContent" :style="{'margin-top': modalMarginHeight + 'px', 'border-color': colors.colorDark}">
      <div class="modalHeading" :style="{'background': colors.colorLight}">
        <div class="headingLeft">
          <h2>{{ title }}</h2>
          <h4>{{ link }}</h4>
        </div>
        <div class="headingRight">
          <button @click="closeModal" :style="buttonColors">Close</button>
          <button @click="openLink" :style="buttonColors">Open Link</button>
        </div>
      </div>
      <iframe :src="link" :title="title"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-card-modal",
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true
    },
    windowHeight: {
      type: Number,
      required: false,
      default: window.innerHeight
    },
    colors: {
      type: Object,
      required: true
    }
  },
  computed: {
    modalMarginHeight() {
      return 0.05 * this.windowHeight
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
    // Returns: None
    // Description: Opens the website URL in a new browser tab
    openLink() {
      window.open(this.link)
    },
    // Input: None
    // Returns: None
    // Description: Sends a close modal request to the app parent
    closeModal() {
      this.$emit('close-modal')
    }
  }
}
</script>

<style scoped>
  .modalContent {
    padding: 0 0;
    margin-left: auto;
    margin-right: auto;
    background-color: #fefefe;
    border: 5px solid;
    border-radius: 30px;
    width: 90%;
    height: 90%;
  }

  .modalHeading {
    font-size: 1.4em;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    padding: 1px 15px;
    height: 5em;
  }

  .headingLeft {
    float: left;
    text-align: center;
    text-overflow: clip;
    white-space: nowrap;
    overflow: hidden;
    height: 100%;
    width: calc(100% - 6em - 15px);
  }

  .headingRight {
    float: right;
    text-align: center;
    height: 100%;
    width: 6em;
  }

  button {
    border: none;
    color: white;
    margin-top: 0.5em;
    width: 5.5em;
    font-size: 1.1em;
    padding: 0.25em 0;
    cursor: pointer;
    outline: none;
    background: var(--background);
    border-radius: 5px;
    transition-duration: 0.3s;
  }

  button:hover {
    transition-duration: 0.3s;
    background-color: var(--backgroundHover);
  }

  iframe {
    border: none;
    width: 100%;
    height: calc(100% - 7.2em);
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }

  h2 {
    margin: 0.5em 0;
  }
  h4 {
    margin: 0 0;
  }
</style>