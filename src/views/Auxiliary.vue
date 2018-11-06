<template>
  <div class="has-text-left is-size-7">
    <div class="columns">
      <div class="column">
        <h2 class="subtitle">Categories</h2>
        <fmt-category-form :data="categories"></fmt-category-form>
        <div class="card">
          <div class="card-content">
            <fmt-table :data="categories"></fmt-table>
          </div>
        </div>
      </div>
      <div class="column">
        <h2 class="subtitle">Locations</h2>
        <div class="card has-background-white-ter">
          <div class="card-content">
            <fmt-table :data="categories"></fmt-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import categoryForm from '@/components/auxiliary/CategoryForm' 
  export default {
    components: {
      'fmt-category-form': categoryForm
    },
    mounted() {
      this.$store.dispatch('auxiliary/getAllCategories')
      this.$store.commit('setTitle', 'Auxiliary Data')
      this.$store.commit('setSubtitle', 'Manages system categories and locations')
    },
    computed: {
      categories() {
        return this.$store.getters['auxiliary/categories']
      }
    }
  }
</script>