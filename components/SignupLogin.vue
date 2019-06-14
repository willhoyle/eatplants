<template lang="pug">
div(style="min-width: 400px;").has-text-left
  b-tabs(v-model='loginTabs', expanded is-boxed)
    b-tab-item(label='Sign in')
      .columns
        .column
            section
              b-field(label='Email')
                b-input(v-model='email', type='email', placeholder='Your email', autofocus, icon='email', required).
                  
                  
              b-field(label='Password')
                b-input(v-model='password', type='password', password-reveal, icon='lock', placeholder='Your password', required).
                  
                  
              b-checkbox(v-model='remember') Remember me
              br
              br
              button.button.is-primary(@click='submitLogin') Login
    b-tab-item(label='Register')
      .columns
        .column
          section
            b-field(label='Email')
              b-input(v-model='email', type='email', placeholder='Your email', autofocus, icon='email', required).
                
                
            b-field(label='Password')
              b-input(v-model='password', type='password', password-reveal, icon='lock', placeholder='Your password', required).
                
                
            b-field(label='Confirm Password')
              b-input(v-model='passwordConfirm', type='password', password-reveal, icon='lock', placeholder='Your password', required).
                
                
            button.button.is-primary(@click='submitRegister') Register
</template>

<script>
export default {
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
