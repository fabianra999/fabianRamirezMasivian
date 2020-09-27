<template>
  <v-container>
    <v-row>
      <template>
        <v-col md="4" v-for="(item, index) in postStore" :key="`item-${index}`">
          <v-card
            class="mx-auto elevation-20"
            color="grey lighten-3"
            style="max-width: 80vw"
          >
            <v-row justify="space-between">
              <v-col cols="8">
                <v-card-title>
                  <div>
                    <div class="headline">{{ item.name }}</div>
                    <v-divider></v-divider>
                    <div class="subTitle">Species: {{ item.species }}</div>
                    <div class="subTitle">Id: {{ item.id }}</div>
                    <div class="subTitle">Height: {{ item.height }}</div>
                    <div class="subTitle">Gender: {{ item.gender }}</div>
                    <div class="subTitle">Homeworld: {{ item.homeworld }}</div>
                  </div>
                </v-card-title>
              </v-col>
              <v-img
                class="shrink ma-2"
                contain
                height="100%"
                :src="item.image"
                style="flex-basis: 20%"
              ></v-img>
            </v-row>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col>
                  <p>
                    Aprende de <b>{{ item.name }}</b> y califica su desempeño.
                    <br />
                    No olvides revisar la wiki
                    <a
                      :href="item.wiki"
                      target="_blank"
                      rel="noopener noreferrer"
                      >{{ item.wiki }}</a
                    >
                    y obtener mas información. <br />
                    Revisa tus calificaciones
                    <router-link :to="'/posts'">Ver</router-link>
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="pa-4">
              Calificación
              <v-spacer></v-spacer>
              <span class="grey--text text--darken-2 caption mr-2">
                ({{ item.rate }})
              </span>
              <v-rating
                v-model="item.rate"
                background-color="black"
                color="yellow accent-4"
                dense
                half-increments
                hover
                size="28"
              ></v-rating>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import store from "@/store";
import { createHelpers } from "vuex-map-fields";

export default {
  name: "Posts",
  data() {
    return {};
  },
  computed: {
    ...mapState("PostStore", ["postStore"]),
  },
  methods: {
    getPosts() {
      store
        .dispatch("PostStore/getPostsList")
        .then((response) => {
          this.$swal({
            position: "center",
            icon: "success",
            title: "Muy bien",
            text: "Los posts se cargaron exitosamente.",
            showConfirmButton: false,
            timer: 4000,
          });
        })
        .catch((e) => {
          this.$swal({
            position: "center",
            icon: "success",
            title: "Muy bien",
            text: "Los posts no se cargaron.",
            showConfirmButton: false,
            timer: 4000,
          });
          console.log(e);
        });
    },
  },

  created() {
    this.getPosts();
  },
};
</script>

<style scoped>
</style>
