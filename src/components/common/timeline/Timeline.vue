<template>
  <div>
    <div
      class="icon has-text-danger is-pulled-right"
      @drop="drop"
      @dragover="dragover"
      @dragleave="dragleave"
      style="height: 2.5rem; width: 2.5rem;"
      :style="dropZoneStyle"
    >
      <i class="fa fa-lg fa-trash"></i>
    </div>
    <div class="subtitle">Timeline</div>
    <fmt-timeline-add :itinerary-id="itineraryId"></fmt-timeline-add>
    <fmt-timeline-unplanned
      ref="element"
      :total-days="totalDays"
      @delete-unplanned="deleteEvent"
    ></fmt-timeline-unplanned>
    <fmt-timeline-day
      v-for="(value, key) in totalDays"
      :key="key"
      :day="value"
      :itinerary-id="itineraryId"
    ></fmt-timeline-day>
  </div>
</template>

<script>
import TimelineAdd from './TimelineAddEvent'
import TimelineDay from './TimelineDay'
import TimelineUnplanned from './TimelineUnplannedList'
export default {
  props: ['itineraryId'],
  async created () {
    if (this.$_.isEmpty(this.events) || this.events[0].itinerary_id !== this.itineraryId) {
      const loading = this.$loading.open()
      const payload = {
        id: this.$route.params.id,
        itinerary_id: this.itineraryId
      }
      await this.$store.dispatch('trips/getAllItineraryEvents', payload)
      loading.close()
    }
  },
  components: {
    'fmt-timeline-add': TimelineAdd,
    'fmt-timeline-day': TimelineDay,
    'fmt-timeline-unplanned': TimelineUnplanned
  },
  data () {
    return {
      dropZoneStyle: {}
    }
  },
  computed: {
    itinerary () {
      return this.$store.getters['trips/getTripItinerary'](this.itineraryId)
    },
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    },
    totalDays () {
      if (this.$_.isEmpty(this.itinerary) || this.itinerary.start_date === null || this.itinerary.end_date === null) {
        return 0
      }
      const startDate = new Date(this.itinerary.start_date)
      const endDate = new Date(this.itinerary.end_date)
      const start = this.$moment([startDate.getFullYear(), startDate.getMonth(), startDate.getDate()])
      const end = this.$moment([endDate.getFullYear(), endDate.getMonth(), endDate.getDate()])
      return end.diff(start, 'days') + 1
    },
    events () {
      return this.$store.getters['trips/getTripItineraryEvents'].data
    }
  },
  methods: {
    drop (ev) {
      ev.preventDefault()
      this.dropZoneStyle = {}
      const id = ev.dataTransfer.getData('text')
      this.deleteEvent(id)
    },
    dragover (ev) {
      ev.preventDefault()
      this.dropZoneStyle = {
        border: '2px dashed #ddd'
      }
    },
    dragleave (ev) {
      ev.preventDefault()
      this.dropZoneStyle = {}
    },
    deleteEvent (id) {
      const loading = this.$loading.open()
      const payload = {
        trip_id: this.$route.params.id,
        itinerary_id: this.itineraryId,
        id: id
      }
      this.$store.dispatch('trips/deleteItineraryEvent', payload)
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
    }
  }
}
</script>
