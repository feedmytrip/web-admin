<template>
  <div class="has-text-left is-size-7">
    <p class="is-size-4" style="margin-bottom: 15px;">Categories</p>
    <div class="columns">
      <div class="column is-4">
        <div class="box has-background-white-ter">
          Create
        </div>
      </div>
      <div class="column">
        <div class="box has-background-white-ter">
          <fmt-table :data="categories"></fmt-table>
        </div>
      </div>
    </div>

    <p class="is-size-4" style="margin-bottom: 15px;">Locations</p>
    <div class="columns">
      <div class="column is-4">
        <div class="box has-background-white-ter">
          Create
        </div>
      </div>
      <div class="column">
        <div class="box has-background-white-ter">
          List
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch('auxiliary/getAllCategories')
    },
    computed: {
      categories() {
        return this.$store.getters['auxiliary/categories']
      }
    }
  }
</script>