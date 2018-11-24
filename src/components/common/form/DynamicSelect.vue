<template>
  <div class="select is-small is-fullwidth" :class="loading ? 'is-loading' : ''">
    <select name="country" :value="value" @input="$emit('input', $event.target.value)">
      <option value=""></option>
      <option
        v-for="(object, index) in options"
        :key="index"
        :value="object.id"
      >{{ object["title"][languageCode] }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    languageCode: String,
    get: String,
    action: String,
    emptyMutation: String,
    dependent: Boolean,
    parentValue: String
  },
  async created () {
    if (this.$store.getters[this.get].length === 0 && (this.dependent === false || (this.dependent === true && !this.$_.isEmpty(this.parentValue)))) {
      this.loading = true
      if (this.$_.isEmpty(this.parentValue)) {
        await this.$store.dispatch(this.action)
      } else {
        await this.$store.dispatch(this.action, this.parentValue)
      }
      this.loading = false
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    options () {
      return this.$store.getters[this.get]
    }
  },
  watch: {
    parentValue: async function (newVal, oldVal) {
      if (this.$_.isEmpty(newVal)) {
        this.$emit('input', '')
        this.$store.commit(this.emptyMutation)
      } else {
        this.loading = true
        await this.$store.dispatch(this.action, newVal)
        this.loading = false
      }
    }
  }
}
</script>
