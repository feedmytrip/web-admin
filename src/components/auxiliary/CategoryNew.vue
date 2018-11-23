<template>
  <div class="field is-horizontal">
    <div class="field-body">
      <div class="field">
        <label class="label is-small">Main Category</label>
        <div class="control is-expanded">
          <div class="select is-fullwidth is-small">
            <select name="country" v-model="category.parent_id">
              <option value=""></option>
              <option
                v-for="(object, index) in mainCategories"
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
            v-model="category['title'][languageCode]"
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
      category: {
        parent_id: '',
        title: {
          pt: '',
          es: '',
          en: ''
        }
      }
    }
  },
  computed: {
    mainCategories () {
      return this.$_.orderBy(
        this.$_.filter(this.data, { parent_id: '' }),
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
        .dispatch('auxiliary/newCategory', this.category)
        .then(result => {
          this.loading = false
          this.category['title'][this.languageCode] = ''
        })
    }
  }
}
</script>
