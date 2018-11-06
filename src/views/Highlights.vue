<template>
  <div class="has-text-left">
    <div class="columns is-size-7">
      <div class="column is-5">
        <div class="box">
          Create
        </div>
        <div class="box">
          <fmt-table :data="data"></fmt-table>
        </div>
      </div>
      <div class="column">
        <div class="box">
          Edit
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        highlight: {}
      }
    },
    mounted() {
      this.$store.dispatch('highlights/getAll')
      this.$store.commit('setTitle', 'Highlights')
      this.$store.commit('setSubtitle', 'Manages system highlights')
    },
    computed: {
      data() {
        return this.$store.getters['highlights/all']
      }
    },
    methods: {
      formatDate(date) {
        return this.$moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")
      }
    }
  }
</script>