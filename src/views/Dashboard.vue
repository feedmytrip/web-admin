<template>
  <p>Dashboard</p>
</template>

<script>
export default {
  mounted () {
    this.$store.commit('setTitle', 'Dashboard')
    this.$store.commit(
      'setSubtitle',
      'General informations about system current status'
    )
  }
}
</script>
