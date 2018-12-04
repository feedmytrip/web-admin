<template>
  <div>
    <div
      class="subtitle fmt-timeline-day-title"
      @click="isOpen = !isOpen"
    >
      <span @dragover="isOpen = true">
        Day {{ day }}
      </span>
    </div>
    <b-collapse :open.sync="isOpen">
      <div style="position: relative;">
        <div
          class="columns"
          :style="styleObject"
        >
          <div
            class="column is-4 has-text-centered"
            style="border-right:1px dashed #7a7a7a;"
          >
            <span class="icon is-medium">
              <i class="fa fa-lg fa-coffee"></i>
            </span>
            <div>Morning</div>
            <div
              @drop="drop($event, 0, 21600)"
              @dragover="dragover"
              @dragleave="dragleave"
              style="border:2px dashed #ddd; margin: 5px 0; padding: 5px;"
              class="has-text-grey-lighter is-size-7 drop-zone"
            >Drop events here</div>
          </div>
          <div
            class="column is-4 has-text-centered"
            style="border-right:1px dashed #7a7a7a;"
          >
            <span class="icon is-medium">
              <i class="fa fa-lg fa-sun-o"></i>
            </span>
            <div>Afternoon</div>
            <div
              @drop="drop($event, 21600, 21600)"
              @dragover="dragover"
              @dragleave="dragleave"
              style="border:2px dashed #ddd; margin: 5px 0; padding: 5px;"
              class="has-text-grey-lighter is-size-7 drop-zone"
            >Drop events here</div>
          </div>
          <div class="column is-4 has-text-centered">
            <span class="icon is-medium">
              <i class="fa fa-lg fa-moon-o"></i>
            </span>
            <div>Night</div>
            <div
              @drop="drop($event, 43200, 43200)"
              @dragover="dragover"
              @dragleave="dragleave"
              style="border:2px dashed #ddd; margin: 5px 0; padding: 5px;"
              class="has-text-grey-lighter is-size-7 drop-zone"
            >Drop events here</div>
          </div>
        </div>
        <fmt-timeline-events-list
          ref="list"
          :events="events"
          :day="day"
        ></fmt-timeline-events-list>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import TimelineEventsList from './TimelineEventsList'
export default {
  props: ['day', 'itineraryId'],
  components: {
    'fmt-timeline-events-list': TimelineEventsList
  },
  data () {
    return {
      isOpen: true
    }
  },
  computed: {
    events () {
      const events = this.$store.getters['trips/getTripItineraryEvents'].data
      const dayMorIni = 86400 * (this.day - 1)
      const dayNgtEnd = dayMorIni + 86400
      return this.$_.filter(events, function (e) {
        return e.begin_offset >= 0 && ((e.begin_offset >= dayMorIni && e.begin_offset < dayNgtEnd) || (e.begin_offset < dayMorIni && e.begin_offset + e.duration >= dayMorIni))
      })
    },
    styleObject () {
      let h = 120
      if (!this.$_.isEmpty(this.events)) {
        h += (40 * this.events.length)
      }
      return { height: h + 'px' }
    }
  },
  methods: {
    drop (ev, periodOffset, periodDelta) {
      ev.preventDefault()
      ev.target.classList.remove('has-background-info')
      const payload = JSON.parse(ev.dataTransfer.getData('text'))
      let field, value
      const dayOffset = (86400 * (this.day - 1)) + periodOffset
      if (payload.dragging === 'duration') {
        field = 'duration'
        value = (dayOffset + periodDelta) - payload.event.begin_offset
      }
      if (payload.dragging === 'offset') {
        field = 'begin_offset'
        value = dayOffset
      }
      if (value >= 0) {
        this.updateEvent(payload.event.id, field, value)
      } else {
        this.$toast.open({
          duration: 3000,
          message: 'Event finish cannot be less then event start',
          type: 'is-danger'
        })
      }
    },
    updateEvent (id, field, value) {
      const loading = this.$loading.open()
      const payload = {
        trip_id: this.$route.params.id,
        itinerary_id: this.itineraryId,
        id: id
      }
      payload[field] = value
      this.$store.dispatch('trips/updateItineraryEvent', payload)
        .then(() => {
          loading.close()
        })
        .catch(err => {
          console.log(err)
          loading.close()
          this.$toast.open({
            duration: 3000,
            message: err.message,
            type: 'is-danger'
          })
        })
    },
    dragover (ev) {
      if (ev.target.classList.contains('drop-zone')) {
        ev.preventDefault()
        ev.target.classList.add('has-background-info')
      }
    },
    dragleave (ev) {
      if (ev.target.classList.contains('drop-zone')) {
        ev.preventDefault()
        ev.target.classList.remove('has-background-info')
      }
    }
  }
}
</script>

<style>
.fmt-timeline-day-title {
  border-bottom: 1px solid #7a7a7a;
  padding-bottom: 10px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  cursor: pointer;
}
</style>
