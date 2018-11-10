<template>
  <div>
    <p>Trips</p>
  </div>
</template>

<script>
export default {
  async created () {
    this.$store.commit('setTitle', 'Trips')
    this.$store.commit('setSubtitle', 'Manages system trips')
    if (!this.$store.getters['initialized']) {
      const loading = this.$loading.open()
      await this.$store.dispatch('initStore')
      loading.close()
    }
  }
}
</script>
