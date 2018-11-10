<template>
  <div class="has-text-left is-size-7">
    <fmt-event-form :categories="categories" :locations="locations"></fmt-event-form>
    <div class="card">
      <div class="card-content">
        <fmt-hierarchical-list
          :data="events"
          :fields="eventsFields"
          id="eventId"
          :delete-button="true"
          v-on:edit-item="edit"
          v-on:delete-item="deleteEvent"
          v-on:toggle-active-item="toggleActive"
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
    if (!this.$store.getters['initialized']) {
      const loading = this.$loading.open()
      await this.$store.dispatch('initStore')
      loading.close()
    }
  },
  data () {
    return {
      loading: false,
      eventsFields: [
        {
          name: 'title',
          label: 'Category',
          type: 'translation',
          style: 'width:40%;',
          editLink: true
        },
        {
          name: 'mainCategoryId',
          label: 'Main Category',
          type: 'category',
          editLink: true
        },
        {
          name: 'secondaryCategoryId',
          label: 'Category',
          type: 'category',
          editLink: true
        },
        {
          name: 'countryId',
          label: 'Country',
          type: 'location',
          editLink: true
        },
        {
          name: 'regionId',
          label: 'Region',
          type: 'location',
          editLink: true
        },
        {
          name: 'cityId',
          label: 'City',
          type: 'location',
          editLink: true
        },
        {
          name: 'active',
          label: 'Active',
          type: 'active',
          style: 'width:5%; text-align: center !important;'
        }
      ]
    }
  },
  computed: {
    events () {
      return this.$_.orderBy(
        this.$store.getters['events/all'],
        'title.pt',
        'asc'
      )
    },
    categories () {
      return this.$_.orderBy(
        this.$store.getters['auxiliary/categories'],
        'title.pt',
        'asc'
      )
    },
    locations () {
      return this.$_.orderBy(
        this.$store.getters['auxiliary/geonames'],
        'title.pt',
        'asc'
      )
    }
  },
  methods: {
    edit (id) {
      this.$router.push('/events/global/' + id)
    },
    deleteEvent (eventId) {
      console.log(eventId)
      this.$store.dispatch('events/delete', eventId)
    },
    toggleActive (item) {
      const event = {
        eventId: item.id,
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
