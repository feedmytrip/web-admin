<template>
  <div><p>Users</p></div>
</template>

<script>
export default {
  mounted () {
    this.$store.commit('setTitle', 'Users')
    this.$store.commit('setSubtitle', 'Manages system users')
  }
}
</script>
