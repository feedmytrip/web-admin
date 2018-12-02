<template>
  <tr>
    <td
      v-for="(field, index) in fields"
      :key="index"
      v-bind:style="field.editLink ? 'cursor: pointer;' + field.style : field.style"
      style="vertical-align: middle;"
      v-on="field.editLink ? { click: edit } : {}"
    >
      <fmt-field
        :value="item[field.name]"
        :type="field.type"
        :level="level"
        v-on="field.type === 'active' ? { 'toggle-active': toggleActive } : {}"
      ></fmt-field>
    </td>
    <td
      style="width:2%;cursor: pointer;"
      @click="deleteItem"
      v-if="deleteButton"
    >
      <a class="icon is-size-5 has-text-danger">
        <i class="fa fa-trash"></i>
      </a>
    </td>
  </tr>
</template>

<script>
import Field from './HierarchicalField'
export default {
  components: {
    'fmt-field': Field
  },
  props: ['item', 'fields', 'level', 'id', 'deleteButton'],
  created () {
    const local = this
    this.$_.forEach(this.fields, function (field) {
      local.object[field.name] = local.item[field.name]
    })
  },
  data () {
    return {
      object: {}
    }
  },
  methods: {
    edit () {
      this.$emit('edit-table-row', this.item[this.id])
    },
    deleteItem () {
      this.$emit('delete-table-row', this.item[this.id])
    },
    toggleActive (active) {
      this.$emit('toggle-active-table-row', {
        id: this.item[this.id],
        active: active === true
      })
    }
  }
}
</script>

<style>
tr:hover td {
  background-color: #00d1b23a;
}
</style>
