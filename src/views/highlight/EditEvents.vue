
<template>
  <div>
    <fmt-events-edit :highlight="highlight"></fmt-events-edit>
  </div>
</template>

<script>
import HighlightEventsEdit from '@/components/highlight/HighlightEventsEdit'
export default {
  async created () {
    if (this.$_.isEmpty(this.highlight)) {
      const loading = this.$loading.open()
      await this.$store.dispatch('highlights/get', this.$route.params.id)
      loading.close()
    }
  },
  components: {
    'fmt-events-edit': HighlightEventsEdit
  },
  computed: {
    highlight () {
      return this.$store.getters['highlights/getHighlight'](this.$route.params.id)
    }
  }
}
</script>
