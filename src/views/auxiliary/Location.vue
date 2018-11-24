<template>
  <div class="has-text-left is-size-7">
    <fmt-location-form :data="locations"></fmt-location-form>
    <div class="card">
      <div class="card-content">
        <fmt-hierarchical-list
          :data="locations"
          :fields="locationsFields"
          second-level="region_id"
          first-level="country_id"
          id="id"
          :delete-button="true"
          v-on:delete-item="deleteLocation"
          v-on:edit-item="editLocationModal"
        ></fmt-hierarchical-list>
      </div>
    </div>
  </div>
</template>

<script>
import LocationNew from '@/components/auxiliary/LocationNew'
import LocationEdit from '@/components/auxiliary/LocationEdit'
import HierarchicalList from '@/components/common/HierarchicalList'

export default {
  components: {
    'fmt-location-form': LocationNew,
    'fmt-hierarchical-list': HierarchicalList
  },
  async created () {
    if (this.$store.getters['auxiliary/locations'].data.length === 0) {
      const loading = this.$loading.open()
      await this.$store.dispatch('auxiliary/getAllLocations')
      loading.close()
    }
  },
  data () {
    return {
      locationsFields: [
        {
          name: 'title',
          label: 'Country / Region / City',
          type: 'translation',
          style: 'width:90%;cursor: pointer;',
          editLink: true
        }
      ]
    }
  },
  computed: {
    locations () {
      return this.$_.orderBy(
        this.$store.getters['auxiliary/locations'].data,
        'title.pt',
        'asc'
      )
    }
  },
  methods: {
    editLocationModal (id) {
      this.$modal.open({
        parent: this,
        component: LocationEdit,
        props: {
          itemId: id,
          data: this.locations
        },
        width: 500
      })
    },
    deleteLocation (id) {
      this.$store.dispatch('auxiliary/deleteLocation', id)
    }
  }
}
</script>
