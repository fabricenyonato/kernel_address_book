<template>
  <div>
    <h3 class="my-3">Delete {{ `${contact.firstName} ${contact.lastName}` }} ?</h3>

    <div class="d-flex flex-row gap-3">
      <button class="btn btn-secondary" type="button" @click="back()">Cancel</button>
      <button class="btn btn-outline-danger" type="button" @click="remove()">Delete</button>
    </div>
  </div>
</template>

<script>
import { deleteContact, findOneContact } from '../../api'

export default {
  data() {
    return { contact: null }
  },
  async asyncData(ctx) {
    const { id } = ctx.params
    const contact = await findOneContact(id)
    return { contact }
  },
  methods: {
    back() {
      this.$router.back()
    },

    async remove() {
      await deleteContact(this.contact._id)
      this.$router.push({ path: '/' })
    },
  }
}
</script>
