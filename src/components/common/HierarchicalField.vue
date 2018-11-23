<template>
  <div>
    <div v-if="type === 'translation'">
      <span
        v-bind:style="{ paddingLeft: this.level * 20 + 'px' }"
      >{{ value.pt }} - {{ value.es }} - {{ value.en }}</span>
    </div>
    <div v-if="type === 'user'">
      <span>{{ value.first_name }} {{ value.last_name }}</span>
    </div>
    <div v-if="type === 'text'"></div>
    <div class="field" v-if="type === 'active'">
      <b-switch
        v-model="value"
        true-value="1"
        false-value="0"
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
    <div v-if="type === 'date'">{{ formatedDate }}</div>
    <div v-if="type === 'translation_language_code'">
      <span>{{ value[languageCode] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type', 'value', 'level'],
  computed: {
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    },
    formatedDate () {
      return this.$moment(this.value).format('DD-MM-YYYY HH:mm:ss')
    }
  }
}
</script>

<style>
.fmt-hierarchical-list-child {
  padding-left: 15px;
}
</style>
