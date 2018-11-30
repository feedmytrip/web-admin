
<template>
  <div>
    <fmt-general-edit :highlight="highlight"></fmt-general-edit>
  </div>
</template>

<script>
import HighlightGeneralEdit from '@/components/highlight/HighlightGeneralEdit'
export default {
  async created () {
    if (this.$_.isEmpty(this.highlight)) {
      const loading = this.$loading.open()
      await this.$store.dispatch('highlights/get', this.$route.params.id)
      loading.close()
    }
  },
  components: {
    'fmt-general-edit': HighlightGeneralEdit
  },
  computed: {
    highlight () {
      return this.$store.getters['highlights/getHighlight'](this.$route.params.id)
    }
  }
}
</script>
