<template>
  <div class="has-text-left is-size-7">
    <fmt-new-user></fmt-new-user>
    <div class="card">
      <div class="card-content">
        <fmt-hierarchical-list
          ref="element"
          :data="users"
          :metadata="metadata"
          :fields="usersFields"
          id="id"
          v-on:toggle-active-item="toggleActive"
          :search-bar="true"
          :search-value="filter"
          v-on:filter-table-data="filterUsers"
          v-on:table-page-changed="changeUsersPage"
        ></fmt-hierarchical-list>
      </div>
    </div>
  </div>
</template>

<script>
import NewUserForm from '@/components/user/NewUser'
import HierarchicalList from '@/components/common/HierarchicalList'
export default {
  components: {
    'fmt-hierarchical-list': HierarchicalList,
    'fmt-new-user': NewUserForm
  },
  async created () {
    this.$store.commit('setTitle', 'Users')
    this.$store.commit('setSubtitle', 'Manages system users')
    if (this.$store.getters['users/all'].data.length <= 1 && this.$store.getters['users/filter'] === '') {
      const loading = this.$loading.open()
      await this.$store.dispatch('users/getAll', '?page=1&sort=first_name')
      loading.close()
    }
  },
  data () {
    return {
      usersFields: [
        {
          name: 'first_name',
          label: 'First name',
          type: 'text'
        },
        {
          name: 'last_name',
          label: 'Last name',
          type: 'text'
        },
        {
          name: 'username',
          label: 'Login',
          type: 'text'
        },
        {
          name: 'email',
          label: 'Email',
          type: 'text'
        },
        {
          name: 'group',
          label: 'Group',
          type: 'text'
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
        }
      ]
    }
  },
  computed: {
    users () {
      return this.$store.getters['users/all'].data
    },
    metadata () {
      return this.$store.getters['users/all'].metadata
    },
    filter () {
      return this.$store.getters['users/filter']
    }
  },
  methods: {
    async filterUsers (filter) {
      this.$store.commit('users/setFilter', filter)
      let payload = '?page=1&sort=first_name'
      if (!this.$_.isEmpty(filter)) {
        payload += '&filter=' + filter
      }
      const loading = this.$loading.open({
        container: this.$refs.element.$el
      })
      await this.$store.dispatch('users/getAll', payload)
      loading.close()
    },
    async changeUsersPage (page) {
      const filter = this.$store.getters['users/filter']
      let payload = '?page=' + page + '&sort=first_name'
      if (!this.$_.isEmpty(filter)) {
        payload += '&filter=' + filter
      }
      const loading = this.$loading.open({
        container: this.$refs.element.$el
      })
      await this.$store.dispatch('users/getAll', payload)
      loading.close()
    }
  }
}
</script>
