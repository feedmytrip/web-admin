<template>
  <div
    draggable="true"
    @dragstart="dragstart($event)"
    @dragend="dragend($event)"
    :style="eventStyle"
    class="is-size-7 has-text-centered has-background-white is-capitalized timeline-unplanned-event"
  >{{event['title'][languageCode]}}</div>
</template>

<script>
export default {
  props: ['event'],
  methods: {
    dragstart: function (e) {
      e.target.style.opacity = 0.1
      const payload = {
        event: this.event,
        dragging: 'unplanned'
      }
      e.dataTransfer.setData('text/plain', JSON.stringify(payload))
    },
    dragend: function (e) {
      e.target.style.opacity = 1
    }
  },
  computed: {
    languageCode () {
      return this.$store.getters['auth/userLanguageCode']
    }
  }
}
</script>

<style>
.timeline-unplanned-event {
  width: 100%;
  height: 20px;
  border: 1px solid black;
  color: #4a4a4a;
}
</style>
