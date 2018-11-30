<template>
  <div class="has-text-left is-size-7">
    <fmt-highlight-form></fmt-highlight-form>
    <div class="card">
      <div class="card-content">
        <fmt-hierarchical-list
          ref="element"
          :data="highlights"
          :metadata="metadata"
          :fields="highlightsFields"
          id="id"
          :delete-button="true"
          v-on:edit-item="edit"
          v-on:delete-item="deleteHighlight"
          v-on:toggle-active-item="toggleActive"
          :search-bar="true"
          :search-value="filter"
          v-on:filter-table-data="filterHighlights"
          v-on:table-page-changed="changeHighlightsPage"
        ></fmt-hierarchical-list>
      </div>
    </div>
  </div>
</template>

<script>
import HierarchicalList from '@/components/common/HierarchicalList'
import HighlightForm from '@/components/highlight/NewHighlight'
export default {
  components: {
    'fmt-hierarchical-list': HierarchicalList,
    'fmt-highlight-form': HighlightForm
  },
  async created () {
    this.$store.commit('setTitle', 'Highlights')
    this.$store.commit('setSubtitle', 'Manages system highlights')
    if (this.$store.getters['highlights/all'].data.length <= 1 && this.$store.getters['highlights/filter'] === '') {
      const loading = this.$loading.open()
      await this.$store.dispatch('highlights/getAll', '?page=1&sort=created_date')
      loading.close()
    }
  },
  data () {
    return {
      loading: false,
      highlightsFields: [
        {
          name: 'title',
          label: 'Highlight',
          type: 'translation_language_code',
          style: 'width:20%;',
          editLink: true
        },
        {
          name: 'filter',
          label: 'Filter',
          type: 'text',
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
          name: 'schedule_date',
          label: 'Scheduled',
          type: 'date',
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
    highlights () {
      return this.$store.getters['highlights/all'].data
    },
    metadata () {
      return this.$store.getters['highlights/all'].metadata
    },
    filter () {
      return this.$store.getters['highlights/filter']
    }
  },
  methods: {
    async filterHighlights (filter) {
      this.$store.commit('highlights/setFilter', filter)
      let payload = '?page=1&sort=created_date'
      if (!this.$_.isEmpty(filter)) {
        payload += '&filter=' + filter
      }
      const loading = this.$loading.open({
        container: this.$refs.element.$el
      })
      await this.$store.dispatch('highlights/getAll', payload)
      loading.close()
    },
    async changeHighlightsPage (page) {
      const filter = this.$store.getters['highlights/filter']
      let payload = '?page=' + page + '&sort=created_date'
      if (!this.$_.isEmpty(filter)) {
        payload += '&filter=' + filter
      }
      const loading = this.$loading.open({
        container: this.$refs.element.$el
      })
      await this.$store.dispatch('highlights/getAll', payload)
      loading.close()
    },
    edit (id) {
      this.$router.push('/highlights/' + id)
    },
    deleteHighlight (id) {
      const loading = this.$loading.open({
        container: this.$refs.element.$el
      })
      this.$store.dispatch('highlights/delete', id)
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
      this.$store.dispatch('highlights/update', trip)
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
