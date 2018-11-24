<template>
  <div>
    <fmt-hierarchical-search v-if="searchBar" :value="searchValue" v-on:filter-data="filterData"></fmt-hierarchical-search>
    <table class="table is-striped" style="width: 100%">
      <thead>
        <tr>
          <th
            v-for="(field, index) in fields"
            :key="index"
            v-bind:style="field.style"
          >{{ field.label }}</th>
          <th v-if="deleteButton"></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in getLevelZero()">
          <fmt-hierarchical-row
            :item="item"
            :fields="fields"
            :level="0"
            :key="'Z' + index"
            :id="id"
            :delete-button="
            deleteButton && getFirstLevel(item[id]).length === 0 ? true : false
          "
            v-on:edit-table-row="edit"
            v-on:delete-table-row="deleteItem"
            v-on:toggle-active-table-row="toggleActive"
          ></fmt-hierarchical-row>
          <template v-for="(child, firstIndex) in getFirstLevel(item[id])">
            <fmt-hierarchical-row
              :item="child"
              :fields="fields"
              :level="1"
              :key="'Z' + index + 'F' + firstIndex"
              :delete-button="
              deleteButton && getSecondLevel(child[id]).length === 0
                ? true
                : false
            "
              :id="id"
              v-on:edit-table-row="edit"
              v-on:delete-table-row="deleteItem"
              v-on:toggle-active-table-row="toggleActive"
            ></fmt-hierarchical-row>
            <template v-for="(grandchild, secondIndex) in getSecondLevel(child[id])">
              <fmt-hierarchical-row
                :item="grandchild"
                :fields="fields"
                :level="2"
                :key="'Z' + index + 'F' + firstIndex + 'S' + secondIndex"
                :delete-button="deleteButton"
                :id="id"
                v-on:edit-table-row="edit"
                v-on:delete-table-row="deleteItem"
                v-on:toggle-active-table-row="toggleActive"
              ></fmt-hierarchical-row>
            </template>
          </template>
        </template>
      </tbody>
    </table>
    <fmt-hierarchical-pagination
      v-if="metadata"
      :metadata="metadata"
      v-on:pagination-changed="changePage"
    ></fmt-hierarchical-pagination>
  </div>
</template>

<script>
import Row from '@/components/common/HierarchicalRow'
import Pagination from '@/components/common/HierarchicalPaging'
import Search from '@/components/common/HierarchicalSearch'
export default {
  components: {
    'fmt-hierarchical-row': Row,
    'fmt-hierarchical-pagination': Pagination,
    'fmt-hierarchical-search': Search
  },
  props: {
    searchBar: {
      type: Boolean,
      default: false
    },
    searchValue: {
      type: String
    },
    metadata: {
      type: Object
    },
    data: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    firstLevel: {
      type: String,
      default: ''
    },
    secondLevel: {
      type: String,
      default: ''
    },
    deleteButton: {
      type: Boolean,
      default: false
    },
    editLink: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getLevelZero () {
      if (this.firstLevel === '') {
        return this.data
      }
      return this.$_.filter(this.data, { [this.firstLevel]: '' })
    },
    getFirstLevel (parentId) {
      if (this.firstLevel === '') {
        return []
      }
      let filter = { [this.firstLevel]: parentId }
      if (!this.$_.isEmpty(this.secondLevel)) {
        filter = {
          [this.firstLevel]: parentId,
          [this.secondLevel]: ''
        }
      }
      return this.$_.filter(this.data, filter)
    },
    getSecondLevel (parentId) {
      if (this.firstLevel === '' || this.secondLevel === '') {
        return []
      }
      return this.$_.filter(this.data, { [this.secondLevel]: parentId })
    },
    edit (id) {
      this.$emit('edit-item', id)
    },
    deleteItem (id) {
      this.$emit('delete-item', id)
    },
    toggleActive (item) {
      this.$emit('toggle-active-item', item)
    },
    filterData (filter) {
      this.$emit('filter-table-data', filter)
    },
    changePage (page) {
      this.$emit('table-page-changed', page)
    }
  }
}
</script>
