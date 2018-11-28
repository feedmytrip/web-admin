<template>
  <div>
    <div class="tabs">
      <ul>
        <router-link tag="li" to="/trips/global">
          <a>Global Trips</a>
        </router-link>
        <router-link tag="li" to="/trips/users">
          <a>User Trips</a>
        </router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.commit('setTitle', 'Trips')
    this.$store.commit('setSubtitle', 'Manages system global and user Trips')
  }
}
</script>
