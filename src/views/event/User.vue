<template>
  <div class="has-text-left is-size-7">
    <div class="card">
      <div class="card-content">User events</div>
    </div>
  </div>
</template>

<script>
export default {
  async created () {
    if (!this.$store.getters['initialized']) {
      const loading = this.$loading.open()
      await this.$store.dispatch('initStore')
      loading.close()
    }
  }
}
</script>
