<template>
    <p>Highlights</p>
</template>

<script>
export default {
    mounted(){
      this.$store.commit('setTitle', 'Highlights')
      this.$store.commit('setSubtitle', 'Manages system highlights')
    }
}
</script>
