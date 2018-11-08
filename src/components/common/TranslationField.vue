<template>
  <div class="field is-horizontal">
    <div class="field-body">
      <div class="field">
        <input class="input is-small" type="text" placeholder="PT" v-on:input="onInput($event.target.value, 'pt')" v-bind:value="value.pt">
      </div>
      <div class="field">
        <input class="input is-small" type="text" placeholder="ES" v-on:input="onInput($event.target.value, 'es')" v-bind:value="value.es">
      </div>
      <div class="field">
        <input class="input is-small" type="text" placeholder="EN" v-on:input="onInput($event.target.value, 'en')" v-bind:value="value.en">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['value'],
    data() {
      return {
        translate: {
          pt: this.value.pt,
          es: this.value.es,
          en: this.value.en
        }
      }
    },
    methods: {
      onInput(val, code) {
        this.translate[code] = val
        this.$emit('input', this.translate)
      }
    }
  }
</script>