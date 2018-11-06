<template>
  <div class="has-text-left">
    <p class="is-size-4" style="margin-bottom: 15px;">Highlights</p>
    <div class="columns">
      <div class="column">
        <div class="box is-size-7">
        
        </div>
        <div class="box is-size-7">
          <b-table :data="data">
            <template slot-scope="props">
                <b-table-column field="highlightId" label="ID">
                    {{ props.row.highlightId }}
                </b-table-column>
                <b-table-column field="title" label="Title">
                    {{ props.row.title }}
                </b-table-column>
                <b-table-column field="scheduleDate" label="Scheduled Date">
                    {{ formatDate(props.row.scheduleDate) }}
                </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
      <div class="column">
        <div class="box">
          Fourth column
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        highlight: {}
      }
    },
    mounted() {
      this.$store.dispatch('highlights/getAll')
    },
    computed: {
      data() {
        return this.$store.getters['highlights/all']
      }
    },
    methods: {
      formatDate(date) {
        return this.$moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")
      }
    }
  }
</script>