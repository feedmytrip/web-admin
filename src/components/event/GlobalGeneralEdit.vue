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
                  v-model="eventEdit['title.pt']"
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
                  v-model="eventEdit['title.es']"
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
                  v-model="eventEdit['title.en']"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-6">
            <div class="field">
              <label class="label is-small">Main Category</label>
              <div class="control is-expanded">
                <fmt-select
                  v-model="eventEdit.main_category_id"
                  :languageCode="languageCode"
                  action="auxiliary/getMainCategories"
                  get="auxiliary/mainCategories"
                  :dependent="false"
                ></fmt-select>
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="field">
              <label class="label is-small">Secondary category</label>
              <div class="control">
                <fmt-select
                  v-model="eventEdit.secondary_category_id"
                  :languageCode="languageCode"
                  action="auxiliary/getSecondaryCategories"
                  get="auxiliary/secondaryCategories"
                  empty-mutation="auxiliary/emptySecondaryCategories"
                  :dependent="true"
                  :parent-value="eventEdit.main_category_id"
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
                  placeholder="Event description pt"
                  v-model="eventEdit['description.pt']"
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
                  rows="2"
                  placeholder="Event description ES"
                  v-model="eventEdit['description.es']"
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
                  rows="2"
                  placeholder="Event description EN"
                  v-model="eventEdit['description.en']"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
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
import DynamicSelect from '@/components/common/form/DynamicSelect'
export default {
  components: {
    'fmt-select': DynamicSelect
  },
  props: ['event'],
  mounted () {
    if (this.event) {
      this.eventEdit.id = this.event.id
      this.eventEdit.main_category_id = this.event.main_category_id
      this.eventEdit.secondary_category_id = this.event.secondary_category_id
      this.eventEdit['title.pt'] = this.event.title.pt
      this.eventEdit['title.es'] = this.event.title.es
      this.eventEdit['title.en'] = this.event.title.en
      this.eventEdit['description.pt'] = this.event.description.pt
      this.eventEdit['description.es'] = this.event.description.es
      this.eventEdit['description.en'] = this.event.description.en
    }
  },
  data () {
    return {
      loading: false,
      eventEdit: {
        id: '',
        main_category_id: '',
        secondary_category_id: ''
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
      this.eventEdit.main_category_id = this.event.main_category_id
      this.eventEdit.secondary_category_id = this.event.secondary_category_id
      this.eventEdit['title.pt'] = this.event.title.pt
      this.eventEdit['title.es'] = this.event.title.es
      this.eventEdit['title.en'] = this.event.title.en
      this.eventEdit['description.pt'] = this.event.description.pt
      this.eventEdit['description.es'] = this.event.description.es
      this.eventEdit['description.en'] = this.event.description.en
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
