<template>
  <p>Events</p>
</template>

<script>
export default {
  async created () {
    this.$store.commit('setTitle', 'Users')
    this.$store.commit('setSubtitle', 'Manages system users')
    if (!this.$store.getters['initialized']) {
      const loading = this.$loading.open()
      await this.$store.dispatch('initStore')
      loading.close()
    }
  }
}
</script>
