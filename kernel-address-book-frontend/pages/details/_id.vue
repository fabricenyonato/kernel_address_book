<template>
  <div>
    <div class="d-flex flex-row align-items-center my-3 w-50">
        <h3>{{ `${contact.firstName} ${contact.lastName}` }}</h3>
        <div class="flex-fill"></div>

        <NuxtLink class="btn btn-link" :to="`/update/${contact._id}`">Update</NuxtLink>
        <NuxtLink class="btn btn-link text-danger" :to="`/delete/${contact._id}`">Delete</NuxtLink>
    </div>

    <table class="table w-50">
      <tbody>
        <tr>
          <th>Phone number</th>
          <td>{{ contact.tel }}</td>
        </tr>

        <tr>
          <th>Email</th>
          <td>{{ contact.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
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
}
</script>
