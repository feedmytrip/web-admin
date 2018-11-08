<template>
  <div class="has-text-left is-size-7">
    <div class="columns">
      <div class="column">
        <h2 class="subtitle">Categories</h2>
        <fmt-category-form :data="categories"></fmt-category-form>
        <div class="card">
          <div class="card-content">
            <fmt-hierarchical-list 
              :data="categories" 
              :fields="categoriesFields" 
              empty-string="" 
              first-level="mainCategoryId" 
              id="categoryId"
              v-on:edit-item="openEditDialog"></fmt-hierarchical-list>
          </div>
        </div>
      </div>
      <div class="column">
        <h2 class="subtitle">Locations</h2>
        <fmt-location-form :data="locations"></fmt-location-form>
        <div class="card">
          <div class="card-content">
            <fmt-hierarchical-list 
              :data="locations" 
              :fields="locationsFields"
              empty-string="none" 
              second-level="regionId" 
              first-level="countryId"
              id="geonameId"
              v-on:edit-item="openEditDialog"></fmt-hierarchical-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CategoryForm from '@/components/auxiliary/CategoryForm'
  import LocationForm from '@/components/auxiliary/LocationForm'
  import HierarchicalList from '@/components/common/HierarchicalList'
  export default {
    components: {
      'fmt-category-form': CategoryForm,
      'fmt-location-form': LocationForm,
      'fmt-hierarchical-list': HierarchicalList
    },
    async created() {
      const loading = this.$loading.open()
      this.$store.commit('setTitle', 'Auxiliary Data')
      this.$store.commit('setSubtitle', 'Manages system categories and locations')
      await this.$store.dispatch('auxiliary/getAuxiliaryData')
      loading.close()
    },
    data() {
      return {
        categoriesFields: [{
            'name': 'title',
            'label': 'Category',
            'type': 'translation',
            'style': 'width:80%;'
          },
          {
            'name': 'active',
            'label': 'Active',
            'type': 'boolean',
            'style': 'width:20%; text-align: center !important;'
          }
        ],
        locationsFields: [{
            'name': 'title',
            'label': 'Country / Region / City',
            'type': 'translation',
            'style': 'width:100%;'
          }
        ]
      }
    },
    computed: {
      categories() {
        return this.$store.getters['auxiliary/categories']
      },
      locations() {
        return this.$store.getters['auxiliary/geonames']
      }
    },
    methods: {
      openEditDialog(id) {
        this.$dialog.prompt({
          message: 'Edit item: '+ id,
          inputAttrs: {
            placeholder: 'e.g. Walter',
            maxlength: 10
          },
          onConfirm: (value) => this.$toast.open(`Your name is: ${value}`)
        })
      }
    }
  }
</script>
