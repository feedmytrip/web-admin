<template>
  <div class="field is-horizontal">
    <div class="field-body">
      <div class="field">
        <label class="label is-small">Country</label>
        <div class="control is-expanded">
          <div class="select is-fullwidth is-small">
            <select name="country" v-model="locations.country_id">
              <option value=""></option>
              <option
                v-for="(object, index) in countries"
                :key="index"
                :value="object.id"
              >{{ object["title"][languageCode] }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label is-small">Region</label>
        <div class="control is-expanded">
          <div class="select is-fullwidth is-small">
            <select name="country" v-model="locations.region_id">
              <option value=""></option>
              <option
                v-for="(object, index) in regions"
                :key="index"
                :value="object.id"
              >{{ object["title"][languageCode] }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label is-small">Name</label>
        <p class="control has-icons-right">
          <input
            class="input is-small"
            type="text"
            placeholder="Name"
            v-model="locations['title'][languageCode]"
            @keyup.enter="save"
          >
          <span class="icon is-small is-right">
            <i class="fa fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field is-narrow">
        <p class="control" style="padding-top: 24px;">
          <a class="button is-small is-info" @click="save" :class="loading ? 'is-loading' : ''">New</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data () {
    return {
      name: '',
      loading: false,
      locations: {
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
    countries () {
      return this.$_.orderBy(
        this.$_.filter(this.data, {
          country_id: '',
          region_id: ''
        }),
        'title' + this.languageCode,
        'asc'
      )
    },
    regions () {
      return this.$_.orderBy(
        this.$_.filter(this.data, {
          country_id: this.locations.country_id,
          region_id: ''
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
    save () {
      this.loading = true
      this.$store
        .dispatch('auxiliary/newLocation', this.locations)
        .then(result => {
          this.loading = false
        })
    }
  }
}
</script>
