<template>
  <div style="margin-bottom: 25px;">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label is-small">Title</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="trip title"
              v-model="trip['title'][languageCode]"
            >
          </div>
        </div>
      </div>
      <div class="column is-2">
        <div class="field">
          <label class="label is-small">Country</label>
          <div class="control">
            <fmt-select
              v-model="trip.country_id"
              :languageCode="languageCode"
              action="auxiliary/getLocationCountries"
              get="auxiliary/locationCountries"
              :dependent="false"
            ></fmt-select>
          </div>
        </div>
      </div>
      <div class="column is-2">
        <div class="field">
          <label class="label is-small">Region</label>
          <div class="control">
            <fmt-select
              v-model="trip.region_id"
              :languageCode="languageCode"
              action="auxiliary/getLocationRegions"
              get="auxiliary/locationRegions"
              empty-mutation="auxiliary/emptyLocationRegions"
              :dependent="true"
              :parent-value="trip.country_id"
            ></fmt-select>
          </div>
        </div>
      </div>
      <div class="column is-2">
        <div class="field">
          <label class="label is-small">City</label>
          <div class="control">
            <fmt-select
              v-model="trip.city_id"
              :languageCode="languageCode"
              action="auxiliary/getLocationCities"
              get="auxiliary/locationCities"
              empty-mutation="auxiliary/emptyLocationCities"
              :dependent="true"
              :parent-value="trip.region_id"
            ></fmt-select>
          </div>
        </div>
      </div>
      <div class="column is-1">
        <div class="field">
          <p class="control is-pulled-right" style="padding-top: 24px;">
            <a
              class="button is-small is-info"
              @click="save"
              :class="loading ? 'is-loading' : ''"
            >Create New</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DynamicSelect from '@/components/common/form/DynamicSelect'
export default {
  components: {
    'fmt-select': DynamicSelect
  },
  data () {
    return {
      loading: false,
      trip: {
        country_id: '',
        region_id: '',
        main_category_id: '',
        title: {
          pt: '',
          es: '',
          en: ''
        }
      }
    }
  },
  computed: {
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    }
  },
  methods: {
    save () {
      this.loading = true
      this.$store.dispatch('trips/new', this.trip)
        .then(result => {
          this.loading = false
          this.trip = {
            title: {
              pt: '',
              es: '',
              en: ''
            }
          }
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
  }
}
</script>
