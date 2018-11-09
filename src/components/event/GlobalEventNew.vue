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
            <div class="select is-fullwidth is-small">
              <select name="mainCategory" v-model="event.mainCategoryId">
                <option value=""></option>
                <option
                  v-for="(object, index) in mainCategories"
                  :key="index"
                  :value="object.categoryId"
                >{{ object["title"][languageCode] }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="field">
          <label class="label is-small">Secondary category</label>
          <div class="control">
            <div class="select is-small is-fullwidth">
              <select name="secondaryCategory" v-model="event.secondaryCategoryId">
                <option value=""></option>
                <option
                  v-for="(object, index) in secondaryCategories"
                  :key="index"
                  :value="object.categoryId"
                >{{ object["title"][languageCode] }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-2">
        <div class="field">
          <label class="label is-small">Country</label>
          <div class="control">
            <div class="select is-small is-fullwidth">
              <select name="country" v-model="event.countryId">
                <option value=""></option>
                <option
                  v-for="(object, index) in countries"
                  :key="index"
                  :value="object.geonameId"
                >{{ object["title"][languageCode] }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-2">
        <div class="field">
          <label class="label is-small">Region</label>
          <div class="control">
            <div class="select is-small is-fullwidth">
              <select name="region" v-model="event.regionId">
                <option value=""></option>
                <option
                  v-for="(object, index) in regions"
                  :key="index"
                  :value="object.geonameId"
                >{{ object["title"][languageCode] }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-2">
        <div class="field">
          <label class="label is-small">City</label>
          <div class="control">
            <div class="select is-small is-fullwidth">
              <select name="city" v-model="event.cityId">
                <option value=""></option>
                <option
                  v-for="(object, index) in cities"
                  :key="index"
                  :value="object.geonameId"
                >{{ object["title"][languageCode] }}</option>
              </select>
            </div>
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
export default {
  props: ['categories', 'locations'],
  data () {
    return {
      loading: false,
      event: {
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
    mainCategories () {
      return this.$_.orderBy(
        this.$_.filter(this.categories, { mainCategoryId: '' }),
        'title' + this.languageCode,
        'asc'
      )
    },
    secondaryCategories () {
      if (this.event.mainCategoryId === '') {
        return []
      }
      return this.$_.orderBy(
        this.$_.filter(this.categories, { mainCategoryId: this.event.mainCategoryId }),
        'title' + this.languageCode,
        'asc'
      )
    },
    countries () {
      return this.$_.orderBy(
        this.$_.filter(this.locations, { countryId: 'none', regionId: 'none' }),
        'title' + this.languageCode,
        'asc'
      )
    },
    regions () {
      return this.$_.orderBy(
        this.$_.filter(this.locations, { countryId: this.event.countryId, regionId: 'none' }),
        'title' + this.languageCode,
        'asc'
      )
    },
    cities () {
      return this.$_.orderBy(
        this.$_.filter(this.locations, { countryId: this.event.countryId, regionId: this.event.regionId }),
        'title' + this.languageCode,
        'asc'
      )
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
