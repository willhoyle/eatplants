<template>
  <div>
    <b-tabs 
      v-model="loginTabs" 
      expanded>
      <b-tab-item label="Sign in">

        <div 
          class="modal-card" 
          style="width: 300px;">
          <section class="modal-card-body">
            <b-field label="Email">
              <b-input
                v-model="email"
                type="email"
                placeholder="Your email"
                autofocus
                icon="envelope"
                required/>
            </b-field>

            <b-field label="Password">
              <b-input
                v-model="password"
                type="password"
                password-reveal
                icon="lock"
                placeholder="Your password"
                required/>
            </b-field>

            <b-checkbox v-model="remember">Remember me</b-checkbox>
            <br>
            <br>
            <button 
              class="button is-primary" 
              @click="submitLogin">Login</button>
          </section>
        </div>
      </b-tab-item>
      <b-tab-item label="Register">

        <div 
          class="modal-card" 
          style="width: 300px;">
          <section class="modal-card-body">
            <b-field label="Email">
              <b-input
                v-model="email"
                type="email"
                placeholder="Your email"
                autofocus
                icon="envelope"
                required/>
            </b-field>

            <b-field label="Password">
              <b-input
                v-model="password"
                type="password"
                password-reveal
                icon="lock"
                placeholder="Your password"
                required/>
            </b-field>

            <b-field label="Confirm Password">
              <b-input
                v-model="passwordConfirm"
                type="password"
                password-reveal
                icon="lock"
                placeholder="Your password"
                required/>
            </b-field>
            <button 
              class="button is-primary" 
              @click="submitRegister">Register</button>
          </section>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
export default {
  props: ['loggedIn'],
  data() {
    return {
      loginTabs: 0,
      email: '',
      password: '',
      passwordConfirm: '',
      remember: false
    }
  },
  methods: {
    submitRegister() {},
    submitLogin() {}
  }
}
</script>
