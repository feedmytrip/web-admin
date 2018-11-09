<template>
  <div><p>Trips</p></div>
</template>

<script>
export default {
  mounted () {
    this.$store.commit('setTitle', 'Trips')
    this.$store.commit('setSubtitle', 'Manages system trips')
  }
}
</script>
