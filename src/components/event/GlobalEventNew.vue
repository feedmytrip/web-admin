<template>
  <div style="margin-bottom: 25px;">
    <div class="columns">
      <div class="column is-6">
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
      <div class="column is-3">
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
      <div class="column is-3">
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
      <div class="column is-2">
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
      <div class="column is-2">
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
      <div class="column is-2">
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
      <div class="column is-1">
        <div class="field">
          <p
            class="control is-pulled-right"
            style="padding-top: 24px;"
          >
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
      event: {
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
      this.$store.dispatch('events/new', this.event)
        .then(result => {
          this.loading = false
          this.event = {
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
