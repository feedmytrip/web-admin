<template>
  <div>
    <div v-if="type === 'translation'">
      <span
        v-bind:style="{ paddingLeft: this.level * 20 + 'px' }"
      >{{ value.pt }} - {{ value.es }} - {{ value.en }}</span>
    </div>
    <div v-if="type === 'text'"></div>
    <div class="field" v-if="type === 'active'">
      <b-switch
        :value="value"
        size="is-small"
        type="is-info"
        v-on:input.native="$emit('toggle-active', !value);"
      ></b-switch>
    </div>
    <div v-if="type === 'boolean'">
      <span
        class="icon is-size-6 has-text-info"
        v-bind:class="[value ? 'has-text-info' : 'has-text-white-ter']"
      >
        <i class="fa fa-check-circle"></i>
      </span>
    </div>
    <div v-if="type === 'date'"></div>
    <div v-if="type === 'location'">
      <span>{{ getLocationNameById(value) }}</span>
    </div>
    <div v-if="type === 'category'">
      <span>{{ getCategoryNameById(value) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type', 'value', 'level'],
  computed: {
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    }
  },
  methods: {
    getCategoryNameById (id) {
      const category = this.$store.getters['auxiliary/category'](id)
      if (category) {
        return category['title'][this.languageCode]
      }
      return ''
    },
    getLocationNameById (id) {
      const location = this.$store.getters['auxiliary/geoname'](id)
      if (location) {
        return location['title'][this.languageCode]
      }
      return ''
    }
  }
}
</script>

<style>
.fmt-hierarchical-list-child {
  padding-left: 15px;
}
</style>
