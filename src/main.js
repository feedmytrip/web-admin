import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Buefy from 'buefy'
import moment from 'moment'

import 'bulma/css/bulma.css'
import 'buefy/dist/buefy.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

Amplify.configure({
  Auth: {
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-east-1:f8b226eb-c4bd-4b7d-816d-89d6defd9229',
      
      // REQUIRED - Amazon Cognito Region
      region: 'us-east-1',

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-east-1_0JwI28hrb',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: '2i1vka74ub2c6b3i5l6o3aaio',
  },
  API: {
    endpoints: [
      {
        name: "AdminApi",
        endpoint: "https://ypjvh00rjd.execute-api.sa-east-1.amazonaws.com/Beta",
        region: "sa-east-1",
        custom_header: async () => { 
          return { Authorization: (await AmplifyModules.Auth.currentSession()).idToken.jwtToken } 
        }
      }
    ]
  }
});

Vue.use(AmplifyPlugin, AmplifyModules)

Vue.config.productionTip = false

Vue.prototype.$moment = moment

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
