<template>
<section id="app" class="hero is-link is-bold is-fullheight">
  <!-- Hero head: will stick at the top -->
  <div class="hero-head">
    <header class="navbar is-white" style="background-color: white;">
      <div class="container is-fluid">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item" style="background-color: white;">
            FeedMyTrip
          </router-link>
          <span class="navbar-burger burger" data-target="navbarMenuHeroC">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroC" class="navbar-menu" v-if="signedIn">
          <div class="navbar-end">
            <router-link to="/highlights" class="navbar-item">
              Highlights
            </router-link>
            <router-link to="/trips" class="navbar-item">
              Trips
            </router-link>
            <router-link to="/events" class="navbar-item">
              Events
            </router-link>
            <router-link to="/auxiliary" class="navbar-item">
              Auxiliary
            </router-link>
            <span class="navbar-item">
              <a class="button is-success is-inverted" @click="signOut">
                <span class="icon">
                  <i class="fa fa-sign-out"></i>
                </span>
                <span>SignOut</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </header>
  </div>

  <!-- Hero content: will be in the middle -->
  <div class="hero-body">
    <div class="container has-text-centered">
      <router-view></router-view>
    </div>
  </div>

  <!-- Hero footer: will stick at the bottom -->
  <div class="hero-foot has-text-centered is-size-7">
    <p>FeedMyTrip Admin - v1.0</p>
  </div>
</section>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue';
export default {
  computed: {
    signedIn() {
      return this.$store.state.signedIn
    }
  },
  methods:{
    signOut() {
      this.$Amplify.Auth.signOut()
        .then(() => {
          this.$router.push('/login')
          return AmplifyEventBus.$emit('authState', 'signedOut')
        })
        .catch(e => console.log(e));
    }
  }
}
</script>
