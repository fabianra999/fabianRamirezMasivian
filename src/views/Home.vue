<template>
  <v-container>
    <v-row>
      <template>
        <v-col>
          <v-card
            class="mx-auto elevation-20"
            color="grey lighten-3"
            style="max-width: 80vw"
          >
            <v-row justify="space-between">
              <v-col cols="8">
                <v-card-title>
                  <div>
                    <div class="headline">{{ newCharacter.name }}</div>
                    <v-divider></v-divider>
                    <div class="subTitle">
                      Species: {{ newCharacter.species }}
                    </div>
                    <div class="subTitle">Id: {{ newCharacter.id }}</div>
                    <div class="subTitle">
                      Height: {{ newCharacter.height }}
                    </div>
                    <div class="subTitle">
                      Gender: {{ newCharacter.gender }}
                    </div>
                    <div class="subTitle">
                      Homeworld: {{ newCharacter.homeworld }}
                    </div>
                  </div>
                </v-card-title>
              </v-col>
              <v-img
                class="shrink ma-2"
                contain
                height="100%"
                :src="newCharacter.image"
                style="flex-basis: 20%"
              ></v-img>
            </v-row>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col>
                  <p>
                    Aprende de <b>{{ newCharacter.name }}</b> y califica su
                    desempeño. <br />
                    No olvides revisar la wiki
                    <a
                      :href="newCharacter.wiki"
                      target="_blank"
                      rel="noopener noreferrer"
                      >{{ newCharacter.wiki }}</a
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
                ({{ newCharacter.rate }})
              </span>
              <v-rating
                v-model="newCharacter.rate"
                background-color="black"
                color="yellow accent-4"
                dense
                half-increments
                hover
                size="28"
              ></v-rating>
            </v-card-actions>
            <v-card-actions class="pa-4">
              <v-btn class="ma-2" outlined @click="randomSearch()"
                >Búsqueda Aleatoria</v-btn
              >
              <v-btn class="ma-2" outlined @click="saveSearch(newCharacter)"
                >Guardar</v-btn
              >
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
  name: "HelloWorld",
  data() {
    return {
      rating: 4.3,
    };
  },
  computed: {
    ...mapState("PostStore", ["newCharacter"]),
  },
  methods: {
    randomInteger(min = 100, max = 1000) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomSearch() {
      let numberRandom = this.randomInteger(1, 88);
      store
        .dispatch("PostStore/getCharacter", { numberRandom })
        .then((response) => {
          this.$swal({
            position: "center",
            icon: "success",
            title: "Muy bien",
            text: "Este personaje es generado aleatoriamente.",
            showConfirmButton: false,
            timer: 4000,
          });
        })
        .catch((e) => {
          this.$swal({
            position: "center",
            icon: "success",
            title: "Muy bien",
            text: "Los post no se cargo.",
            showConfirmButton: false,
            timer: 4000,
          });
          console.log(e);
        });
    },

    saveSearch(data) {
      store
        .dispatch("PostStore/putCharacter", { data })
        .then((response) => {
          this.$swal({
            position: "center",
            icon: "success",
            title: "Muy bien",
            text: "La calificación se guardo con éxito.",
            showConfirmButton: false,
            timer: 4000,
          });
        })
        .catch((e) => {
          this.$swal({
            position: "center",
            icon: "success",
            title: "Muy bien",
            text: "La calificación no se guardo.",
            showConfirmButton: false,
            timer: 4000,
          });
          console.log(e);
        });
    },
  },

  created() {
    this.randomSearch();
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  .v-card__title {
    .headline {
      text-align: center;
      margin-bottom: 1rem;
      text-transform: uppercase;
      font-weight: bold;
    }
    .subTitle {
      font-weight: 200;
      text-transform: capitalize;
    }
  }
}
</style>
