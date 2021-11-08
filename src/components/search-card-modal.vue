<template>
  <div>
    <div class="modalContent" :style="{'margin-top': modalMarginHeight + 'px', 'border-color': colors.colorDark}">
      <div class="modalHeading" v-if="windowWidth > 770" :style="{'background': colors.colorLight}">
        <div class="headingLeft">
          <h2>{{ title }}</h2>
          <h4>{{ link }}</h4>
        </div>
        <div class="headingRight">
          <button @click="closeModal" :style="buttonColors">Close</button>
          <button @click="openLink" :style="buttonColors">Open Link</button>
        </div>
      </div>
      <div class="modalHeadingMobile" v-if="windowWidth <= 770" :style="{'background': colors.colorLight}">
        <div style="font-size: 0.65em">
          <h2 class="headingTextMobile">{{ title }}</h2>
          <h4 class="headingTextMobile" style="font-size: 0.9em;">{{ link }}</h4>
        </div>
        <div style="display: flex; justify-content: space-evenly; width: 100%;">
          <button @click="closeModal" class="buttonMobile" :style="buttonColors">Close</button>
          <button @click="openLink" class="buttonMobile" :style="buttonColors">Open Link</button>
        </div>
      </div>
      <iframe v-if="windowWidth > 770" style="height: calc(100% - 7.2em);" :src="link" :title="title"></iframe>
      <iframe v-else style="height: calc(100% - 10.63em); overflow: hidden" :src="link" :title="title"></iframe>
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

  .modalHeadingMobile {
    font-size: 1.5em;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    padding: 1px 15px;
    height: 7em;
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

  .headingTextMobile {
    height: 2.4em;
    text-align: center;
    overflow: hidden;
    margin-bottom: 4px;
  }

  .buttonMobile {
    margin-top: 5px;
    font-size: 0.9em;
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