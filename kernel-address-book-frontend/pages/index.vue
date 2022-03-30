<template>
  <div>
    <div class="d-flex flex-row align-items-center my-3 gap-3">
      <h3>Contacts</h3>
      <div class="flex-fill"></div>

      <input type="text" class="form-control" style="width: 20rem;" v-model.trim="query" placeholder="Search" />

      <NuxtLink class="btn btn-primary" to="/add">Add new</NuxtLink>
    </div>

    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Tel</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="contact in contacts" :key="contact._id">
          <td>{{ contact.firstName }}</td>
          <td>{{ contact.lastName }}</td>
          <td>{{ contact.tel }}</td>
          <td>{{ contact.email }}</td>
          <td>
            <div class="d-flex flex-row justify-content-end gap-2">
              <NuxtLink class="" :to="`/details/${contact._id}`">View</NuxtLink>
              <NuxtLink class="" :to="`/update/${contact._id}`">Update</NuxtLink>
              <NuxtLink class="text-danger" :to="`/delete/${contact._id}`">Delete</NuxtLink>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      query: null
    }
  },
  async asyncData({ app: { $api } }) {
    const items = await $api.all()
    return { items }
  },
  computed: {
    contacts() {
      if (!this.query) {
        return this.items
      }

      const query = this.query.toLowerCase()

      return this.items.filter(item => {
        return item.firstName.toLowerCase().includes(query) ||
          item.lastName.toLowerCase().includes(query) ||
          item.tel.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query)
      })
    }
  }
}
</script>
