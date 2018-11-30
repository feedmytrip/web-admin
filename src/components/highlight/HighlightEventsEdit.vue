<template>
  <div class="content">
    <h2 class="subtitle">Highlight Events</h2>
    <ol type="1">
      <li
        v-for="(event, key) in events"
        :key="key"
      > {{ event.title.pt }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  props: ['highlight'],
  async created () {
    if (!this.$_.isEmpty(this.highlight)) {
      let payload = '?page=1&sort=created_date&filter=' + this.highlight.filter
      const loading = this.$loading.open()
      await this.$store.dispatch('highlights/getAllEvents', payload)
      loading.close()
    }
  },
  computed: {
    events () {
      return this.$store.getters['highlights/events'].data
    },
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    }
  },
  watch: {
    highlight: async function () {
      let payload = '?page=1&sort=created_date&filter=' + this.highlight.filter
      const loading = this.$loading.open()
      await this.$store.dispatch('highlights/getAllEvents', payload)
      loading.close()
    }
  }
}
</script>
