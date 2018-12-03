<template>
  <div class="column is-one-quarter">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Day {{ day }}</p>
      </header>
      <div class="card-content">
        <b-autocomplete
          v-model="filter"
          size="is-small"
          ref="autocomplete"
          :data="globalEvents"
          field="title.pt"
          placeholder="Search for events"
          :loading="isFetching"
          @input="getAsyncEventData"
          @select="AddItineraryEvent"
        >
          <template slot="header">
            <a @click="AddNewGlobalEvent">
              <span>Add new event...</span>
            </a>
          </template>
          <template slot="empty">No results for {{filter}}</template>
        </b-autocomplete>
      </div>
      <draggable
        v-model="localEvents"
        :options="{group:'events', animation: 0, ghostClass: 'ghost'}"
        @change="onChange"
        style="display: block; min-height:10px;"
      >
        <div
          class="has-background-white-ter is-size-7"
          style="padding:15px; border-top: 1px solid #ddd; border-left:12px solid #3273dc;"
          v-for="event in localEvents"
          :key="event.id"
        >
          <span style="vertical-align: middle; height:">{{ event.title.pt }}</span>
          <a
            class="icon is-size-6 has-text-danger is-pulled-right"
            style="cursor:pointer;"
            @click="deleteEvent(event.id)"
          >
            <i class="fa fa-times-circle"></i>
          </a>
        </div>
      </draggable>
      <!--
        https://github.com/SortableJS/Vue.Draggable
      <ul>
        <li
          v-for="(event, key) in dayEvents"
          :key="key"
          class="has-background-white-ter is-size-7"
          style="padding:15px; border-top: 1px solid #ddd; border-left:12px solid #3273dc;"
        >
          <span style="vertical-align: middle; height:">{{ event.title.pt }}</span>
          <a
            class="icon is-size-6 has-text-danger is-pulled-right"
            style="cursor:pointer;"
            @click="deleteEvent(event.id)"
          >
            <i class="fa fa-times-circle"></i>
          </a>
        </li>
      </ul>
      -->
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import debounce from 'lodash/debounce'
export default {
  props: ['day', 'itineraryId'],
  components: {
    draggable
  },
  data () {
    return {
      localEvents: [],
      filter: '',
      isFetching: false,
      selected: null
    }
  },
  mounted () {
    this.localEvents = this.dayEvents
  },
  computed: {
    dayEvents () {
      const events = this.$store.getters['trips/getTripItineraryEvents'].data
      const d = this.day
      return this.$_.filter(events, function (e) { return e.begin_offset >= 86400 * (d - 1) && e.begin_offset < 86400 * d })
    },
    globalEvents () {
      return this.$store.getters['events/all'].data
    },
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    }
  },
  methods: {
    onChange ({ added }) {
      console.log('Day ' + this.day)
      console.log(added)
    },
    getAsyncEventData: debounce(async function () {
      const payload = '?page=1&filter=' + this.filter
      this.isFetching = true
      await this.$store.dispatch('events/getAll', payload)
      this.isFetching = false
    }, 500),
    AddItineraryEvent (event) {
      const payload = {
        trip_id: this.$route.params.id,
        itinerary_id: this.itineraryId,
        global_id: event.id,
        event: {
          begin_offset: 86400 * (this.day - 1)
        }
      }
      this.$store.dispatch('trips/addItineraryEvent', payload)
        .then(() => {
          this.filter = ''
        })
        .catch(err => {
          console.log(err)
          this.$toast.open({
            duration: 3000,
            message: err.message,
            type: 'is-danger'
          })
        })
    },
    deleteEvent (id) {
      const loading = this.$loading.open()
      const payload = {
        trip_id: this.$route.params.id,
        itinerary_id: this.itineraryId,
        id: id
      }
      this.$store.dispatch('trips/deleteItineraryEvent', payload)
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
    AddNewGlobalEvent () {
      this.$dialog.prompt({
        message: 'New Event',
        inputAttrs: {
          placeholder: 'event title',
          value: this.filter
        },
        confirmText: 'Add',
        onConfirm: (value) => {
          const event = {
            title: {}
          }
          event['title'][this.languageCode] = value
          this.$store.dispatch('events/new', event)
            .then(response => {
              this.AddItineraryEvent(response)
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
      })
    }
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
