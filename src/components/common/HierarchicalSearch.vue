<template>
  <div class="control has-icons-left" style="margin-bottom: 25px;">
    <input
      class="input is-small"
      type="text"
      placeholder="Search"
      v-model="filter"
      v-on:keyup.enter="filterData"
    >
    <span class="icon is-small is-left">
      <i class="fa fa-search"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      filter: this.value
    }
  },
  methods: {
    filterData () {
      this.$emit('filter-data', this.$_.replace(this.filter, ' ', '_'))
    }
  },
  watch: {
    filter: function (newVal, oldVal) {
      if (this.$_.isEmpty(newVal)) {
        this.filterData()
      }
    }
  }
}
</script>
