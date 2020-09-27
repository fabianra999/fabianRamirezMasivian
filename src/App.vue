<template>
  <v-app>
    <v-sheet class="overflow-hidden">
      <v-app-bar color="grey darken-4" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Qualify</v-toolbar-title>
      </v-app-bar>

      <v-container class="fill-height">
        <router-view />
      </v-container>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <router-link :to="item.path">
                  {{ item.title }}
                </router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: " question_answer", path: "/home" },
        { title: "My Classifieds", icon: "dashboard", path: "/posts" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.v-list-item__title {
  a {
    text-decoration: none;
    color: black;
  }
}
</style>



