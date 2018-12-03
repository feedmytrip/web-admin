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
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    }
  },
  methods: {
    getAsyncEventData: debounce(async function () {
      const payload = '?page=1&filter=' + this.filter
      this.isFetching = true
      await this.$store.dispatch('events/getAll', payload)
      this.isFetching = false
    }, 500),
    AddNewGlobalEvent () {
      this.$dialog.prompt({
        message: 'New Event',
        inputAttrs: {
          placeholder: 'event title',
          value: this.filter
        },
        confirmText: 'Add',
        onConfirm: (value) => {
          const event = {
            title: {}
          }
          event['title'][this.languageCode] = value
          this.$store.dispatch('events/new', event)
            .then(response => {
              this.AddItineraryEvent(response)
            })
            .catch(err => {
              console.log(err)
              this.loading = false
              this.$toast.open({
                duration: 3000,
                message: err.message,
                type: 'is-danger'
              })
            })
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
