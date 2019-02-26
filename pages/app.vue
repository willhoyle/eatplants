<template>
  <div class="container is-fluid">
    <div class="columns">
      <div
        class="column is-offset-1-mobile is-10-mobile is-3-tablet is-4-desktop is-3-widescreen is-2-fullhd is-narrow"
        style="width: 200px;"
      >
        <aside class="menu">
          <template v-for="menu in menus">
            <template v-if="menu.roles ? hasRoles(menu.roles) : true">
              <p :key="menu.path" class="menu-label">{{ menu.label }}</p>
              <ul :key="menu.path" class="menu-list">
                <li v-for="item in menu.items" :key="item.path">
                  <nuxt-link
                    :to="item.path"
                    :class="{'is-active': $route.path == item.path}"
                  >{{ item.label }}</nuxt-link>
                </li>
              </ul>
            </template>
          </template>
        </aside>
      </div>
      <div class="column">
        <nuxt-child/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let menus = [
      {
        items: [
          { label: 'Optimizer', path: '/app/optimizer' },
          { label: 'Nutrients', path: '/app/nutrients' }
        ]
      },
      {
        label: 'Food Collections',
        items: [
          { label: 'Search Collections', path: '/app/collections' },
          { label: 'My Collections', path: '/app/my-collections' }
        ]
      },
      {
        label: 'Settings',
        items: [
          { label: 'Macro/Micronutrients', path: '/app/config' },
          { label: 'Account', path: '/app/account' }
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
        items: [{ label: 'Health', path: '/app/admin/health' }]
      }
    ]
    return {
      menus
    }
  }
}
</script>
