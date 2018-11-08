<template>
  <tr @click="edit">
    <td v-for="(field, index) in fields" :key='index' v-bind:style="field.style" style="vertical-align: middle;" >
      <fmt-field :value="item[field.name]" :type="field.type" :level="level"></fmt-field>
    </td>
  </tr>

</template>

<script>
  import Field from './HierarchicalField'
  export default {
    components: {
      'fmt-field': Field
    },
    props: ['item', 'fields', 'level', 'id'],
    created() {
      const local = this
      _.forEach(this.fields, function(field) {
        local.object[field.name] = local.item[field.name]
      });
    },
    data() {
      return {
        object: {}
      }
    },
    methods: {
      edit() {
        this.$emit('edit-table-row', this.item[this.id])
      }
    }
  }
</script>

<style>
tr:hover td {
  background-color: #00d1b2;
  color: #fff;
}
</style>
