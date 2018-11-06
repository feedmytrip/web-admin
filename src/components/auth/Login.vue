<template>
  <div class="columns is-centered">
    <div class="column is-one-third">
      <div class="box">
        <div style="margin-bottom: 20px">
          <img src="@/assets/logo_200x200.png" style="border-radius: 4px;"/>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-model="credentials.username" class="input" type="text" placeholder="Username">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input v-model="credentials.password" class="input" type="password" placeholder="Password" @keyup.enter="signIn">
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-text-right">
            <button class="button is-link" @click="signIn">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
export default {
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  created() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.$store.commit('auth/setUser', user)
        this.$router.push('/')
      })
      .catch(err => console.log(err));
  },
  methods: {
    signIn() {
      const loading = this.$loading.open()
      this.$store.dispatch('auth/login', this.credentials)
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
        });
    }
  }
}
</script>
