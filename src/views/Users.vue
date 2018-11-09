<template>
  <p>Events</p>
</template>

<script>
export default {
  mounted () {
    this.$store.commit('setTitle', 'Users')
    this.$store.commit('setSubtitle', 'Manages system users')
  }
}
</script>
