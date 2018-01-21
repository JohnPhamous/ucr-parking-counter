// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import * as VueGoogleMaps from 'vue2-google-maps'
import VueAnalytics from 'vue-analytics'

// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyCWCo0SLp-4kPOOxJ8707D4h485lzjZDxg',
//     libraries: 'places' // This is required if you use the Autocomplete plugin
//     // OR: libraries: 'places,drawing'
//     // OR: libraries: 'places,drawing,visualization'
//     // (as you require)
//   }
// })

Vue.use(VueAnalytics, {
  id: 'UA-100060744-3'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
