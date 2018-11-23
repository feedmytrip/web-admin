<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Category</p>
    </header>
    <div class="card-content" v-if="loading">
      <span class="icon has-text-info has-text-centerd">
        <i class="fa fa-spinner fa-pulse"></i>
      </span>
    </div>
    <div class="card-content" v-if="!loading">
      <div class="content">
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
          <label class="label is-small">Title PT</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="PT"
              v-model="category['title.pt']"
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
              v-model="category['title.es']"
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
              v-model="category['title.en']"
            >
          </div>
        </div>
      </div>
    </div>
    <footer class="card-footer is-size-7" v-if="!loading">
      <a href="#" class="card-footer-item has-text-primary is-loading" @click="update">Save</a>
      <a href="#" class="card-footer-item" @click="$parent.close();">Cancel</a>
    </footer>
  </div>
</template>

<script>
export default {
  props: ['itemId', 'data'],
  created () {
    const index = this.$_.findIndex(this.data, { id: this.itemId })
    this.category['title.pt'] = this.data[index].title.pt
    this.category['title.es'] = this.data[index].title.es
    this.category['title.en'] = this.data[index].title.en
    this.category.id = this.itemId
    this.category.parent_id = this.data[index].parent_id
  },
  data () {
    return {
      loading: false,
      category: {}
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
    update () {
      this.loading = true
      this.$store
        .dispatch('auxiliary/updateCategory', this.category)
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
