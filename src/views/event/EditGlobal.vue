<template>
  <div class="has-text-left is-size-7">
    <fmt-global-general-event-edit :event="event"></fmt-global-general-event-edit>
  </div>
</template>

<script>
import GlobalGeneralEdit from '@/components/event/GlobalGeneralEdit'
export default {
  async created () {
    if (!this.$store.getters['initialized']) {
      const loading = this.$loading.open()
      await this.$store.dispatch('initStore')
      loading.close()
    }
  },
  components: {
    'fmt-global-general-event-edit': GlobalGeneralEdit
  },
  computed: {
    event () {
      return this.$store.getters['events/getEvent'](this.$route.params.id)
    }
  }
}
</script>
