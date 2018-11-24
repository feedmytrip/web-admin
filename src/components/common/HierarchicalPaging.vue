<template>
  <b-pagination
    :total="this.metadata.total_filtered"
    :current.sync="current"
    order="is-right"
    size="is-small"
    :simple="false"
    :rounded="false"
    :per-page="metadata.records_per_page"
    v-on:change="changed"
  ></b-pagination>
</template>

<script>
export default {
  props: ['metadata'],
  data () {
    return {
      current: this.metadata.page
    }
  },
  methods: {
    changed (page) {
      this.$emit('pagination-changed', page)
    }
  }
}
</script>
