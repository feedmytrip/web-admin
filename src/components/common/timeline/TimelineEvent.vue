<template>
  <div
    draggable="true"
    @dragstart="dragstart($event)"
    @dragend="dragend($event)"
    :style="eventStyle"
    class="is-size-7 has-text-centered has-background-white is-uppercase has-text-weight-bold has-text-grey timeline-event"
  >{{event.title.pt}}</div>
</template>

<script>
export default {
  props: ['event', 'unplanned', 'day'],
  computed: {
    moving () {
      return this.$store.getters['trips/moving']
    },
    eventStyle () {
      if (this.unplanned) {
        return {
          width: '100%',
          'margin-left': '0%'
        }
      }
      const offset = this.event.begin_offset - (86400 * (this.day - 1))
      let w = 31.8
      let m = 0
      if (offset === 21600) {
        m = 34.1
      }
      if (offset === 43200) {
        m = 68.2
      }
      return {
        width: w + '%',
        'margin-left': m + '%',
        'margin-top': '10px'
      }
    }
  },
  methods: {
    dragstart: function (e) {
      e.target.style.opacity = 0.1
      e.dataTransfer.setData('text/plain', this.event.id)
    },
    dragend: function (e) {
      e.target.style.opacity = 1
    }
  }
}
</script>

<style>
.timeline-event {
  height: 30px;
  border: 1px solid black;
  padding: 5px;
}
</style>
