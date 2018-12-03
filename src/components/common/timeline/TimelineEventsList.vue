<template>
  <div style="position: absolute; top: 105px; width: 100%;">
    <fmt-timeline-event
      v-for="(value, key) in orderEvent"
      :key="key"
      :event="value"
      :unplanned="false"
      :day="day"
    ></fmt-timeline-event>
  </div>
</template>

<script>
import TimelineEvent from './TimelineEvent'
export default {
  props: ['events', 'day'],
  components: {
    'fmt-timeline-event': TimelineEvent
  },
  computed: {
    orderEvent () {
      return this.$_.orderBy(this.events, ['begin_offset'], ['asc'])
    }
  }
}
</script>
