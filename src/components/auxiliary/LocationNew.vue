<template>
  <div class="field is-horizontal">
    <div class="field-body">
      <div class="field">
        <label class="label is-small">Country</label>
        <div class="control is-expanded">
          <div class="select is-fullwidth is-small">
            <select name="country" v-model="geoname.countryId">
              <option value=""></option>
              <option v-for="(object, index) in countries" :key="index" :value="object.geonameId">
                {{ object['title'][languageCode] }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label is-small">Region</label>
        <div class="control is-expanded">
          <div class="select is-fullwidth is-small">
            <select name="country" v-model="geoname.regionId">
              <option value=""></option>
              <option v-for="(object, index) in regions" :key="index" :value="object.geonameId">
                {{ object['title'][languageCode] }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label is-small">Name</label>
        <p class="control has-icons-right">
          <input class="input is-small" type="text" placeholder="Name" v-model="geoname['title'][languageCode]" @keyup.enter="save">
          <span class="icon is-small is-right">
            <i class="fa fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field is-narrow">
        <p class="control" style="padding-top: 24px;">
          <a class="button is-small is-info" @click="save" :class="loading ? 'is-loading' : ''">
            New
          </a>
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
    data() {
      return {
        name: '',
        loading: false,
        geoname: {
          countryId: '',
          regionId: '',
          title: {
            pt: '',
            es: '',
            en: ''
          }
        }
      }
    },
    computed: {
      countries() {
        return this.$_.orderBy(this.$_.filter(this.data, {
          'countryId': 'none',
          'regionId': 'none'
        }), 'title'+this.languageCode, 'asc')
      },
      regions() {
        return this.$_.orderBy(this.$_.filter(this.data, {
          'countryId': this.geoname.countryId,
          'regionId': 'none'
        }), 'title'+this.languageCode, 'asc')
      },
      languageCode() {
        return this.$store.getters['auth/userLanguageCode']
      }
    },
    methods: {
      save() {
        this.loading = true
        this.$store.dispatch('auxiliary/newGeoname', this.geoname)
          .then(result => {
            this.loading = false
          })
      }
    }

  }
</script>