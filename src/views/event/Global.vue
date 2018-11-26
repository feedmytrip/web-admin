<template>
  <div class="has-text-left is-size-7">
    <fmt-event-form></fmt-event-form>
    <div class="card">
      <div class="card-content">
        <fmt-hierarchical-list
          ref="element"
          :data="events"
          :metadata="metadata"
          :fields="eventsFields"
          id="id"
          :delete-button="true"
          v-on:edit-item="edit"
          v-on:delete-item="deleteEvent"
          v-on:toggle-active-item="toggleActive"
          :search-bar="true"
          :search-value="filter"
          v-on:filter-table-data="filterEvents"
          v-on:table-page-changed="changeEventsPage"
        ></fmt-hierarchical-list>
      </div>
    </div>
  </div>
</template>

<script>
import HierarchicalList from '@/components/common/HierarchicalList'
import GlobalEventNew from '@/components/event/GlobalEventNew'
export default {
  components: {
    'fmt-hierarchical-list': HierarchicalList,
    'fmt-event-form': GlobalEventNew
  },
  async created () {
    if (this.$store.getters['events/all'].data.length <= 1 && this.$store.getters['events/filter'] === '') {
      const loading = this.$loading.open()
      await this.$store.dispatch('events/getAll', '?page=1&sort=created_date')
      loading.close()
    }
  },
  data () {
    return {
      loading: false,
      eventsFields: [
        {
          name: 'title',
          label: 'Event',
          type: 'translation',
          style: 'width:30%;',
          editLink: true
        },
        {
          name: 'main_category',
          label: 'Main Category',
          type: 'translation_language_code',
          editLink: true
        },
        {
          name: 'secondary_category',
          label: 'Category',
          type: 'translation_language_code',
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
    events () {
      return this.$store.getters['events/all'].data
    },
    metadata () {
      return this.$store.getters['events/all'].metadata
    },
    filter () {
      return this.$store.getters['events/filter']
    }
  },
  methods: {
    async filterEvents (filter) {
      this.$store.commit('events/setFilter', filter)
      let payload = '?page=1&sort=created_date'
      if (!this.$_.isEmpty(filter)) {
        payload += '&filter=' + filter
      }
      const loading = this.$loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      await this.$store.dispatch('events/getAll', payload)
      loading.close()
    },
    async changeEventsPage (page) {
      const filter = this.$store.getters['events/filter']
      let payload = '?page=' + page + '&sort=created_date'
      if (!this.$_.isEmpty(filter)) {
        payload += '&filter=' + filter
      }
      const loading = this.$loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      await this.$store.dispatch('events/getAll', payload)
      loading.close()
    },
    edit (id) {
      this.$router.push('/events/global/' + id)
    },
    deleteEvent (id) {
      console.log(id)
      this.$store.dispatch('events/delete', id)
    },
    toggleActive (item) {
      const event = {
        id: item.id,
        active: item.active
      }
      this.$store.dispatch('events/update', event)
        .catch(() => {
          this.$toast.open({
            duration: 3000,
            message: 'Error updating event',
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
