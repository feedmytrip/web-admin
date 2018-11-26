<template>
  <div>
    <h2 class="subtitle">Location</h2>
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column is-2">
            <div class="field">
              <label class="label is-small">Country</label>
              <div class="control">
                <fmt-select
                  v-model="eventEdit.country_id"
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
                  v-model="eventEdit.region_id"
                  :languageCode="languageCode"
                  action="auxiliary/getLocationRegions"
                  get="auxiliary/locationRegions"
                  empty-mutation="auxiliary/emptyLocationRegions"
                  :dependent="true"
                  :parent-value="eventEdit.country_id"
                ></fmt-select>
              </div>
            </div>
          </div>
          <div class="column is-2">
            <div class="field">
              <label class="label is-small">City</label>
              <div class="control">
                <fmt-select
                  v-model="eventEdit.city_id"
                  :languageCode="languageCode"
                  action="auxiliary/getLocationCities"
                  get="auxiliary/locationCities"
                  empty-mutation="auxiliary/emptyLocationCities"
                  :dependent="true"
                  :parent-value="eventEdit.region_id"
                ></fmt-select>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label is-small">Address</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="Event address"
                  v-model="eventEdit.address"
                >
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
  components: {
    'fmt-select': DynamicSelect
  },
  props: ['event'],
  mounted () {
    if (this.event) {
      this.eventEdit.id = this.event.id
      this.eventEdit.country_id = this.event.country_id
      this.eventEdit.region_id = this.event.region_id
      this.eventEdit.city_id = this.event.city_id
      this.eventEdit.address = this.event.address
    }
  },
  data () {
    return {
      loading: false,
      eventEdit: {
        id: '',
        country_id: '',
        region_id: '',
        city_id: '',
        address: ''
      }
    }
  },
  computed: {
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    }
  },
  watch: {
    event: function () {
      this.eventEdit.id = this.event.id
      this.eventEdit.country_id = this.event.country_id
      this.eventEdit.region_id = this.event.region_id
      this.eventEdit.city_id = this.event.city_id
      this.eventEdit.address = this.event.address
    }
  },
  methods: {
    save () {
      this.loading = true
      this.$store.dispatch('events/update', this.eventEdit)
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
