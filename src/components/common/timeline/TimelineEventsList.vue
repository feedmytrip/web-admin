<template>
  <div style="position: absolute; top: 105px; width: 100%;">
    <template v-for="render in renderEvents">
      <fmt-timeline-event
        v-for="value in render.events"
        :key="value.id"
        :event="value"
        :render-type="render.type"
        :offset="render.offset"
        :duration="render.duration"
        :draggable="render.draggable"
      ></fmt-timeline-event>
    </template>
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
    renderEvents () {
      const dayMorIni = 86400 * (this.day - 1)
      const dayMorEnd = dayMorIni + 21600
      const dayAftIni = dayMorEnd
      const dayAftEnd = dayAftIni + 21600
      const dayNgtIni = dayAftEnd
      const dayNgtEnd = dayAftEnd + 43200
      const events = this.$_.orderBy(this.events, ['begin_offset'], ['asc'])
      return [
        {
          type: 'T01', // Nem começa nem termina no dia
          draggable: 'none',
          offset: 0,
          duration: 100,
          events: this.$_.filter(events, function (e) {
            return e.begin_offset < dayMorIni && e.begin_offset + e.duration > dayNgtEnd
          })
        },
        {
          type: 'T02', // Começa no dia pela manhã mas não termina nesse dia
          draggable: 'offset',
          offset: 0,
          duration: 100,
          events: this.$_.filter(events, function (e) {
            return (e.begin_offset >= dayMorIni && e.begin_offset < dayMorEnd) && e.begin_offset + e.duration > dayNgtEnd
          })
        },
        {
          type: 'T03', // Não começa no dia mas termina nesse dia a noite
          draggable: 'duration',
          offset: 0,
          duration: 100,
          events: this.$_.filter(events, function (e) {
            return e.begin_offset < dayMorIni && (e.begin_offset + e.duration > dayNgtIni && e.begin_offset + e.duration <= dayNgtEnd)
          })
        },
        {
          type: 'T04', // Começa no dia pela manhã e termina no dia a noite
          draggable: 'all',
          offset: 0,
          duration: 100,
          events: this.$_.filter(events, function (e) {
            return (e.begin_offset >= dayMorIni && e.begin_offset < dayMorEnd) && (e.begin_offset + e.duration > dayNgtIni && e.begin_offset + e.duration <= dayNgtEnd)
          })
        },
        {
          type: 'T05', // Não Começa nesse dia mas termina no dia pela manhã
          draggable: 'duration',
          offset: 0,
          duration: 32,
          events: this.$_.filter(events, function (e) {
            return e.begin_offset < dayMorIni && (e.begin_offset + e.duration > dayMorIni && e.begin_offset + e.duration <= dayMorEnd)
          })
        },
        {
          type: 'T06', // Começa e termina no dia pela manhã
          draggable: 'all',
          offset: 0,
          duration: 32,
          events: this.$_.filter(events, function (e) {
            return e.begin_offset >= dayMorIni && e.begin_offset + e.duration <= dayMorEnd
          })
        },
        {
          type: 'T07', // Começa no dia pela manhã e termina no dia a tarde
          draggable: 'all',
          offset: 0,
          duration: 66,
          events: this.$_.filter(events, function (e) {
            return (e.begin_offset >= dayMorIni && e.begin_offset < dayMorEnd) && (e.begin_offset + e.duration > dayAftIni && e.begin_offset + e.duration <= dayAftEnd)
          })
        },
        {
          type: 'T08', // Não começa no dia mas termina no dia a tarde
          draggable: 'duration',
          offset: 0,
          duration: 66,
          events: this.$_.filter(events, function (e) {
            return e.begin_offset < dayMorIni && (e.begin_offset + e.duration > dayAftIni && e.begin_offset + e.duration <= dayAftEnd)
          })
        },
        {
          type: 'T09', // Começa e termina no dia a tarde
          draggable: 'all',
          offset: 34,
          duration: 32,
          events: this.$_.filter(events, function (e) {
            return e.begin_offset >= dayAftIni && e.begin_offset + e.duration <= dayAftEnd
          })
        },
        {
          type: 'T10', // Começa no dia a tarde e termina no dia a noite
          draggable: 'all',
          offset: 34,
          duration: 66,
          events: this.$_.filter(events, function (e) {
            return (e.begin_offset > dayAftIni && e.begin_offset <= dayAftEnd) && (e.begin_offset + e.duration > dayAftEnd && e.begin_offset + e.duration <= dayNgtEnd)
          })
        },
        {
          type: 'T11', //  Começa no dia a tarde não termina no mesmo dia
          draggable: 'offset',
          offset: 34,
          duration: 66,
          events: this.$_.filter(events, function (e) {
            return (e.begin_offset >= dayAftIni && e.begin_offset < dayAftEnd) && e.begin_offset + e.duration > dayNgtEnd
          })
        },
        {
          type: 'T12', // Começa e termina no dia a noite
          draggable: 'all',
          offset: 68,
          duration: 32,
          events: this.$_.filter(events, function (e) {
            return e.begin_offset >= dayNgtIni && e.begin_offset + e.duration < dayNgtEnd
          })
        },
        {
          type: 'T13', // Começa no dia a noite mas não termina no mesmo dia
          draggable: 'offset',
          offset: 68,
          duration: 32,
          events: this.$_.filter(events, function (e) {
            return (e.begin_offset >= dayNgtIni && e.begin_offset < dayNgtEnd) && e.begin_offset + e.duration > dayNgtEnd
          })
        }
      ]
    }
  }
}
</script>
