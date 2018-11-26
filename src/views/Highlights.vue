<template>
  <p>Highlights</p>
</template>

<script>
export default {
  async created () {
    this.$store.commit('setTitle', 'Highlights')
    this.$store.commit('setSubtitle', 'Manages system highlights')
  }
}
</script>
