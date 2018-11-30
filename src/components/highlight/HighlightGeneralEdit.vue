<template>
  <div style="margin-bottom: 45px;">
    <div
      class="card"
      style="margin-bottom: 30px;"
    >
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label is-small">Title PT</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="Highlight title pt"
                  v-model="highlightEdit['title.pt']"
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
                  placeholder="Highlight title ES"
                  v-model="highlightEdit['title.es']"
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
                  placeholder="Highlight title EN"
                  v-model="highlightEdit['title.en']"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label is-small">Filter events and trips</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="text"
                  placeholder="Filter events and Highlights"
                  v-model="highlightEdit.filter"
                >
              </div>
            </div>
          </div>
          <div class="column is-2">
            <div class="field">
              <label class="label is-small">Schedule date</label>
              <div class="control">
                <b-datepicker
                  v-model="schedule_date"
                  placeholder="Select start date"
                  size="is-small"
                  :editable="true"
                  :date-formatter="(date) => this.$moment(date).format('DD/MM/YYYY')"
                  :date-parser="(date) => this.$moment(date, 'DD/MM/YYYY').toDate()"
                ></b-datepicker>
              </div>
            </div>
          </div>
          <div class="column is-2">
            <div class="field">
              <label class="label is-small">Schedule time</label>
              <div class="control">
                <b-timepicker
                  v-model="schedule_date"
                  placeholder="Click to select..."
                  size="is-small"
                  :editable="true"
                ></b-timepicker>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4">
            <div class="field">
              <label class="label is-small">Country</label>
              <div class="control is-expanded">
                <fmt-select
                  v-model="highlightEdit.country_id"
                  :languageCode="languageCode"
                  action="auxiliary/getLocationCountries"
                  get="auxiliary/locationCountries"
                  :dependent="false"
                ></fmt-select>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label class="label is-small">Region</label>
              <div class="control">
                <fmt-select
                  v-model="highlightEdit.region_id"
                  :languageCode="languageCode"
                  action="auxiliary/getLocationRegions"
                  get="auxiliary/locationRegions"
                  empty-mutation="auxiliary/emptyLocationRegions"
                  :dependent="true"
                  :parent-value="highlightEdit.country_id"
                ></fmt-select>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label class="label is-small">City</label>
              <div class="control">
                <fmt-select
                  v-model="highlightEdit.city_id"
                  :languageCode="languageCode"
                  action="auxiliary/getLocationCities"
                  get="auxiliary/locationCities"
                  empty-mutation="auxiliary/emptyLocationCities"
                  :dependent="true"
                  :parent-value="highlightEdit.region_id"
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
                  placeholder="Highlight description pt"
                  v-model="highlightEdit['description.pt']"
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
                  placeholder="Highlight description ES"
                  v-model="highlightEdit['description.es']"
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
                  placeholder="Highlight description EN"
                  v-model="highlightEdit['description.en']"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <p
                class="control is-pulled-right"
                style="padding-top: 24px;"
              >
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
    <div class="columns">
      <div class="column">
        <b-field>
          <b-upload
            v-model="dropFiles"
            multiple
            drag-drop
            :loading="uploading"
          >
            <div
              class="content has-text-centered is-size-7"
              style="padding: 1em;"
            >
              <p>
                <b-icon
                  icon="upload"
                  size="is-large"
                >
                </b-icon>
              </p>
              <p>Drop your files here or click to upload</p>
            </div>
          </b-upload>
        </b-field>
      </div>
    </div>
    <div class="columns is-multiline">
      <fmt-highlight-image
        :ref="'element_' + value.id"
        v-for="(value, key) in images"
        :image="value"
        :key="key"
      ></fmt-highlight-image>
    </div>
  </div>
</template>

