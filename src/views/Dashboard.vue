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
  }
}
</script>
