<template>
  <div style="margin-bottom: 45px;" ref="element">
    <div class="columns">
      <div class="column is-8">
        <h2 class="subtitle">Itinerary: Padrão</h2>
      </div>
      <div class="column">
        <div class="field is-horizontal">
          <div class="field-label is-small">
            <label class="label" style="width:70px;">Start date</label>
          </div>
          <div class="field-body">
            <div class="field">
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
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field is-horizontal">
          <div class="field-label is-small">
            <label class="label" style="width:70px;">End date</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <b-datepicker
                  v-model="end_date"
                  placeholder="Select end date"
                  size="is-small"
                  :editable="true"
                  position="is-bottom-left"
                  :date-formatter="(date) => this.$moment(date).format('DD/MM/YYYY')"
                  :date-parser="(date) => this.$moment(date, 'DD/MM/YYYY').toDate()"
                ></b-datepicker>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-multiline is-mobile">
      <fmt-itinerary-day ref="events" v-for="n in totalDays" :key="n" :day="n" :itinerary-id="id"></fmt-itinerary-day>
    </div>
  </div>
</template>

<script>
import ItineraryDay from '@/components/trip/DetailsItineraryDay'
export default {
  props: ['id'],
  components: {
    'fmt-itinerary-day': ItineraryDay
  },
  data () {
    return {
      start_date: null,
      end_date: null
    }
  },
  async mounted () {
    if (this.$_.isEmpty(this.itinerary)) {
      const loading = this.$loading.open({
        container: this.$refs.element.$el
      })
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
      if (oldTotal !== 0 && newTotal !== oldTotal && newTotal > 0) {
        this.updateItinerary()
      }
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
