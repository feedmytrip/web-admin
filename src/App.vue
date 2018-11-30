<template>
  <section>
    <div v-if="!signedIn">
      <section class="hero fmt-hero-background is-fullheight">
        <div class="hero-body">
          <div class="container">
            <router-view></router-view>
          </div>
        </div>
      </section>
    </div>
    <div
      style="padding-top: 3.25rem;"
      v-if="signedIn"
    >
      <header
        class="navbar is-white is-fixed-top"
        style="background-color: white; border-bottom: 1px solid #ddd;"
      >
        <div class="container is-fluid">
          <div class="navbar-brand">
            <router-link
              to="/"
              class="navbar-item"
              style="background-color: white;"
            >FeedMyTrip</router-link>
            <span
              class="navbar-burger burger"
              data-target="navbarMenuHeroC"
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div
            id="navbarMenuHeroC"
            class="navbar-menu"
          >
            <div class="navbar-end">
              <router-link
                to="/highlights"
                class="navbar-item"
              >Highlights</router-link>
              <router-link
                to="/trips"
                class="navbar-item"
              >Trips</router-link>
              <router-link
                to="/events"
                class="navbar-item"
              >Events</router-link>
              <router-link
                to="/users"
                class="navbar-item"
              >Users</router-link>
              <router-link
                to="/auxiliary"
                class="navbar-item"
              >Auxiliary</router-link>
              <span class="navbar-item">
                <b-tooltip
                  label="Sign Out"
                  type="is-light"
                  position="is-bottom"
                >
                  <button
                    class="button is-success is-inverted"
                    @click="signOut"
                  >
                    <i class="fa fa-sign-out"></i>
                  </button>
                </b-tooltip>
              </span>
            </div>
          </div>
        </div>
      </header>
      <section class="hero fmt-hero-background is-link is-bold">
        <div class="hero-body">
          <div class="container is-fluid">
            <h1 class="title">{{ title }}</h1>
            <h2 class="subtitle">{{ subtitle }}</h2>
          </div>
        </div>
      </section>
      <div class="has-background-white-ter fmt-content">
        <div class="container is-fluid">
          <router-view></router-view>
        </div>
      </div>
      <footer class="fmt-footer has-text-white">
        <div class="columns is-mobile">
          <div class="column">
            <p>FeedMyTrip Admin - v1.0</p>
          </div>
          <div class="column has-text-right">
            <p>Language: {{ languageCode }}</p>
          </div>
        </div>
      </footer>
    </div>
  </section>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
export default {
  computed: {
    signedIn () {
      return this.$store.getters['auth/userSignedIn']
    },
    title () {
      return this.$store.getters['title']
    },
    subtitle () {
      return this.$store.getters['subtitle']
    },
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    }
  },
  methods: {
    signOut () {
      this.$Amplify.Auth.signOut()
        .then(() => {
          this.$store.commit('auth/logout')
          this.$router.push('/login')
          return AmplifyEventBus.$emit('authState', 'signedOut')
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style>
.fmt-hero-background {
  background-image: linear-gradient(
    141deg,
    #3725d4 0%,
    #7957d5 71%,
    #9b67df 100%
  ) !important;
}
.fmt-content {
  margin-bottom: 30px;
  padding: 10px;
}
.fmt-footer {
  bottom: 0px;
  left: 0;
  position: fixed;
  width: 100%;
  padding: 4px;
  background-color: #384759;
  font-size: 0.6rem;
  font-weight: 600;
}
.pace {
  -webkit-pointer-events: none;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.pace-inactive {
  display: none;
}
.pace .pace-progress {
  background: #dd88ba;
  position: fixed;
  z-index: 2000;
  top: 0;
  right: 100%;
  width: 100%;
  height: 2px;
}
</style>
