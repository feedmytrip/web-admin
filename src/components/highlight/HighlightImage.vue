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
      src: this.image.s3ImageURL
    }
  },
  mounted () {
    if (this.$_.isEmpty(this.image.s3ImageURL)) {
      console.log('storage get')
      Storage.get(this.image.path)
        .then(result => {
          this.image.s3ImageURL = result
          this.$store.commit('highlights/updateHighlightImage', this.image)
          this.src = this.image.s3ImageURL
        })
        .catch(err => console.log(err))
    }
  },
  watch: {
    image: function () {
      if (this.$_.isEmpty(this.image.s3ImageURL)) {
        console.log('storage get')
        Storage.get(this.image.path)
          .then(result => {
            this.image.s3ImageURL = result
            this.$store.commit('highlights/updateHighlightImage', this.image)
            this.src = this.image.s3ImageURL
          })
          .catch(err => console.log(err))
      }
      this.src = this.image.s3ImageURL
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
