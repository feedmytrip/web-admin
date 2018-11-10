<template>
  <p>Highlights</p>
</template>

<script>
export default {
  async created () {
    this.$store.commit('setTitle', 'Highlights')
    this.$store.commit('setSubtitle', 'Manages system highlights')
    if (!this.$store.getters['initialized']) {
      const loading = this.$loading.open()
      await this.$store.dispatch('initStore')
      loading.close()
    }
  }
}
</script>
