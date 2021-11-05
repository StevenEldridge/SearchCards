<template>
  <div>
    <div class="modalContent" :style="{'margin-top': (0.05 * windowHeight) + 'px'}">
      <div class="modalHeading">
        <div class="headingLeft">
          <h1 style="margin-bottom: 0">Settings</h1>
        </div>
        <div class="headingRight">
          <button @click="closeModal">Close</button>
        </div>
      </div>
      <div class="modalBody" :style="{'margin-top': (0.05 * modalContentHeight) + 'px', 'height': 'calc(' + (0.95 * modalContentHeight) + 'px - 7.1em)'}">
        <div class="searchOptions">
          <h1>Search Options</h1>
        </div>
        <div class="verticalLine"></div>
        <div class="colorOptions">
          <h1>Color Options</h1>
          <h2>Light or Dark</h2>
          <form>
            <label>
              <input type="radio" checked="checked" name="LightDark">
              <span class="radioButton"></span>
              <p>Light</p>
            </label>
            <label>
              <input type="radio" name="LightDark">
              <span class="radioButton"></span>
              <p>Dark</p>
            </label>
          </form>
          <h2>Color</h2>
          <form>
            <label>
              <input type="radio" name="color">
              <span class="radioButton"></span>
              <p>Red</p>
            </label>
            <label>
              <input type="radio" name="color">
              <span class="radioButton"></span>
              <p>Green</p>
            </label>
            <label>
              <input type="radio" name="color">
              <span class="radioButton"></span>
              <p>Blue</p>
            </label>
            <label>
              <input type="radio" name="color">
              <span class="radioButton"></span>
              <p>Purple</p>
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
    }
  },
  data: function() {
    return {

    }
  },
  computed: {
    modalContentHeight() {
      return this.windowHeight * 0.9
    }
  },
  methods: {
    // Input:
    // Returns:
    // Description:
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
  border: 5px solid darkgreen;
  border-radius: 30px;
  width: 90%;
  height: 90%;
}

.modalHeading {
  background: lightgreen;
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

.modalBody {
  display: flex;
  width:100%;
}

.searchOptions {
  padding-top: 30px;
  height: 100%;
  width: calc(50% - 4px);
}

.colorOptions {
  padding-top: 30px;
  height: 100%;
  width: calc(50% - 4px);
}

.verticalLine {
  width: 8px;
  height: 95%;
  background: darkgreen;
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
  width: 5.5em;
  margin-top: 16px;
  font-size: 1.1em;
  padding: 0.25em 0;
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
  margin-bottom: 20px;
  cursor: pointer;
  padding-left: 40%;
}

label input {
  display: none;
}

.radioButton {
  position: absolute;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background: grey;
}

label p {
  padding-left: 35px;
}
</style>