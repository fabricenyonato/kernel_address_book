<template>
  <div>
    <div class="d-flex flex-row align-items-center my-3 w-50">
        <h3>{{ `${contact.firstName} ${contact.lastName}` }}</h3>
        <div class="flex-fill"></div>

        <NuxtLink class="btn btn-link" to="/add">Update</NuxtLink>
        <NuxtLink class="btn btn-link text-danger" :to="`/delete/${contact._id}`">Delete</NuxtLink>
    </div>

    <table class="table w-50">
      <tbody>
        <tr>
          <th>Phone number</th>
          <td>{{ contact.tels[0] }}</td>
        </tr>

        <tr>
          <th>Email</th>
          <td>{{ contact.emails[0] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { findOneContact } from '../../api'

export default {
  data() {
    return { contact: null }
  },
  async asyncData(ctx) {
    const { id } = ctx.params
    const contact = await findOneContact(id)
    return { contact }
  },
}
</script>
