<template>
  <div class="has-text-left is-size-7">
    <div class="columns">
      <div class="column is-4">
        <div class="box has-background-white-ter">
          Create
        </div>
      </div>
      <div class="column">
        <div class="card has-background-white-ter">
          <div class="card-content">
            <fmt-table :data="categories"></fmt-table>
          </div>
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