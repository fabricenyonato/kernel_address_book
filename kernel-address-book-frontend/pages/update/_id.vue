<template>
  <Form @save="save($event)" :title="`Update ${contact.firstName}`" :initialValue="contact" />
</template>

<script>
export default {
  data() {
    return { contact: null }
  },

  async asyncData(ctx) {
    const id = ctx.params.id

    const contact = await ctx.app.$api.one(id)
    return { contact }
  },

  methods: {
    save(data) {
      const { id } = this.$route.params

      this.$api.update(id, data)
        .then(() => this.$router.back())
        .catch(error => {
          console.error(error)
        })
    },
  }
}
</script>
