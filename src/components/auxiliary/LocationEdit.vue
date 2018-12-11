<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Location</p>
    </header>
    <div
      class="card-content"
      v-if="loading"
    >
      <span class="icon has-text-info has-text-centerd">
        <i class="fa fa-spinner fa-pulse"></i>
      </span>
    </div>
    <div
      class="card-content"
      v-if="!loading"
    >
      <div class="content">
        <div class="field">
          <label class="label is-small">Country</label>
          <div class="control">
            <fmt-select
              v-model="location.country_id"
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
              v-model="location.region_id"
              :languageCode="languageCode"
              action="auxiliary/getLocationRegions"
              get="auxiliary/locationRegions"
              empty-mutation="auxiliary/emptyLocationRegions"
              :dependent="true"
              :parent-value="location.country_id"
            ></fmt-select>
          </div>
        </div>
        <div class="field">
          <label class="label is-small">Title PT</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="PT"
              v-model="location['title.pt']"
            >
          </div>
        </div>
        <div class="field">
          <label class="label is-small">Title ES</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="PT"
              v-model="location['title.es']"
            >
          </div>
        </div>
        <div class="field">
          <label class="label is-small">Title EN</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="PT"
              v-model="location['title.en']"
            >
          </div>
        </div>
      </div>
    </div>
    <footer
      class="card-footer is-size-7"
      v-if="!loading"
    >
      <a
        href="#"
        class="card-footer-item has-text-primary is-loading"
        @click="update"
      >Save</a>
      <a
        href="#"
        class="card-footer-item"
        @click="$parent.close();"
      >Cancel</a>
    </footer>
  </div>
</template>

<script>
import DynamicSelect from '@/components/common/form/DynamicSelect'
export default {
  components: {
    'fmt-select': DynamicSelect
  },
  props: ['itemId', 'data'],
  created () {
    const index = this.$_.findIndex(this.data, { id: this.itemId })
    this.location['title.pt'] = this.data[index].title.pt
    this.location['title.es'] = this.data[index].title.es
    this.location['title.en'] = this.data[index].title.en
    this.location.region_id = this.data[index].region_id
    this.location.country_id = this.data[index].country_id
    this.location.id = this.itemId
  },
  data () {
    return {
      loading: false,
      location: {}
    }
  },
  computed: {
    countries () {
      return this.$_.orderBy(
        this.$_.filter(this.data, {
          country_id: 'none',
          region_id: 'none'
        }),
        'title' + this.languageCode,
        'asc'
      )
    },
    regions () {
      return this.$_.orderBy(
        this.$_.filter(this.data, {
          country_id: this.location.country_id,
          region_id: 'none'
        }),
        'title' + this.languageCode,
        'asc'
      )
    },
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    }
  },
  methods: {
    update () {
      this.loading = true
      this.$store
        .dispatch('auxiliary/updateLocation', this.location)
        .then(result => {
          this.loading = false
          this.$parent.close()
        })
        .catch(err => {
          this.loading = false
          this.$parent.close()
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
