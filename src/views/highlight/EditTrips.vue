
<template>
  <div>
    <fmt-trips-edit :highlight="highlight"></fmt-trips-edit>
  </div>
</template>

<script>
import HighlightTripsEdit from '@/components/highlight/HighlightTripsEdit'
export default {
  async created () {
    if (this.$_.isEmpty(this.highlight)) {
      const loading = this.$loading.open()
      await this.$store.dispatch('highlights/get', this.$route.params.id)
      loading.close()
    }
  },
  components: {
    'fmt-trips-edit': HighlightTripsEdit
  },
  computed: {
    highlight () {
      return this.$store.getters['highlights/getHighlight'](this.$route.params.id)
    }
  }
}
</script>
