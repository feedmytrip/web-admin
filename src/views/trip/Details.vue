<template>
  <div class="columns">
    <div class="column">
      <fmt-itinerary-edit
        v-if="trip"
        :id="trip.itinerary_id"
      ></fmt-itinerary-edit>
      <fmt-general-edit
        v-if="trip"
        :trip="trip"
      ></fmt-general-edit>
    </div>
    <div class="column is-10">
      <fmt-timeline
        v-if="trip"
        :itinerary-id="trip.itinerary_id"
      ></fmt-timeline>
    </div>
  </div>
</template>

<script>
import DetailsGeneralEdit from '@/components/trip/DetailsGeneralEdit'
import DetailsItineraryEdit from '@/components/trip/DetailsItineraryEdit'
import Timeline from '@/components/common/timeline/Timeline'
export default {
  async created () {
    if (this.$_.isEmpty(this.trip)) {
      const loading = this.$loading.open()
      await this.$store.dispatch('trips/get', this.$route.params.id)
      loading.close()
    }
  },
  components: {
    'fmt-general-edit': DetailsGeneralEdit,
    'fmt-itinerary-edit': DetailsItineraryEdit,
    'fmt-timeline': Timeline
  },
  computed: {
    trip () {
      return this.$store.getters['trips/getTrip'](this.$route.params.id)
    }
  }
}
</script>
