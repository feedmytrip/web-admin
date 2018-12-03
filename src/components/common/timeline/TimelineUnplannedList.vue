<template>
  <div v-if="events.length > 0">
    <div style="border-bottom:1px solid #7a7a7a; padding-bottom: 10px; margin-bottom: 15px;">
      <div
        class="subtitle"
        style="padding-bottom: 10px; cursor:pointer;"
        @click="isOpen = !isOpen"
      >Unplanned events ({{ events.length }})</div>

    </div>
    <b-collapse :open.sync="isOpen">
      <div
        class="columns is-multiline"
        style="margin-bottom: 15px;"
      >
        <div
          class="column is-4"
          v-for="(value, key) in events"
          :key="key"
        >
          <fmt-timeline-event
            :event="value"
            :unplanned="true"
          ></fmt-timeline-event>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import TimelineEvent from './TimelineEvent'
export default {
  props: ['totalDays'],
  components: {
    'fmt-timeline-event': TimelineEvent
  },
  data () {
    return {
      isOpen: true
    }
  },
  computed: {
    events () {
      const events = this.$store.getters['trips/getTripItineraryEvents'].data
      const td = this.totalDays
      return this.$_.filter(events, function (e) { return e.begin_offset === -1 || e.begin_offset > 86400 * td })
    }
  }
}
</script>
