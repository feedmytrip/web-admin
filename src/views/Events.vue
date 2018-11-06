<template>
    <p>Events</p>
</template>

<script>
export default {
    mounted(){
      this.$store.commit('setTitle', 'Events')
      this.$store.commit('setSubtitle', 'Manages system events')
    }
}
</script>