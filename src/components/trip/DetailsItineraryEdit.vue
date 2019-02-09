<template>
  <div style="margin-bottom: 25px;">
    <h2 class="subtitle">
      Itinerary ({{ totalDays }})
    </h2>
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label is-small">Start Date</label>
              <div class="control">
                <b-datepicker
                  v-model="start_date"
                  placeholder="Select start date"
                  size="is-small"
                  :editable="true"
                  :date-formatter="(date) => this.$moment(date).format('DD/MM/YYYY')"
                  :date-parser="(date) => this.$moment(date, 'DD/MM/YYYY').toDate()"
                ></b-datepicker>
              </div>
            </div>
            <div class="field">
              <label class="label is-small">End Date</label>
              <div class="control">
                <b-datepicker
                  v-model="end_date"
                  placeholder="Select end date"
                  size="is-small"
                  :editable="true"
                  :date-formatter="(date) => this.$moment(date).format('DD/MM/YYYY')"
                  :date-parser="(date) => this.$moment(date, 'DD/MM/YYYY').toDate()"
                ></b-datepicker>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      start_date: null,
      end_date: null
    }
  },
  async created () {
    if (this.$_.isEmpty(this.itinerary)) {
      const loading = this.$loading.open()
      await this.$store.dispatch('trips/getAllItineraries', this.$route.params.id)
      await this.$store.dispatch('trips/getAllItineraryEvents', { trip_id: this.$route.params.id, itinerary_id: this.id })
      loading.close()
    }
    this.start_date = new Date(this.itinerary.start_date)
    this.end_date = new Date(this.itinerary.end_date)
  },
  computed: {
    itinerary () {
      return this.$store.getters['trips/getTripItinerary'](this.id)
    },
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    },
    totalDays () {
      if (this.start_date === null || this.end_date === null) {
        return 0
      }
      const start = this.$moment([this.start_date.getFullYear(), this.start_date.getMonth(), this.start_date.getDate()])
      const end = this.$moment([this.end_date.getFullYear(), this.end_date.getMonth(), this.end_date.getDate()])
      return end.diff(start, 'days') + 1
    }
  },
  watch: {
    totalDays: function (newTotal, oldTotal) {
      if (newTotal > 30) {
        this.end_date = this.$moment([this.start_date.getFullYear(), this.start_date.getMonth(), this.start_date.getDate()]).add(29, 'days').toDate()
        this.$toast.open({
          duration: 3000,
          message: 'Itinerary can`t have more then 30 days',
          type: 'is-warning'
        })
      }
      if (oldTotal !== 0 && newTotal !== oldTotal && newTotal > 0) {
        this.updateItinerary()
      }
    },
    itinerary: function (newItinerary, oldItinerary) {
      this.start_date = new Date(this.itinerary.start_date)
      this.end_date = new Date(this.itinerary.end_date)
    }
  },
  methods: {
    updateItinerary () {
      this.$store.dispatch('trips/updateItinerary', {
        id: this.id,
        trip_id: this.$route.params.id,
        start_date: this.$moment([this.start_date.getFullYear(), this.start_date.getMonth(), this.start_date.getDate()]).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
        end_date: this.$moment([this.end_date.getFullYear(), this.end_date.getMonth(), this.end_date.getDate()]).format('YYYY-MM-DDTHH:mm:ss.SSSSZ')
      })
        .then(() => {
          this.$toast.open({
            duration: 3000,
            message: 'Itinerary updated',
            type: 'is-success'
          })
        })
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
