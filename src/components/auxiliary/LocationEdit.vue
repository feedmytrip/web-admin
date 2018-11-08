<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Location
      </p>
    </header>
    <div class="card-content" v-if="loading">
     <span class="icon has-text-info has-text-centerd">
        <i class="fa fa-spinner fa-pulse"></i>
      </span>
    </div>
    <div class="card-content" v-if="!loading">
      <div class="content">
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
          <label class="label is-small">Title PT</label>
          <div class="control">
            <input class="input is-small" type="text" placeholder="PT" v-model="geoname.title.pt">
          </div>
        </div>
        <div class="field">
          <label class="label is-small">Title ES</label>
          <div class="control">
            <input class="input is-small" type="text" placeholder="PT" v-model="geoname.title.es">
          </div>
        </div>
        <div class="field">
          <label class="label is-small">Title EN</label>
          <div class="control">
            <input class="input is-small" type="text" placeholder="PT" v-model="geoname.title.en">
          </div>
        </div>
      </div>
    </div>
    <footer class="card-footer is-size-7" v-if="!loading">
      <a href="#" class="card-footer-item has-text-primary is-loading" @click="update">Save</a>
      <a href="#" class="card-footer-item" @click="$parent.close()">Cancel</a>
    </footer>
  </div>
</template>

<script>
  export default {
    props: ['itemId', 'data'],
    created() {
      const index = _.findIndex(this.data, {'geonameId': this.itemId})
      this.geoname = JSON.parse(JSON.stringify( this.data[index] ))
    },
    data() {
      return {
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
      update() {
        this.loading = true
        this.$store.dispatch('auxiliary/updateGeoname', this.geoname)
        .then( result => {
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
        });
      }
    }
  }
</script>
