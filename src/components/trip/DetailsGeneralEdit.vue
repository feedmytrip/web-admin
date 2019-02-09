<template>
  <div>
    <h2 class="subtitle">General</h2>
    <div class="card">
      <div class="card-content fmt-scroll fmt-trip-general-edit-scroll">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label is-small">Title PT</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="Trip title pt"
                  v-model="tripEdit['title.pt']"
                >
              </div>
            </div>
            <div class="field">
              <label class="label is-small">Title ES</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="Trip title ES"
                  v-model="tripEdit['title.es']"
                >
              </div>
            </div>
            <div class="field">
              <label class="label is-small">Title EN</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="Trip title EN"
                  v-model="tripEdit['title.en']"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label is-small">Country</label>
              <div class="control is-expanded">
                <fmt-select
                  v-model="tripEdit.country_id"
                  :languageCode="languageCode"
                  action="auxiliary/getLocationCountries"
                  get="auxiliary/locationCountries"
                  :dependent="false"
                ></fmt-select>
              </div>
            </div>
            <div class="field">
              <label class="label is-small">Region</label>
              <div class="control">
                <fmt-select
                  v-model="tripEdit.region_id"
                  :languageCode="languageCode"
                  action="auxiliary/getLocationRegions"
                  get="auxiliary/locationRegions"
                  empty-mutation="auxiliary/emptyLocationRegions"
                  :dependent="true"
                  :parent-value="tripEdit.country_id"
                ></fmt-select>
              </div>
            </div>
            <div class="field">
              <label class="label is-small">City</label>
              <div class="control">
                <fmt-select
                  v-model="tripEdit.city_id"
                  :languageCode="languageCode"
                  action="auxiliary/getLocationCities"
                  get="auxiliary/locationCities"
                  empty-mutation="auxiliary/emptyLocationCities"
                  :dependent="true"
                  :parent-value="tripEdit.region_id"
                ></fmt-select>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label is-small">Description PT</label>
              <div class="control">
                <textarea
                  class="textarea is-small"
                  rows="2"
                  placeholder="Trip description pt"
                  v-model="tripEdit['description.pt']"
                ></textarea>
              </div>
            </div>
            <div class="field">
              <label class="label is-small">Description ES</label>
              <div class="control">
                <textarea
                  class="textarea is-small"
                  rows="2"
                  placeholder="Trip description ES"
                  v-model="tripEdit['description.es']"
                ></textarea>
              </div>
            </div>
            <div class="field">
              <label class="label is-small">Description EN</label>
              <div class="control">
                <textarea
                  class="textarea is-small"
                  rows="2"
                  placeholder="Trip description EN"
                  v-model="tripEdit['description.en']"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <div class="field">
              <p class="control is-pulled-right">
                <a
                  class="button is-small is-info"
                  @click="save"
                  :class="loading ? 'is-loading' : ''"
                >Save</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DynamicSelect from '@/components/common/form/DynamicSelect'
export default {
  props: ['trip'],
  components: {
    'fmt-select': DynamicSelect
  },
  mounted () {
    if (!this.$_.isEmpty(this.trip)) {
      this.tripEdit.id = this.trip.id
      this.tripEdit.country_id = this.trip.country_id
      this.tripEdit.region_id = this.trip.region_id
      this.tripEdit.city_id = this.trip.city_id
      this.tripEdit['title.pt'] = this.trip.title.pt
      this.tripEdit['title.es'] = this.trip.title.es
      this.tripEdit['title.en'] = this.trip.title.en
      this.tripEdit['description.pt'] = this.trip.description.pt
      this.tripEdit['description.es'] = this.trip.description.es
      this.tripEdit['description.en'] = this.trip.description.en
    }
  },
  data () {
    return {
      loading: false,
      tripEdit: {
        id: '',
        country_id: '',
        region_id: '',
        city_id: '',
        'title.pt': '',
        'title.es': '',
        'title.en': '',
        'description.pt': '',
        'description.es': '',
        'description.en': ''
      }
    }
  },
  computed: {
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    }
  },
  watch: {
    trip: function () {
      this.tripEdit.id = this.trip.id
      this.tripEdit.country_id = this.trip.country_id
      this.tripEdit.region_id = this.trip.region_id
      this.tripEdit.city_id = this.trip.city_id
      this.tripEdit['title.pt'] = this.trip.title.pt
      this.tripEdit['title.es'] = this.trip.title.es
      this.tripEdit['title.en'] = this.trip.title.en
      this.tripEdit['description.pt'] = this.trip.description.pt
      this.tripEdit['description.es'] = this.trip.description.es
      this.tripEdit['description.en'] = this.trip.description.en
    }
  },
  methods: {
    save () {
      this.loading = true
      this.$store.dispatch('trips/update', this.tripEdit)
        .then(() => {
          this.loading = false
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

<style>
.fmt-trip-general-edit-scroll {
  overflow-y: auto;
  max-height: 450px;
  overflow-x: hidden;
}
</style>
