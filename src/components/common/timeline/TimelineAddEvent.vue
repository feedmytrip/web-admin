<template>
  <div style="margin-bottom: 25px;">
    <b-autocomplete
      v-model="filter"
      size="is-small"
      ref="autocomplete"
      :data="globalEvents"
      :field="'title.'+languageCode"
      placeholder="Add new events"
      :loading="isFetching"
      @input="getAsyncEventData"
      @select="AddItineraryEvent"
    >
      <template slot="header">
        <a @click="AddNewGlobalEvent">
          <span>Add new event...</span>
        </a>
      </template>
      <template slot="empty">No results for {{filter}}</template>
    </b-autocomplete>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import TimelineNewEvent from './TimelineNewEvent.vue'
export default {
  props: ['itineraryId'],
  data () {
    return {
      isFetching: false,
      filter: ''
    }
  },
  computed: {
    globalEvents () {
      return this.$store.getters['events/all'].data
    },
    trip () {
      return this.$store.getters['trips/getTrip'](this.$route.params.id)
    },
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    }
  },
  methods: {
    getAsyncEventData: debounce(async function () {
      let payload = '?page=1&filter=' + this.filter
      if (!this.$_.isEmpty(this.trip.country_id)) {
        payload += '&country_id=' + this.trip.country_id
      }
      if (!this.$_.isEmpty(this.trip.region_id)) {
        payload += '&region_id=' + this.trip.region_id
      }
      if (!this.$_.isEmpty(this.trip.city_id)) {
        payload += '&city_id=' + this.trip.city_id
      }
      this.isFetching = true
      await this.$store.dispatch('events/getAll', payload)
      this.isFetching = false
    }, 500),
    AddNewGlobalEvent () {
      this.$modal.open({
        parent: this,
        component: TimelineNewEvent,
        hasModalCard: true,
        props: {
          title: this.filter
        },
        events: {
          created: this.AddItineraryEvent
        }
      })
    },
    AddItineraryEvent (event) {
      const payload = {
        trip_id: this.$route.params.id,
        itinerary_id: this.itineraryId,
        global_id: event.id,
        event: {
          begin_offset: -1 // unplanned
        }
      }
      console.log(payload)
      this.$store.dispatch('trips/addItineraryEvent', payload)
        .catch(err => {
          console.log(err)
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
