<template>
  <div class="has-text-left is-size-7">
    <fmt-trip-form></fmt-trip-form>
    <div class="card">
      <div class="card-content">
        <fmt-hierarchical-list
          ref="element"
          :data="trips"
          :metadata="metadata"
          :fields="tripsFields"
          id="id"
          :delete-button="true"
          v-on:edit-item="edit"
          v-on:delete-item="deleteTrip"
          v-on:toggle-active-item="toggleActive"
          :search-bar="true"
          :search-value="filter"
          v-on:filter-table-data="filterTrips"
          v-on:table-page-changed="changeTripsPage"
        ></fmt-hierarchical-list>
      </div>
    </div>
  </div>
</template>

<script>
import HierarchicalList from '@/components/common/HierarchicalList'
import GlobalTripNew from '@/components/trip/GlobalTripNew'
export default {
  components: {
    'fmt-hierarchical-list': HierarchicalList,
    'fmt-trip-form': GlobalTripNew
  },
  async created () {
    if (this.$store.getters['trips/all'].data.length <= 1 && this.$store.getters['trips/filter'] === '') {
      const loading = this.$loading.open()
      await this.$store.dispatch('trips/getAll', '?page=1&sort=created_date&scope=global')
      loading.close()
    }
  },
  data () {
    return {
      loading: false,
      tripsFields: [
        {
          name: 'title',
          label: 'trip',
          type: 'translation_language_code',
          style: 'width:30%;',
          editLink: true
        },
        {
          name: 'country',
          label: 'Country',
          type: 'translation_language_code',
          editLink: true
        },
        {
          name: 'region',
          label: 'Region',
          type: 'translation_language_code',
          editLink: true
        },
        {
          name: 'city',
          label: 'City',
          type: 'translation_language_code',
          editLink: true
        },
        {
          name: 'created_user',
          label: 'Created by',
          type: 'user',
          editLink: true
        },
        {
          name: 'created_date',
          label: 'Created Date',
          type: 'date',
          editLink: true
        },
        {
          name: 'active',
          label: 'Active',
          type: 'active',
          style: 'width:5%; text-align: center !important;'
        }
      ],
      isFullPage: false
    }
  },
  computed: {
    trips () {
      return this.$store.getters['trips/all'].data
    },
    metadata () {
      return this.$store.getters['trips/all'].metadata
    },
    filter () {
      return this.$store.getters['trips/filter']
    }
  },
  methods: {
    async filterTrips (filter) {
      this.$store.commit('trips/setFilter', filter)
      let payload = '?page=1&sort=created_date&scope=global'
      if (!this.$_.isEmpty(filter)) {
        payload += '&filter=' + filter
      }
      const loading = this.$loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      await this.$store.dispatch('trips/getAll', payload)
      loading.close()
    },
    async changeTripsPage (page) {
      const filter = this.$store.getters['trips/filter']
      let payload = '?page=' + page + '&sort=created_date&scope=global'
      if (!this.$_.isEmpty(filter)) {
        payload += '&filter=' + filter
      }
      const loading = this.$loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      await this.$store.dispatch('trips/getAll', payload)
      loading.close()
    },
    edit (id) {
      this.$router.push('/trips/' + id)
    },
    deleteTrip (id) {
      const loading = this.$loading.open({
        container: this.$refs.element.$el
      })
      this.$store.dispatch('trips/delete', id)
        .then(() => {
          loading.close()
        })
        .catch(err => {
          console.log(err)
          loading.close()
          this.$toast.open({
            duration: 3000,
            message: err.message,
            type: 'is-danger'
          })
        })
    },
    toggleActive (item) {
      const trip = {
        id: item.id,
        active: item.active
      }
      this.$store.dispatch('trips/update', trip)
        .catch(() => {
          this.$toast.open({
            duration: 3000,
            message: 'Error updating trip',
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
