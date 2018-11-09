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
              :delete-button="true"
              v-on:toggle-active-item="toggleCategory"
              v-on:delete-item="deleteCategory"
              v-on:edit-item="editCategoryModal"
            ></fmt-hierarchical-list>
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
              :delete-button="true"
              v-on:delete-item="deleteLocation"
              v-on:edit-item="editLocationModal"
            ></fmt-hierarchical-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryNew from '@/components/auxiliary/CategoryNew'
import CategoryEdit from '@/components/auxiliary/CategoryEdit'
import LocationNew from '@/components/auxiliary/LocationNew'
import LocationEdit from '@/components/auxiliary/LocationEdit'
import HierarchicalList from '@/components/common/HierarchicalList'

export default {
  components: {
    'fmt-category-form': CategoryNew,
    'fmt-location-form': LocationNew,
    'fmt-hierarchical-list': HierarchicalList
  },
  async created () {
    const loading = this.$loading.open()
    this.$store.commit('setTitle', 'Auxiliary Data')
    this.$store.commit(
      'setSubtitle',
      'Manages system categories and locations'
    )
    await this.$store.dispatch('auxiliary/getAuxiliaryData')
    loading.close()
  },
  data () {
    return {
      categoriesFields: [
        {
          name: 'title',
          label: 'Category',
          type: 'translation',
          style: 'width:70%;cursor: pointer;',
          editLink: true
        },
        {
          name: 'active',
          label: 'Active',
          type: 'active',
          style: 'width:20%; text-align: center !important;'
        }
      ],
      locationsFields: [
        {
          name: 'title',
          label: 'Country / Region / City',
          type: 'translation',
          style: 'width:90%;cursor: pointer;',
          editLink: true
        }
      ]
    }
  },
  computed: {
    categories () {
      return this.$_.orderBy(
        this.$store.getters['auxiliary/categories'],
        'title.pt',
        'asc'
      )
    },
    locations () {
      return this.$_.orderBy(
        this.$store.getters['auxiliary/geonames'],
        'title.pt',
        'asc'
      )
    }
  },
  methods: {
    editCategoryModal (id) {
      this.$modal.open({
        parent: this,
        component: CategoryEdit,
        props: {
          itemId: id,
          data: this.categories
        },
        width: 500
      })
    },
    editLocationModal (id) {
      this.$modal.open({
        parent: this,
        component: LocationEdit,
        props: {
          itemId: id,
          data: this.locations
        },
        width: 500
      })
    },
    deleteCategory (id) {
      this.$store.dispatch('auxiliary/deleteCategory', id)
    },
    deleteLocation (id) {
      this.$store.dispatch('auxiliary/deleteGeoname', id)
    },
    toggleCategory (item) {
      const category = {
        categoryId: item.id,
        active: item.active
      }
      this.$store.dispatch('auxiliary/updateCategory', category)
    }
  }
}
</script>
