<template>
  <div>
    <div class="tabs">
      <ul>
        <router-link tag="li" to="/auxiliary/categories">
          <a>Categories</a>
        </router-link>
        <router-link tag="li" to="/auxiliary/locations">
          <a>Locations</a>
        </router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.commit('setTitle', 'Auxiliary')
    this.$store.commit('setSubtitle', 'Manages system auxiliary data like categories and locations')
  }
}
</script>
