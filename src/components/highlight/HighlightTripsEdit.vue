<template>
  <div class="content">
    <h2 class="subtitle">Highlight Trips</h2>
    <ol type="1">
      <li
        v-for="(trip, key) in trips"
        :key="key"
      > {{ trip.title.pt }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  props: ['highlight'],
  async created () {
    if (!this.$_.isEmpty(this.highlight)) {
      let payload = '?page=1&sort=created_date&scope=global&filter=' + this.highlight.filter
      const loading = this.$loading.open()
      await this.$store.dispatch('highlights/getAllTrips', payload)
      loading.close()
    }
  },
  computed: {
    trips () {
      return this.$store.getters['highlights/trips'].data
    },
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    }
  },
  watch: {
    highlight: async function () {
      let payload = '?page=1&sort=created_date&scope=global&filter=' + this.highlight.filter
      const loading = this.$loading.open()
      await this.$store.dispatch('highlights/getAllTrips', payload)
      loading.close()
    }
  }
}
</script>
