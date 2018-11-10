<template>
  <p>Dashboard</p>
</template>

<script>
export default {
  async created () {
    this.$store.commit('setTitle', 'Dashboard')
    this.$store.commit(
      'setSubtitle',
      'General informations about system current status'
    )
    if (!this.$store.getters['initialized']) {
      const loading = this.$loading.open()
      await this.$store.dispatch('initStore')
      loading.close()
    }
  }
}
</script>
