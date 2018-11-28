<template>
  <div>
    <fmt-itinerary-edit v-if="trip" :id="trip.itinerary_id"></fmt-itinerary-edit>
    <fmt-general-edit :trip="trip"></fmt-general-edit>
  </div>
</template>

<script>
import DetailsGeneralEdit from '@/components/trip/DetailsGeneralEdit'
import DetailsItinerary from '@/components/trip/DetailsItinerary'
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
    'fmt-itinerary-edit': DetailsItinerary
  },
  computed: {
    trip () {
      return this.$store.getters['trips/getTrip'](this.$route.params.id)
    }
  }
}
</script>
