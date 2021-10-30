import Vue from 'vue'
import app from '/src/components/app.vue';

Vue.config.productionTip = false

new Vue({
  render: h => h(app),
  data: {
    windowWidth: window.innerWidth
  }
}).$mount('#app')




