<template>
  <div>
    <div class="d-flex flex-row align-items-center my-3 gap-3">
      <h3>Contacts</h3>
      <div class="flex-fill"></div>

      <form @submit.prevent="search()">
        <div class="input-group" style="width: 20rem;">
          <input type="text" class="form-control" v-model.trim="query" />
          <button class="btn btn-outline-secondary" type="submit" :disabled="!query">Search</button>
        </div>
      </form>

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
          <td>{{ contact.tels.join(', ') }}</td>
          <td>{{ contact.emails.join(', ') }}</td>
          <td>
            <div class="d-flex flex-row justify-content-end">
              <NuxtLink class="btn btn-link" :to="`/details/${contact._id}`">View</NuxtLink>
              <NuxtLink class="btn btn-link" to="/add">Update</NuxtLink>
              <NuxtLink class="btn btn-link text-danger" :to="`/delete/${contact._id}`">Delete</NuxtLink>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { findAllContacts } from '../api'

export default {
  data() {
    return {
      contacts: [],
      query: null
    }
  },
  async asyncData() {
    const contacts = await findAllContacts()
    return { contacts }
  },
}
</script>
