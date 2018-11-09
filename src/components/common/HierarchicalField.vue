<template>
  <div>
    <div v-if="type === 'translation'">
      <span v-bind:style="{ paddingLeft: this.level * 20 + 'px' }">
        {{ value.pt }} - {{ value.es }} - {{ value.en }}
      </span>
    </div>
    <div v-if="type === 'text'"></div>
    <div class="field" v-if="type === 'active'">
      <b-switch
        :value="value"
        size="is-small"
        type="is-info"
        v-on:input.native="$emit('toggle-active', $event.target.value);"
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
  </div>
</template>

<script>
export default {
  props: ['type', 'value', 'level']
}
</script>

<style>
.fmt-hierarchical-list-child {
  padding-left: 15px;
}
</style>
