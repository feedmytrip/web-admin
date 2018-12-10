<template>
  <div class="columns is-centered">
    <div class="column is-one-fifth is-size-7">
      <div>
        <div
          class="has-text-centered"
          style="margin-bottom: 20px"
        >
          <img src="@/assets/fmt-login.png">
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              v-model="credentials.username"
              class="input is-small is-rounded"
              type="text"
              placeholder="Username"
            >
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input
              v-model="credentials.password"
              class="input is-small is-rounded"
              type="password"
              placeholder="Password"
              @keyup.enter="signIn"
            >
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-text-right">
            <button
              class="button is-small is-rounded is-primary fmt-is-purple"
              @click="signIn"
            >Sign In</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
export default {
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  created () {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.$store.commit('auth/setUser', user)
        this.$router.push('/')
      })
      .catch(err => console.log(err))
  },
  methods: {
    signIn () {
      const loading = this.$loading.open()
      this.$store
        .dispatch('auth/login', this.credentials)
        .then(result => {
          loading.close()
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          loading.close()
          this.$toast.open({
            duration: 3000,
            message: err.message,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>

<style>
.fmt-is-purple {
  background-color: #7957d5 !important;
  border-color: transparent;
  color: #fff;
}
</style>
