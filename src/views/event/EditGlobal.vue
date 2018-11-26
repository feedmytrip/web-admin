<template>
  <div class="has-text-left is-size-7" style="margin-bottom: 30px">
    <div class="columns">
      <div class="column">
        <fmt-global-general-event-edit :event="event"></fmt-global-general-event-edit>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <fmt-global-schedule-event-edit :event="event"></fmt-global-schedule-event-edit>
      </div>
    </div>
    <fmt-global-location-event-edit :event="event"></fmt-global-location-event-edit>
  </div>
</template>

<script>
import GlobalGeneralEdit from '@/components/event/GlobalGeneralEdit'
import GlobalScheduleEdit from '@/components/event/GlobalScheduleEdit'
import GlobalLocationEdit from '@/components/event/GlobalLocationEdit'
export default {
  async created () {
    if (this.$_.isEmpty(this.event)) {
      const loading = this.$loading.open()
      await this.$store.dispatch('events/get', this.$route.params.id)
      loading.close()
    }
  },
  components: {
    'fmt-global-general-event-edit': GlobalGeneralEdit,
    'fmt-global-schedule-event-edit': GlobalScheduleEdit,
    'fmt-global-location-event-edit': GlobalLocationEdit
  },
  computed: {
    event () {
      return this.$store.getters['events/getEvent'](this.$route.params.id)
    }
  }
}
</script>
