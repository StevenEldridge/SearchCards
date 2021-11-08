<template>
  <div>
    <div class="modalContent" :style="{'margin-top': (0.05 * windowHeight) + 'px', 'border-color': colors.colorDark, 'background': colors.backgroundLight}">
      <div v-if="windowWidth > 770" class="modalHeading" :style="{'background': colors.colorLight}">
        <div class="headingLeft">
          <h1 style="margin-bottom: 0">Settings</h1>
        </div>
        <div class="headingRight">
          <button @click="closeModal" :style="buttonColors">Close</button>
        </div>
      </div>
      <div v-if="windowWidth <= 770" class="modalHeadingMobile" :style="{'background': colors.colorLight}">
        <h1 style="margin: 0; display: inline;">Settings</h1>
        <button @click="closeModal" style="margin: 0; font-size: 1.3em; height: 2em;" :style="buttonColors">Close</button>
      </div>
      <div class="modalBody" :style="{
              'margin-top': modalBodyMarginHeight,
              'height': modalBodyHeight,
              'display': modalBodyDisplay,
              'font-size': modalBodyFontSize}"
      >
        <div class="searchOptions" :style="{width: modalContentWidth,
              height: modalBodyChildHeight,
              'margin-top': modalBodyChildPaddingTop}">
          <h1>Search Options</h1>
          <form>
            <div style="text-align: center; margin-bottom: 2.3em;">
              <div class="itemWithToolTip">
                <h2 style="margin-bottom: 0.5em;">Date Restrict</h2>
                <span class="toolTip">Only shows search results that are newer than this many days</span>
              </div>
              <input v-model="dateRestrict" style="width: 2.5em; text-align: center; font-size: 1em">
              <span style="font-size: 1.2em; margin-left: 5px;">Days</span>
            </div>
            <div class="itemWithToolTip">
              <h2>Safe Search</h2>
              <span class="toolTip">Helps to remove explicit content from searches</span>
            </div>
            <label>
              <input type="radio" checked="checked" name="safeSearch" @click="updateSafeSearch('off')">
              <span class="radioButton" :style="{'background': colors.backgroundDark}"></span>
              <span class="radioChecked"></span>
              <span class="radioDescription">Off</span>
            </label>
            <label>
              <input type="radio" name="safeSearch" @click="updateSafeSearch('active')">
              <span class="radioButton" :style="{'background': colors.backgroundDark}"></span>
              <span class="radioChecked"></span>
              <span class="radioDescription">Active</span>
            </label>
          </form>
        </div>
        <div v-if="windowWidth > 770" class="verticalLine" :style="{'background': colors.colorDark}"></div>
        <div class="colorOptions" :style="{width: modalContentWidth,
              height: modalBodyChildHeight,
              'padding-top': modalBodyChildPaddingTop}">
          <h1>Color Options</h1>
          <h2>Light or Dark</h2>
          <form>
            <label>
              <input type="radio" checked="checked" name="LightDark" @click="updateSelectedTheme('light')">
              <span class="radioButton" :style="{'background': colors.backgroundDark}"></span>
              <span class="radioChecked"></span>
              <span class="radioDescription">Light</span>
            </label>
            <label>
              <input type="radio" name="LightDark" @click="updateSelectedTheme('dark')">
              <span class="radioButton" :style="{'background': colors.backgroundDark}"></span>
              <span class="radioChecked"></span>
              <span class="radioDescription">Dark</span>
            </label>
          </form>
          <h2 style="margin-top: 2em;">Color</h2>
          <form>
            <label>
              <input type="radio" name="color" @click="updateSelectedColor('red')">
              <span class="radioButton" style="background: red"></span>
              <span class="radioChecked"></span>
              <span class="radioDescription">Red</span>
            </label>
            <label>
              <input type="radio" name="color" @click="updateSelectedColor('green')">
              <span class="radioButton" style="background: green"></span>
              <span class="radioChecked"></span>
              <span class="radioDescription">Green</span>
            </label>
            <label>
              <input type="radio" checked="checked" name="color" @click="updateSelectedColor('blue')">
              <span class="radioButton" style="background: blue; float: left"></span>
              <span class="radioChecked"></span>
              <span class="radioDescription">Blue</span>
            </label>
            <label>
              <input type="radio" name="color" @click="updateSelectedColor('purple')">
              <span class="radioButton" style="background: #6f20ba"></span>
              <span class="radioChecked"></span>
              <span class="radioDescription">Purple</span>
            </label>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "settings-modal",
  props: {
    windowHeight: {
      type: Number,
      required: false,
      default: window.innerHeight
    },
    windowWidth: {
      type: Number,
      required: false,
      default: window.innerWidth
    }
  },
  data: function() {
    return {
      colors: null,
      color: 'blue',
      theme: 'light',
      dateRestrict: '0',
      safeSearch: 'off'
    }
  },
  computed: {
    modalContentHeight() {
      return this.windowHeight * 0.9
    },
    modalBodyMarginHeight() {
      if (this.windowWidth > 770) {
        return (0.05 * this.modalContentHeight) + 'px'
      }
      else {
        return '0'
      }
    },
    modalBodyChildPaddingTop() {
      if (this.windowWidth > 770) {
        return '1.8em'
      }
      else {
        return '0'
      }
    },
    modalBodyFontSize() {
      if (this.windowWidth > 770) {
        return '1em'
      }
      else {
        return '0.8em'
      }
    },
    modalBodyDisplay() {
      if (this.windowWidth > 770) {
        return 'flex'
      }
      else {
        return 'block'
      }
    },
    modalBodyHeight() {
      if (this.windowWidth > 770) {
        return 'calc(' + (0.95 * this.modalContentHeight) + 'px - 7.1em)'
      }
      else {
        return 'calc(' + this.modalContentHeight + 'px - 5em)'
      }
    },
    modalBodyChildHeight() {
      if (this.windowWidth > 770) {
        return '100%'
      }
      else {
        return 'auto'
      }
    },
    modalContentWidth() {
      if (this.windowWidth > 770) {
        return 'calc(50% - 4px)'
      }
      else {
        return '100%'
      }
    },
    buttonColors() {
      return {
        '--background': this.colors.backgroundDark,
        '--backgroundHover': this.colors.colorDark,
      }
    }
  },
  methods: {
    updateSafeSearch(option) {
      this.safeSearch = option
    },
    updateColorTheme() {
      this.colors = new this.ColorTheme(this.theme, this.color)
      this.$emit('update-color-theme', this.colors)
    },
    updateSelectedColor(color) {
      this.color = color
      this.updateColorTheme()
    },
    updateSelectedTheme(theme) {
      this.theme = theme
      this.updateColorTheme()
    },
    // Input: Two strings that contain information about the theme and colors
    // Returns: A ColorTheme object containing CSS colors to use site-wide
    // Description: A Class function that contains CSS colors
    ColorTheme(themeName, color) {
      if (themeName === 'dark') {
        this.fontColor = 'white'
        switch (color) {
          case 'red':
            this.colorLight = '#241313'
            this.colorDark = '#241313'
            this.backgroundLight = '#424345'
            this.backgroundDark = 'lightcoral'
            this.searchCardBackground = '#362c2c'
            break
          case 'green':
            this.colorLight = '#131c16'
            this.colorDark = '#131c16'
            this.backgroundLight = '#424345'
            this.backgroundDark = 'lightgreen'
            this.searchCardBackground = '#2c3630'
            break
          case 'blue':
            this.colorLight = '#11161f'
            this.colorDark = '#11161f'
            this.backgroundLight = '#424345'
            this.backgroundDark = '#80bde0'
            this.searchCardBackground = '#2b2d36'
            break
          case 'purple':
            this.colorLight = '#151021'
            this.colorDark = '#151021'
            this.backgroundLight = '#424345'
            this.backgroundDark = '#b8a0eb'
            this.searchCardBackground = '#2b2636'
            break
          default:
            this.colorLight = '#11161f'
            this.colorDark = '#11161f'
            this.backgroundLight = '#424345'
            this.backgroundDark = '#80bde0'
            this.searchCardBackground = '#2b2d36'
            break
        }
      }
      else {
        this.fontColor = 'black'
        this.backgroundLight = 'white'
        this.backgroundDark = '#3F3F3F'
        this.searchCardBackground = 'white'
        switch (color) {
          case 'red':
            this.colorLight = 'lightcoral'
            this.colorDark = 'darkred'
            break
          case 'green':
            this.colorLight = 'lightgreen'
            this.colorDark = 'darkgreen'
            break
          case 'blue':
            this.colorLight = '#80bde0'
            this.colorDark = 'darkblue'
            break
          case 'purple':
            this.colorLight = '#b8a0eb'
            this.colorDark = '#480885'
            break
          default:
            this.colorLight = '#80bde0'
            this.colorDark = 'darkblue'
            break
        }
      }
    },
    // Input: None
    // Returns: None
    // Description: Sends a close modal request to the parent app with search options
    closeModal() {
      this.$emit('close-modal', this.dateRestrict, this.safeSearch)
    }
  },
  beforeMount() {
    // Sets default loading theme to dark if the user's browser is set to a dark theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.theme = 'dark'
      this.color = 'blue'
    }
    else {
      this.theme = 'light'
      this.color = 'blue'
    }
    this.updateColorTheme()
  }
}
</script>

