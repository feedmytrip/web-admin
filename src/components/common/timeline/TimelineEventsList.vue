<template>
  <div style="position: absolute; top: 105px; width: 100%;">
    <template v-for="render in renderEvents">
      <fmt-timeline-event
        v-for="(value, index) in render.events"
        :key="value.id"
        :event="value"
        :render-type="render.type"
        :offset="render.offset"
        :duration="render.duration"
        :draggable="render.draggable"
        :sort="render.events.length > 1 ? true : false"
        :sortup="index > 0 ? true : false"
        :sortdown="index < render.events.length - 1 && render.sort ? true : false"
        v-on:sort-up="sortUp"
        v-on:sort-down="sortDown"
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
  methods: {
    async sortUp (payload) {
      const loading = this.$loading.open()
      const index = this.$_.findIndex(this.renderEvents, { type: payload.type })
      const renderElement = this.renderEvents[index]
      const typeEvents = renderElement.events
      const eventIindex = this.$_.findIndex(typeEvents, { id: payload.event.id })
      for (let i = 0; i < typeEvents.length; i++) {
        let offset = renderElement.period_offset + i
        let duration = renderElement.period_duration - i
        if (i === eventIindex) {
          offset = renderElement.period_offset + (i - 1)
          duration = renderElement.period_duration - (i - 1)
        } else if (i === eventIindex - 1) {
          offset = renderElement.period_offset + (i + 1)
          duration = renderElement.period_duration - (i + 1)
        }
        await this.updateEvent(typeEvents[i].id, typeEvents[i].itinerary_id, offset, duration)
      }
      loading.close()
    },
    async sortDown (payload) {
      const loading = this.$loading.open()
      const index = this.$_.findIndex(this.renderEvents, { type: payload.type })
      const renderElement = this.renderEvents[index]
      const typeEvents = renderElement.events
      const eventIindex = this.$_.findIndex(typeEvents, { id: payload.event.id })
      for (let i = 0; i < typeEvents.length; i++) {
        let offset = renderElement.period_offset + i
        let duration = renderElement.period_duration - i
        if (i === eventIindex) {
          offset = renderElement.period_offset + (i + 1)
          duration = renderElement.period_duration - (i + 1)
        } else if (i === eventIindex + 1) {
          offset = renderElement.period_offset + (i - 1)
          duration = renderElement.period_duration - (i - 1)
        }
        await this.updateEvent(typeEvents[i].id, typeEvents[i].itinerary_id, offset, duration)
      }
      loading.close()
    },
    async updateEvent (id, itineraryId, offset, duration) {
      await (new Promise((resolve, reject) => {
        const payload = {
          trip_id: this.$route.params.id,
          itinerary_id: itineraryId,
          id: id,
          begin_offset: offset,
          duration: duration
        }
        this.$store.dispatch('trips/updateItineraryEvent', payload)
          .then(() => {
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      }))
    }
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
          sort: false,
          events: this.$_.filter(events, function (e) {
            return e.begin_offset < dayMorIni && e.begin_offset + e.duration > dayNgtEnd
          })
        },
        {
          type: 'T02', // Começa no dia pela manhã mas não termina nesse dia
          draggable: 'offset',
          offset: 0,
          duration: 100,
          sort: false,
          events: this.$_.filter(events, function (e) {
            return (e.begin_offset >= dayMorIni && e.begin_offset < dayMorEnd) && e.begin_offset + e.duration > dayNgtEnd
          })
        },
        {
          type: 'T03', // Não começa no dia mas termina nesse dia a noite
          draggable: 'duration',
          offset: 0,
          duration: 100,
          sort: false,
          events: this.$_.filter(events, function (e) {
            return e.begin_offset < dayMorIni && (e.begin_offset + e.duration > dayNgtIni && e.begin_offset + e.duration <= dayNgtEnd)
          })
        },
        {
          type: 'T04', // Começa no dia pela manhã e termina no dia a noite
          draggable: 'all',
          offset: 0,
          duration: 100,
          sort: true,
          period_offset: dayMorIni,
          period_duration: 86400,
          events: this.$_.filter(events, function (e) {
            return (e.begin_offset >= dayMorIni && e.begin_offset < dayMorEnd) && (e.begin_offset + e.duration > dayNgtIni && e.begin_offset + e.duration <= dayNgtEnd)
          })
        },
        {
          type: 'T05', // Não Começa nesse dia mas termina no dia pela manhã
          draggable: 'duration',
          offset: 0,
          duration: 32,
          sort: false,
          events: this.$_.filter(events, function (e) {
            return e.begin_offset < dayMorIni && (e.begin_offset + e.duration > dayMorIni && e.begin_offset + e.duration <= dayMorEnd)
          })
        },
        {
          type: 'T06', // Começa e termina no dia pela manhã
          draggable: 'all',
          offset: 0,
          duration: 32,
          sort: true,
          period_offset: dayMorIni,
          period_duration: 21600,
          events: this.$_.filter(events, function (e) {
            return e.begin_offset >= dayMorIni && e.begin_offset + e.duration <= dayMorEnd
          })
        },
        {
          type: 'T07', // Começa no dia pela manhã e termina no dia a tarde
          draggable: 'all',
          offset: 0,
          duration: 66,
          sort: true,
          period_offset: dayMorIni,
          period_duration: 43200,
          events: this.$_.filter(events, function (e) {
            return (e.begin_offset >= dayMorIni && e.begin_offset < dayMorEnd) && (e.begin_offset + e.duration > dayAftIni && e.begin_offset + e.duration <= dayAftEnd)
          })
        },
        {
          type: 'T08', // Não começa no dia mas termina no dia a tarde
          draggable: 'duration',
          offset: 0,
          sort: false,
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
          sort: true,
          period_offset: dayAftIni,
          period_duration: 21600,
          events: this.$_.filter(events, function (e) {
            return e.begin_offset >= dayAftIni && e.begin_offset + e.duration <= dayAftEnd
          })
        },
        {
          type: 'T10', // Começa no dia a tarde e termina no dia a noite
          draggable: 'all',
          offset: 34,
          duration: 66,
          sort: true,
          period_offset: dayAftIni,
          period_duration: 64800,
          events: this.$_.filter(events, function (e) {
            return (e.begin_offset >= dayAftIni && e.begin_offset < dayAftEnd) && (e.begin_offset + e.duration > dayAftEnd && e.begin_offset + e.duration <= dayNgtEnd)
          })
        },
        {
          type: 'T11', //  Começa no dia a tarde não termina no mesmo dia
          draggable: 'offset',
          offset: 34,
          duration: 66,
          sort: false,
          events: this.$_.filter(events, function (e) {
            return (e.begin_offset >= dayAftIni && e.begin_offset < dayAftEnd) && e.begin_offset + e.duration > dayNgtEnd
          })
        },
        {
          type: 'T12', // Começa e termina no dia a noite
          draggable: 'all',
          offset: 68,
          duration: 32,
          sort: true,
          period_offset: dayNgtIni,
          period_duration: 43200,
          events: this.$_.filter(events, function (e) {
            return e.begin_offset >= dayNgtIni && e.begin_offset + e.duration < dayNgtEnd
          })
        },
        {
          type: 'T13', // Começa no dia a noite mas não termina no mesmo dia
          draggable: 'offset',
          offset: 68,
          duration: 32,
          sort: false,
          events: this.$_.filter(events, function (e) {
            return (e.begin_offset >= dayNgtIni && e.begin_offset < dayNgtEnd) && e.begin_offset + e.duration >= dayNgtEnd
          })
        }
      ]
    }
  }
}
</script>
