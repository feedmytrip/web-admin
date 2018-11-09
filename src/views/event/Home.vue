<template>
  <div>
    <div class="tabs">
      <ul>
        <router-link tag="li" to="/events/global">
          <a>Global Events</a>
        </router-link>
        <router-link tag="li" to="/events/users">
          <a>User Events</a>
        </router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.commit('setTitle', 'Events')
    this.$store.commit('setSubtitle', 'Manages system global and user events')
  }
}
</script>
