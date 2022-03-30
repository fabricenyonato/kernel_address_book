<template>
  <Form @save="save($event)" title="Add new" />
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async save(data) {
      this.$api.create(data)
      .then(() => this.$router.push({ path: '/' }))
      .catch(console.error)
    }
  }
}
</script>
