<template>
  <div class="has-text-left is-size-7">
    <fmt-category-form :data="categories"></fmt-category-form>
    <div class="card">
      <div class="card-content">
        <fmt-hierarchical-list
          :data="categories"
          :fields="categoriesFields"
          first-level="parent_id"
          id="id"
          :delete-button="true"
          v-on:toggle-active-item="toggleCategory"
          v-on:delete-item="deleteCategory"
          v-on:edit-item="editCategoryModal"
        ></fmt-hierarchical-list>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryNew from '@/components/auxiliary/CategoryNew'
import CategoryEdit from '@/components/auxiliary/CategoryEdit'
import HierarchicalList from '@/components/common/HierarchicalList'

export default {
  components: {
    'fmt-category-form': CategoryNew,
    'fmt-hierarchical-list': HierarchicalList
  },
  async created () {
    if (this.$store.getters['auxiliary/categories'].length === 0) {
      const loading = this.$loading.open()
      await this.$store.dispatch('auxiliary/getAllCategories')
      loading.close()
    }
  },
  data () {
    return {
      categoriesFields: [
        {
          name: 'title',
          label: 'Category',
          type: 'translation',
          style: 'width:45%;cursor: pointer;',
          editLink: true
        },
        {
          name: 'created_user',
          label: 'Created by',
          type: 'user',
          style: 'width:10%;cursor: pointer;',
          editLink: true
        },
        {
          name: 'created_date',
          label: 'Created Date',
          type: 'date',
          style: 'width:10%;cursor: pointer;',
          editLink: true
        },
        {
          name: 'updated_user',
          label: 'Updated by',
          type: 'user',
          style: 'width:10%;cursor: pointer;',
          editLink: true
        },
        {
          name: 'updated_date',
          label: 'Updated Date',
          type: 'date',
          style: 'width:10%;cursor: pointer;',
          editLink: true
        },
        {
          name: 'active',
          label: 'Active',
          type: 'active',
          style: 'width:10%; text-align: center !important;'
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
    deleteCategory (id) {
      this.$store.dispatch('auxiliary/deleteCategory', id)
    },
    toggleCategory (item) {
      const category = {
        id: item.id,
        active: item.active
      }
      this.$store.dispatch('auxiliary/updateCategory', category)
    }
  }
}
</script>
