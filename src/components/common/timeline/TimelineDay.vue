<template>
  <div>
    <div style="border-bottom:1px solid #7a7a7a; padding-bottom: 10px; margin-bottom: 15px;">
      <h2
        class="subtitle"
        style="padding-bottom: 10px; cursor:pointer;"
        @click="isOpen = !isOpen"
      >Day {{ day }}</h2>
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
              @drop="dropMorning"
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
              @drop="dropAfternoon"
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
              @drop="dropNight"
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
      const d = this.day
      return this.$_.filter(events, function (e) { return e.begin_offset >= 86400 * (d - 1) && e.begin_offset < 86400 * d })
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
    dropMorning (ev) {
      ev.preventDefault()
      ev.target.classList.remove('has-background-info')
      const id = ev.dataTransfer.getData('text')
      this.updateEvent(id, 86400 * (this.day - 1))
    },
    dropAfternoon (ev) {
      ev.preventDefault()
      ev.target.classList.remove('has-background-info')
      const id = ev.dataTransfer.getData('text')
      this.updateEvent(id, (86400 * (this.day - 1)) + 21600)
    },
    dropNight (ev) {
      ev.preventDefault()
      ev.target.classList.remove('has-background-info')
      const id = ev.dataTransfer.getData('text')
      this.updateEvent(id, (86400 * (this.day - 1)) + 43200)
    },
    updateEvent (id, offset) {
      const loading = this.$loading.open()
      const payload = {
        trip_id: this.$route.params.id,
        itinerary_id: this.itineraryId,
        id: id,
        begin_offset: offset
      }
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