<style scoped>
.modalContent {
  padding: 0 0;
  margin-left: auto;
  margin-right: auto;
  border: 5px solid;
  border-radius: 30px;
  width: 90%;
  height: 90%;
}

.modalHeading {
  font-size: 1.4em;
  margin-bottom: 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 1px 15px;
  height: 5em;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
}

.modalHeadingMobile {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1em;
  margin-bottom: 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 1px 15px;
  height: 5em;
  text-overflow: clip;
  white-space: nowrap;
}

.modalBody {
  width: 100%;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  overflow: hidden;
}

.headingLeft {
  float: left;
  text-align: center;
  margin-left: 7em;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
  height: 100%;
  width: calc(100% - 13em - 15px);
}

.headingRight {
  float: right;
  text-align: center;
  height: 100%;
  margin-top: 16px;
  width: 6.5em;
}

.searchOptions {
}

.colorOptions {
  padding-top: 1.8em;
}

.verticalLine {
  width: 8px;
  height: 95%;
}

.modalBody h1 {
  text-align: center;
}

.modalBody h2 {
  text-align: center;
}

button {
  border: none;
  color: white;
  background: var(--background);
  width: 5.5em;
  margin-top: 16px;
  font-size: 1.1em;
  padding: 0.25em 0;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  transition-duration: 0.3s;
}

button:hover {
  transition-duration: 0.3s;
  background: var(--backgroundHover);
}

iframe {
  border: none;
  width: 100%;
  height: calc(100% - 7.2em);
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
}

label {
  display: block;
  font-size: 1.3em;
  margin-bottom: 0.5em;
  cursor: pointer;
  padding-left: 40%;
}

label input {
  display: none;
}

.radioButton {
  position: fixed;
  height: 1.2em;
  width: 1.2em;
  border-radius: 50%;
}

.radioChecked {
  background: white;
  position: fixed;
  display: none;
  height: 0.6em;
  width: 0.6em;
  margin-left: 0.32em;
  margin-top: 0.32em;
  border-radius: 50%;
}

label input:checked ~ .radioChecked {
  display: block;
}

.radioDescription {
  padding-left: 35px;
}

.itemWithToolTip {
  position: relative;
}

.toolTip {
  font-size: 16px;
  text-align: center;
  visibility: hidden;
  padding: 5px 15px;
  width: 80%;
  position: absolute;
  color: white;
  border-radius: 8px;
  background: rgba(0,0,0,0.8);
  top: -110%;
  left: 7%
}

.itemWithToolTip:hover .toolTip {
  visibility: visible;
}

</style>