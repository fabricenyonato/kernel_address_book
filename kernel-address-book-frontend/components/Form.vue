<template>
  <div>
    <h3 class="my-3">{{ title }}</h3>

    <ValidationObserver
      v-slot="{ invalid }"
      @submit.prevent="submit()"
      ref="form"
      class="w-50"
      tag="form"
    >
      <ValidationProvider
        v-slot="{ errors }"
        rules="required"
        tag="div"
        class="form-floating mb-3"
      >
        <input
          v-model.trim="firstName"
          placeholder="First name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.length }"
          id="first-name"
        />
        <label for="first-name">First name</label>

        <div class="invalid-feedback" v-show="errors.length">
          {{ errors[0] }}
        </div>
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        rules="required"
        tag="div"
        class="form-floating mb-3"
      >
        <input
          v-model.trim="lastName"
          placeholder="Last name"
          type="text"
          class="form-control"
          id="last-name"
          :class="{ 'is-invalid': errors.length }"
        />
        <label for="last-name">Last name</label>

        <div class="invalid-feedback" v-show="errors.length">
          {{ errors[0] }}
        </div>
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        :rules="{
          required: true,
          regex: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
        }"
        tag="div"
        class="form-floating mb-3"
      >
        <input
          v-model.trim="tel"
          placeholder="Phone number"
          type="tel"
          class="form-control"
          id="tel"
          :class="{ 'is-invalid': errors.length }"
        />
        <label for="tel">Phone number</label>

        <div class="invalid-feedback" v-show="errors.length">
          {{ errors[0] }}
        </div>
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        rules="required|email"
        tag="div"
        class="form-floating mb-3"
      >
        <input
          v-model.trim="email"
          placeholder="Email"
          type="email"
          class="form-control"
          id="email"
          :class="{ 'is-invalid': errors.length }"
        />
        <label for="email">Email</label>

        <div class="invalid-feedback" v-show="errors.length">
          {{ errors[0] }}
        </div>
      </ValidationProvider>

      <button type="submit" class="btn btn-primary" :disabled="invalid">
        Save
      </button>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  props: {
    title: String,
    initialValue: Object,
  },
  components: { ValidationProvider, ValidationObserver },
  data() {
    return {
      firstName: null,
      lastName: null,
      tel: null,
      email: null,
    };
  },
  mounted() {
    if (!this.initialValue) {
      return
    }

    this.firstName = this.initialValue.firstName
    this.lastName = this.initialValue.lastName
    this.email = this.initialValue.email
    this.tel = this.initialValue.tel
  },
  methods: {
    submit() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        tel: this.tel,
        email: this.email,
      }

      this.$emit('save', data)
    }
  },
}
</script>
