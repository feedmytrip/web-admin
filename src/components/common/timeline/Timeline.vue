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
    <div
      class="columns"
      style="margin: 0px"
    >
      <div
        class="column is-4"
        style="padding-left: 0px"
      >
        <fmt-timeline-append :itinerary-id="itineraryId"></fmt-timeline-append>
      </div>
      <div class="column">
        <fmt-timeline-add :itinerary-id="itineraryId"></fmt-timeline-add>
      </div>
    </div>
    <fmt-timeline-unplanned
      ref="element"
      :total-days="totalDays"
      @delete-unplanned="deleteEvent"
    ></fmt-timeline-unplanned>
    <div class="fmt-scroll fmt-timeline-scroll">
      <fmt-timeline-day
        v-for="(value, key) in totalDays"
        :key="key"
        :day="value"
        :itinerary-id="itineraryId"
      ></fmt-timeline-day>
    </div>
  </div>
</template>

<script>
import TimelineAdd from './TimelineAddEvent'
import TimelineAppendItinerary from './TimelineAppendItinerary'
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
    'fmt-timeline-unplanned': TimelineUnplanned,
    'fmt-timeline-append': TimelineAppendItinerary
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
      const payload = JSON.parse(ev.dataTransfer.getData('text'))
      this.deleteEvent(payload.event.id)
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

<style>
.fmt-timeline-scroll {
  overflow-y: auto;
  max-height: 700px;
  overflow-x: hidden;
  padding-right: 8px;
}
.fmt-scroll::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background-color: #f5f5f5;
}

.fmt-scroll::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

.fmt-scroll::-webkit-scrollbar-thumb {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #ddd;
}
</style>
