<template>
  <div class="field is-horizontal">
    <div class="field-body">
      <div class="field">
        <label class="label is-small">Main Category</label>
        <div class="control is-expanded">
          <div class="select is-fullwidth is-small">
            <select name="country" v-model="category.mainCategoryId">
              <option value=""></option>
              <option v-for="(object, index) in data" :key="index" :value="object.categoryId">{{ object.title.pt }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label is-small">Name</label>
        <p class="control has-icons-right">
          <input class="input is-small" type="text" placeholder="Name" v-model="category['title'][language_code]">
          <span class="icon is-small is-right">
            <i class="fa fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field is-narrow">
        <p class="control" style="padding-top: 24px;">
          <a class="button is-small is-info" @click="save">
            Save
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
      language_code: 'pt',
      category: {
        mainCategoryId: '',
        title: {
          pt: '',
          es: '',
          en: ''
        }
      }
    }
  },
  computed: {
    mainCategories() {
      return this.$_.find(this.data, {'mainCategoryId': ''})
    }
  },
  methods: {
    save() {
      this.$store.dispatch('auxiliary/newCategory', this.category)
    }
  }

}
</script>


