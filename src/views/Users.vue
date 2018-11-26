<template>
  <p>Users</p>
</template>

<script>
export default {
  async created () {
    this.$store.commit('setTitle', 'Users')
    this.$store.commit('setSubtitle', 'Manages system users')
  }
}
</script>
