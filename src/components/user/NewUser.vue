<template>
  <div style="margin-bottom: 25px;">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label is-small">Login</label>
          <div class="control">
            <input
              v-model="newUser.username"
              class="input is-small"
              type="text"
              placeholder="User first name"
            >
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label is-small">Password</label>
          <div class="control">
            <input
              v-model="newUser.password"
              class="input is-small"
              type="password"
              placeholder="User first name"
            >
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label is-small">First name</label>
          <div class="control">
            <input
              v-model="newUser.given_name"
              class="input is-small"
              type="text"
              placeholder="User first name"
            >
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label is-small">Last name</label>
          <div class="control">
            <input
              v-model="newUser.family_name"
              class="input is-small"
              type="text"
              placeholder="User last name"
            >
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label is-small">Email</label>
          <div class="control">
            <input
              v-model="newUser.email"
              class="input is-small"
              type="email"
              placeholder="User email"
            >
          </div>
        </div>
      </div>
      <div class="column is-1">
        <div class="field">
          <label class="label is-small">Group</label>
          <div class="control">
            <div class="select is-small is-fullwidth">
              <select v-model="newUser.group">
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-1">
        <div class="field">
          <label class="label is-small">Language</label>
          <div class="control">
            <div class="select is-small is-fullwidth">
              <select v-model="newUser.language_code">
                <option
                  value="pt"
                  selected
                >PT</option>
                <option value="es">ES</option>
                <option value="en">EN</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-1">
        <div class="field">
          <p
            class="control is-pulled-right"
            style="padding-top: 24px;"
          >
            <a
              class="button is-small is-info"
              @click="save"
              :class="loading ? 'is-loading' : ''"
            >Create New</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newUser: {
        language_code: 'pt',
        group: 'User'
      },
      loading: false
    }
  },
  methods: {
    save () {
      this.loading = true
      this.$store.dispatch('users/new', this.newUser)
        .then(() => {
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
          this.$toast.open({
            duration: 3000,
            message: err.message,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