<script>
import { Storage } from 'aws-amplify'
import DynamicSelect from '@/components/common/form/DynamicSelect'
import HighlightImage from '@/components/highlight/HighlightImage'
export default {
  props: ['highlight'],
  components: {
    'fmt-select': DynamicSelect,
    'fmt-highlight-image': HighlightImage
  },
  async mounted () {
    if (this.highlight) {
      this.highlightEdit.id = this.highlight.id
      this.highlightEdit.filter = this.highlight.filter
      this.highlightEdit.schedule_date = this.highlight.schedule_date
      this.highlightEdit.country_id = this.highlight.country_id
      this.highlightEdit.region_id = this.highlight.region_id
      this.highlightEdit.city_id = this.highlight.city_id
      this.highlightEdit['title.pt'] = this.highlight.title.pt
      this.highlightEdit['title.es'] = this.highlight.title.es
      this.highlightEdit['title.en'] = this.highlight.title.en
      this.highlightEdit['description.pt'] = this.highlight.description.pt
      this.highlightEdit['description.es'] = this.highlight.description.es
      this.highlightEdit['description.en'] = this.highlight.description.en

      const date = this.$moment(this.highlight.schedule_date)
      if (date.isAfter('2000-01-01')) {
        this.schedule_date = date.toDate()
      }

      if (this.$_.isEmpty(this.images) || this.images.highlight_id !== this.highlight.id) {
        await this.$store.dispatch('highlights/getAllImages', this.highlight.id)
      }
    }
  },
  data () {
    return {
      loading: false,
      uploading: false,
      highlightEdit: {
        id: '',
        country_id: '',
        region_id: ''
      },
      schedule_date: null,
      dropFiles: []
    }
  },
  computed: {
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    },
    images () {
      return this.$store.getters['highlights/images'].data
    }
  },
  watch: {
    highlight: async function () {
      this.highlightEdit.id = this.highlight.id
      this.highlightEdit.filter = this.highlight.filter
      this.highlightEdit.schedule_date = this.highlight.schedule_date
      this.highlightEdit.country_id = this.highlight.country_id
      this.highlightEdit.region_id = this.highlight.region_id
      this.highlightEdit.city_id = this.highlight.city_id
      this.highlightEdit['title.pt'] = this.highlight.title.pt
      this.highlightEdit['title.es'] = this.highlight.title.es
      this.highlightEdit['title.en'] = this.highlight.title.en
      this.highlightEdit['description.pt'] = this.highlight.description.pt
      this.highlightEdit['description.es'] = this.highlight.description.es
      this.highlightEdit['description.en'] = this.highlight.description.en

      const date = this.$moment(this.highlight.schedule_date)
      if (date.isAfter('2000-01-01')) {
        this.schedule_date = date.toDate()
      }

      if (this.$_.isEmpty(this.images) || this.images.highlight_id !== this.highlight.id) {
        await this.$store.dispatch('highlights/getAllImages', this.highlight.id)
      }
    },
    dropFiles: async function () {
      if (this.dropFiles.length > 0) {
        this.uploading = true
        const app = this
        const path = 'highlights/' + this.highlight.id + '/'
        const image = this.dropFiles[0]
        Storage.put(path + image.name, image, {
          'contentType': image.type
        })
          .then(async (result) => {
            console.log(result)
            await app.$store.dispatch('highlights/newImage', { highlight_id: app.highlight.id, path: result.key, file_name: image.name })
            app.dropFiles.splice(0, 1)
          })
          .catch(err => {
            console.log(err)
            app.dropFiles = []
            app.uploading = false
            app.$toast.open({
              duration: 3000,
              message: 'Upload: ' + err.message,
              type: 'is-danger'
            })
          })
      } else {
        this.uploading = false
      }
    }
  },
  methods: {
    save () {
      this.loading = true
      if (this.schedule_date !== null) {
        this.highlightEdit.schedule_date = this.$moment(this.schedule_date)
      }

      this.$store.dispatch('highlights/update', this.highlightEdit)
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

<style>
.upload .upload-draggable {
  display: block !important;
}
</style>
