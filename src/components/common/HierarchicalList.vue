<template>
  <table class="table is-striped" style="width: 100%">
  <thead>
    <tr>
      <th v-for="(field, index) in fields" :key='index' v-bind:style="field.style">
        {{field.label}}
      </th>
    </tr>
  </thead>
  <tbody>
    <template v-for="(item, index) in getLevelZero()">
        <fmt-hierarchical-row :item="item" :fields="fields" :level="0" :key="'Z'+index" :id="id" v-on:edit-table-row="edit"></fmt-hierarchical-row>
        <template v-for="(child, firstIndex) in getFirstLevel(item[id])">
          <fmt-hierarchical-row :item="child" :fields="fields" :level="1" :key="'Z'+index+'F'+firstIndex" v-on:edit-table-row="edit" :id="id"></fmt-hierarchical-row>
          <template v-for="(grandchild, secondIndex) in getSecondLevel(child[id])">
            <fmt-hierarchical-row :item="grandchild" :fields="fields" :level="2" :key="'Z'+index+'F'+firstIndex+'S'+secondIndex" v-on:edit-table-row="edit" :id="id"></fmt-hierarchical-row>
          </template>
        </template>
    </template>
  </tbody>
  </table>
</template>

<script>
  import Row from '@/components/common/HierarchicalRow' 
  export default {
    components: {
      'fmt-hierarchical-row': Row
    },
    props: {
      data: Array,
      fields: Array,
      firstLevel: String,
      secondLevel: String,
      id: String,
      emptyString: String
    },
    methods: {
      getLevelZero() {
        return this.$_.filter(this.data, {[this.firstLevel]:this.emptyString})
      },
      getFirstLevel(parentId) {
        if (_.isEmpty(this.secondLevel)) {
          return this.$_.filter(this.data, {[this.firstLevel]:parentId})
        } else {
          return this.$_.filter(this.data, {[this.firstLevel]:parentId, [this.secondLevel]:this.emptyString})
        }
      },
      getSecondLevel(parentId) {
        return this.$_.filter(this.data, {[this.secondLevel]:parentId})
      },
      edit(id) {
        this.$emit('edit-item', id)
      }
    }
  }
</script>