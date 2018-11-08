<template>
  <table class="table is-striped" style="width: 100%">
  <thead>
    <tr>
      <th v-for="(field, index) in fields" :key='index' v-bind:style="field.style">
        {{field.label}}
      </th>
      <th v-if="deleteButton">
      </th>
    </tr>
  </thead>
  <tbody>
    <template v-for="(item, index) in getLevelZero()">
        <fmt-hierarchical-row 
          :item="item" 
          :fields="fields" 
          :level="0" 
          :key="'Z'+index" 
          :id="id"
          :delete-button="deleteButton && getFirstLevel(item[id]).length === 0 ? true : false"
          v-on:edit-table-row="edit"
          v-on:delete-table-row="deleteItem"
          v-on:toggle-active-table-row="toggleActive">
        </fmt-hierarchical-row>
        <template v-for="(child, firstIndex) in getFirstLevel(item[id])">
          <fmt-hierarchical-row 
            :item="child" 
            :fields="fields" 
            :level="1" 
            :key="'Z'+index+'F'+firstIndex" 
            :delete-button="deleteButton && getSecondLevel(child[id]).length === 0 ? true : false"
            :id="id"
            v-on:edit-table-row="edit"
            v-on:delete-table-row="deleteItem"
            v-on:toggle-active-table-row="toggleActive">
          </fmt-hierarchical-row>
          <template v-for="(grandchild, secondIndex) in getSecondLevel(child[id])">
            <fmt-hierarchical-row 
              :item="grandchild" 
              :fields="fields" 
              :level="2" 
              :key="'Z'+index+'F'+firstIndex+'S'+secondIndex" 
              :delete-button="deleteButton"
              :id="id"
              v-on:edit-table-row="edit"
              v-on:delete-table-row="deleteItem"
              v-on:toggle-active-table-row="toggleActive">
            </fmt-hierarchical-row>
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
      emptyString: String,
      deleteButton: Boolean
    },
    methods: {
      getLevelZero() {
        return this.$_.filter(this.data, {[this.firstLevel]:this.emptyString})
      },
      getFirstLevel(parentId) {
        let filter = {[this.firstLevel]:parentId}
        if (!_.isEmpty(this.secondLevel)) {
            filter = {[this.firstLevel]:parentId, [this.secondLevel]:this.emptyString}
        }
        return this.$_.filter(this.data, filter)
      },
      getSecondLevel(parentId) {
        return this.$_.filter(this.data, {[this.secondLevel]:parentId})
      },
      edit(id) {
        this.$emit('edit-item', id)
      },
      deleteItem(id) {
        this.$emit('delete-item', id)
      },
      toggleActive(item) {
        this.$emit('toggle-active-item', item)
      }
    }
  }
</script>