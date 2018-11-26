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
  }
}
</script>
