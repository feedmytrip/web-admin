<template>
  <div
    :style="eventStyle"
    class="is-size-7 has-text-centered"
    draggable="true"
    @mousedown="setDragHandler"
    @dragstart="dragstart($event)"
    @dragend="dragend($event)"
  >
    <template v-if="draggable == 'none'">
      <div class="has-background-white is-capitalized timeline-event">
        {{event.title.pt }}
      </div>
    </template>
    <template v-if="draggable != 'none'">
      <div
        v-if="draggable == 'offset' || draggable == 'all'"
        class="timeline-drag has-background-info is-pulled-left"
        id="offset"
      />
      <div class="timeline-sort is-pulled-left">
        <i
          v-if="sort && sortup && (draggable == 'offset' || draggable == 'all')"
          class="fa fa-arrow-up timeline-sort-icon"
          aria-hidden="true"
          @click="sortUp"
        ></i>
      </div>
      <div
        v-if="draggable == 'duration' || draggable == 'all'"
        class="timeline-drag has-background-info is-pulled-right"
        id="duration"
      />
      <div class="timeline-sort is-pulled-right">
        <i
          v-if="sort && sortdown && (draggable == 'duration' || draggable == 'all')"
          @click="sortDown"
          class="fa fa-arrow-down timeline-sort-icon"
          aria-hidden="true"
        ></i>
      </div>
      <div class="has-background-white is-capitalized timeline-event is-clearfix">
        {{event.title.pt }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ['event', 'renderType', 'offset', 'duration', 'draggable', 'sort', 'sortup', 'sortdown'],
  computed: {
    moving () {
      return this.$store.getters['trips/moving']
    },
    eventStyle () {
      return {
        width: this.duration + '%',
        'margin-left': this.offset + '%',
        'margin-top': '10px'
      }
    }
  },
  data () {
    return {
      handler: ''
    }
  },
  methods: {
    sortUp () {
      const payload = {
        type: this.renderType,
        event: this.event
      }
      this.$emit('sort-up', payload)
    },
    sortDown () {
      const payload = {
        type: this.renderType,
        event: this.event
      }
      this.$emit('sort-down', payload)
    },
    setDragHandler: function (e) {
      this.handler = e.target.id
    },
    dragstart: function (e, type) {
      if (this.handler === 'duration' || this.handler === 'offset') {
        e.target.style.opacity = 0.1
        const payload = {
          type: this.renderType,
          event: this.event,
          dragging: this.handler
        }
        e.dataTransfer.setData('text/plain', JSON.stringify(payload))
      } else {
        e.preventDefault()
      }
    },
    dragend: function (e) {
      e.target.style.opacity = 1
      this.handler = ''
    }
  }
}
</script>

<style>
.timeline-drag {
  width: 15px;
  height: 20px;
  border: 1px solid black;
  cursor: move;
}
.timeline-sort {
  width: 15px;
  height: 20px;
}
.timeline-sort-icon {
  cursor: pointer;
}
.timeline-event {
  height: 20px;
  border: 1px solid black;
  color: #4a4a4a;
}
</style>
