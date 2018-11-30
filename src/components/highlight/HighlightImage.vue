<template>
  <div class="column is-one-fifth">
    <div class="card">
      <div class="card-image">
        <figure class="image">
          <img :src="src">
        </figure>
      </div>
      <div class="card-content">
        <a
          class="icon is-size-5 has-text-danger is-pulled-right"
          style="cursor:pointer"
          @click="deleteImage"
        >
          <i class="fa fa-trash"></i>
        </a>
        {{ image.file_name }}
      </div>
    </div>
  </div>
</template>

<script>
import { Storage } from 'aws-amplify'
export default {
  props: ['image'],
  data () {
    return {
      src: ''
    }
  },
  mounted () {
    Storage.get(this.image.path)
      .then(result => {
        this.src = result
      })
      .catch(err => console.log(err))
  },
  watch: {
    image: function () {
      Storage.get(this.image.path)
        .then(result => {
          this.src = result
        })
        .catch(err => console.log(err))
    }
  },
  methods: {
    deleteImage () {
      const app = this
      const loading = this.$loading.open()
      const payload = {
        image_id: this.image.id,
        id: this.image.highlight_id
      }
      Storage.remove(this.image.path)
        .then(() => {
          this.$store.dispatch('highlights/deleteImage', payload)
            .then(() => {
              loading.close()
              app.$toast.open({
                duration: 3000,
                message: 'Image deleted successfully',
                type: 'is-success'
              })
            })
            .catch(err => {
              console.log(err)
              loading.close()
              app.$toast.open({
                duration: 3000,
                message: err.message,
                type: 'is-danger'
              })
            })
        })
        .catch((err) => {
          console.log(err)
          loading.close()
          app.$toast.open({
            duration: 3000,
            message: err.message,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
