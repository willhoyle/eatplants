<template lang="pug">
  .container.is-fluid
    .columns
      div(
        v-if="loggedIn"
        class="column is-offset-1-mobile is-10-mobile is-3-tablet is-4-desktop is-3-widescreen is-2-fullhd is-narrow"
        style="width: 200px;"
      )
        aside.menu
          template(v-for="menu in menus")
            template(v-if="menu.roles ? hasRoles(menu.roles) : true")
              p.menu-label(:key='menu.path') {{ menu.label }}
              ul.menu-list(:key='menu.path')
                li(v-for='item in menu.items' :key='item.path')
                  nuxt-link(:to='item.path' :class="{'is-active is-silver': $route.path == item.path}") {{ item.label }}
      .column
        nuxt-child
</template>

<script>
export default {
  data() {
    let menus = [
      {
        label: 'Meal Plan',
        items: [{ label: 'Calendar', path: '/app/calendar' }]
      },
      {
        label: 'My Library',
        items: [
          { label: 'Food', path: '/app/food' },
          { label: 'Recipes', path: '/app/recipes' },
          { label: 'Collections', path: '/app/collections' }
        ]
      },
      {
        label: 'Settings',
        items: [
          {
            label: 'Nutrient Profiles',
            path: '/app/settings/configuration'
          },
          { label: 'Account', path: '/app/settings/account' }
        ]
      },
      {
        label: 'Moderation',
        roles: ['mod'],
        items: [{ label: 'Submissions', path: '/app/moderation/submissions' }]
      },
      {
        label: 'Dev',
        roles: ['dev'],
        items: [
          { label: 'Servers', path: '/app/admin/servers' },
          { label: 'Users', path: '/app/admin/users' },
          { label: 'Groups', path: '/app/admin/groups' },
          { label: 'Organizations', path: '/app/admin/organizations' }
        ]
      }
    ]
    return {
      menus
    }
  }
}
</script>
