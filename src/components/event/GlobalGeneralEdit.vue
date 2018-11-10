<template>
  <div>
    <h2 class="subtitle">General</h2>
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label is-small">Title PT</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="Event title pt"
                  v-model="eventEdit.title.pt"
                >
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label is-small">Title ES</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="Event title ES"
                  v-model="eventEdit.title.es"
                >
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label is-small">Title EN</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="Event title EN"
                  v-model="eventEdit.title.en"
                >
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
                  placeholder="Event description pt"
                  v-model="eventEdit.description.pt"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label is-small">Description ES</label>
              <div class="control">
                <textarea
                  class="textarea is-small"
                  placeholder="Event description ES"
                  v-model="eventEdit.description.es"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label is-small">Description EN</label>
              <div class="control">
                <textarea
                  class="textarea is-small"
                  placeholder="Event description EN"
                  v-model="eventEdit.description.en"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3">
            <div class="field">
              <label class="label is-small">Main Category</label>
              <div class="control is-expanded">
                <div class="select is-fullwidth is-small">
                  <select name="mainCategory" v-model="eventEdit.mainCategoryId">
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
                  <select name="secondaryCategory" v-model="eventEdit.secondaryCategoryId">
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
          <div class="column">
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
export default {
  props: ['event'],
  mounted () {
    if (this.event) {
      this.eventEdit = JSON.parse(JSON.stringify(this.event))
    }
  },
  data () {
    return {
      loading: false,
      eventEdit: {
        title: {
          pt: '',
          es: '',
          en: ''
        },
        description: {
          pt: '',
          es: '',
          en: ''
        }
      }
    }
  },
  computed: {
    storeInitialized () {
      return this.$store.getters['initialized']
    },
    categories () {
      return this.$_.orderBy(
        this.$store.getters['auxiliary/categories'],
        'title.' + this.languageCode,
        'asc'
      )
    },
    mainCategories () {
      return this.$_.orderBy(
        this.$_.filter(this.categories, { 'mainCategoryId': '' }),
        'title.' + this.languageCode,
        'asc'
      )
    },
    secondaryCategories () {
      if (this.eventEdit.mainCategoryId === '') {
        return []
      }
      return this.$_.orderBy(
        this.$_.filter(this.categories, { 'mainCategoryId': this.eventEdit.mainCategoryId }),
        'title.' + this.languageCode,
        'asc'
      )
    },
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    }
  },
  watch: {
    storeInitialized: function () {
      this.eventEdit = JSON.parse(JSON.stringify(this.event))
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
