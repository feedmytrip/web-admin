<template>
  <div>
    <div class="tabs">
      <ul>
        <router-link
          tag="li"
          :to="{ name: 'HighlightsEditGeneral', params: { id: this.$route.params.id }}"
        >
          <a>General</a>
        </router-link>
        <router-link
          tag="li"
          :to="{ name: 'HighlightsEditTrips', params: { id: this.$route.params.id }}"
        >
          <a>Trips</a>
        </router-link>
        <router-link
          tag="li"
          :to="{ name: 'HighlightsEditEvents', params: { id: this.$route.params.id }}"
        >
          <a>Events</a>
        </router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.commit('setTitle', 'Highlights')
    this.$store.commit('setSubtitle', 'Manages system highlights')
  }
}
</script>
