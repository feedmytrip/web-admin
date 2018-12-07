<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">New Event</p>
    </header>
    <section class="modal-card-body">
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label is-small">Title</label>
            <div class="control">
              <input
                class="input is-small"
                type="text"
                placeholder="Event title"
                v-model="event['title'][languageCode]"
              >
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label is-small">Main Category</label>
            <div class="control is-expanded">
              <fmt-select
                v-model="event.main_category_id"
                :languageCode="languageCode"
                action="auxiliary/getMainCategories"
                get="auxiliary/mainCategories"
                :dependent="false"
              ></fmt-select>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label is-small">Secondary category</label>
            <div class="control">
              <fmt-select
                v-model="event.secondary_category_id"
                :languageCode="languageCode"
                action="auxiliary/getSecondaryCategories"
                get="auxiliary/secondaryCategories"
                empty-mutation="auxiliary/emptySecondaryCategories"
                :dependent="true"
                :parent-value="event.main_category_id"
              ></fmt-select>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label is-small">Address</label>
            <div class="control">
              <input
                class="input is-small"
                type="text"
                placeholder="Event address"
                v-model="event.address"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label is-small">Country</label>
            <div class="control">
              <fmt-select
                v-model="event.country_id"
                :languageCode="languageCode"
                action="auxiliary/getLocationCountries"
                get="auxiliary/locationCountries"
                :dependent="false"
              ></fmt-select>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label is-small">Region</label>
            <div class="control">
              <fmt-select
                v-model="event.region_id"
                :languageCode="languageCode"
                action="auxiliary/getLocationRegions"
                get="auxiliary/locationRegions"
                empty-mutation="auxiliary/emptyLocationRegions"
                :dependent="true"
                :parent-value="event.country_id"
              ></fmt-select>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label is-small">City</label>
            <div class="control">
              <fmt-select
                v-model="event.city_id"
                :languageCode="languageCode"
                action="auxiliary/getLocationCities"
                get="auxiliary/locationCities"
                empty-mutation="auxiliary/emptyLocationCities"
                :dependent="true"
                :parent-value="event.region_id"
              ></fmt-select>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button
        class="button"
        type="button"
        @click="$parent.close()"
      >Close</button>
      <button
        class="button is-primary"
        @click="save"
      >Save</button>
    </footer>
  </div>
</template>

<script>
import DynamicSelect from '@/components/common/form/DynamicSelect'
export default {
  components: {
    'fmt-select': DynamicSelect
  },
  props: ['title'],
  mounted () {
    this.event['title'][this.languageCode] = this.title
    this.event.country_id = this.trip.country_id
    this.event.region_id = this.trip.region_id
    this.event.city_id = this.trip.city_id
  },
  data () {
    return {
      event: {
        main_category_id: '',
        country_id: '',
        region_id: '',
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
    },
    trip () {
      return this.$store.getters['trips/getTrip'](this.$route.params.id)
    }
  },
  methods: {
    save () {
      this.$store.dispatch('events/new', this.event)
        .then(response => {
          this.$emit('created', response)
          this.$emit('close')
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
