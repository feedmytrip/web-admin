<template>
  <div class="field has-addons">
    <div class="control is-expanded">
      <div
        class="select is-small is-fullwidth"
        :class="loading ? 'is-loading' : ''"
      >
        <select v-model="selected">
          <option value=""></option>
          <option
            v-for="(object, index) in options"
            :key="index"
            :value="object.id"
          >{{ object["trip_title"][languageCode] }}</option>
        </select>
      </div>
    </div>
    <div class="control">
      <button
        type="submit"
        class="button is-small is-info"
        @click="appendItinerary"
      >Append Trip</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['itineraryId'],
  data () {
    return {
      selected: '',
      loading: false
    }
  },
  async mounted () {
    this.loading = true
    let payload = '?trip.active=1&order=asc&sort=trip_title.' + this.languageCode
    if (!this.$_.isEmpty(this.trip.country_id)) {
      payload += '&trip.country_id=' + this.trip.country_id
    }
    if (!this.$_.isEmpty(this.trip.region_id)) {
      payload += '&trip.region_id=' + this.trip.region_id
    }
    if (!this.$_.isEmpty(this.trip.city_id)) {
      payload += '&trip.city_id=' + this.trip.city_id
    }
    await this.$store.dispatch('itineraries/getAllGlobal', payload)
    this.loading = false
  },
  computed: {
    options () {
      return this.$store.getters['itineraries/all'].data
    },
    trip () {
      return this.$store.getters['trips/getTrip'](this.$route.params.id)
    },
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    }
  },
  methods: {
    appendItinerary () {
      let payload = {
        trip_id: this.$route.params.id,
        itinerary_id: this.itineraryId,
        append_itinerary_id: this.selected
      }
      const loading = this.$loading.open()
      this.$store.dispatch('trips/appendItinerary', payload)
        .then(async () => {
          await this.$store.dispatch('trips/getAllItineraryEvents', { trip_id: this.$route.params.id, itinerary_id: this.itineraryId })
          await this.$store.dispatch('trips/getAllItineraries', this.$route.params.id)
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
      this.selected = ''
    }
  }
}
</script>
