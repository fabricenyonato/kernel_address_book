<template>
  <Form @save="save($event)" />
</template>

<script>
import { addContact } from '../api'

export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async save(data) {
      try {
        await addContact(data)
      }
      catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
