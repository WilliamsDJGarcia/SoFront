<template>
  <v-app>
    <v-card>
      <v-card-title>
        Carreras
        <v-spacer></v-spacer>
        <v-text-field v-model="search" label="Buscar" single-line hide-details></v-text-field>
        <!-- <v-icon>{{svg2}}</v-icon> -->
      </v-card-title>
    </v-card>

    <v-content>
      <v-data-table :search="search" :headers="headers" :items="carreras" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteCarrera(props.item.id)" color="red">delete</v-icon>
          </td>
        </template>
      </v-data-table>

      <v-btn class="mx-2" fab dark color="indigo" bottom fixed right @click="dialog1=true">
        <v-icon dark>add</v-icon>
      </v-btn>

      <v-dialog v-model="dialog2" max-width="500px">
        <template v-slot:activator="{ on }"></template>
        <v-card>
          <v-card-title>
            <span class="headline">Editar</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-form>
                <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="close">Cancelar</v-btn>
            <v-btn flat @click="editCarrera">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog1" max-width="500px">
        <template v-slot:activator="{ on }"></template>
        <v-card>
          <v-card-title>
            <span class="headline">Agregar</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-form>
                <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="close2">Cancelar</v-btn>
            <v-btn flat @click="addCarrera">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script>
import { API } from "../service/axios";

import "vuejs-noty/dist/vuejs-noty.css";

export default {
  data: () => ({
    dialog1: false,
    dialog2: false,
    search: "",
    fab: false,
    headers: [
      {
        text: "Nombre",
        value: "name"
      },
      { text: "Acciones", value: "acciones" }
    ],
    carreras: [],
    editedItem: {
      name: ""
    },
    defaultItem: {
      name: ""
    },
    id: ""
  }),
  methods: {
    getCarrera() {
      let config = {
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      };
      // console.log(localStorage.getItem("token"));

      API.get("Registro/carrera_lista/", config)
        .then(response => {
          this.carreras = response.data;
          // console.log(response.data.name);
        })
        .catch(error => console.log(error));
    },
    addCarrera() {
      let config = {
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      };

      console.log(this.editedItem);
      API.post("Registro/carrera_lista/", this.editedItem, config)
        .then(response => {
          console.log(response.data);
          // swal("Alumno creado correctamente!", "", "success").then(() => {
          this.close2();
          this.getCarrera();
          // });
        })
        .catch(error => console.log(error));
    },
    editCarrera() {
      let config = {
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      };
      const a = {
        name: this.editedItem.name
      };
      console.log(this.id);
      console.log(a);
      API.put("Registro/carrera_detail/" + this.id, a, config)
        .then(response => {
          console.log(response.data);
          this.close();
          this.getCarrera();
        })
        .catch(e => console.log(e));
    },
    deleteCarrera(x) {
      this.id = x;
      let config = {
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      };
      console.log(this.id);

      API.delete("Registro/carrera_detail/" + this.id, config)
        .then(response => {
          console.log(response);
          this.getCarrera();
          // swal("Alumno eliminado correctamente!", "", "success").then(() => {
          //   this.getAlumnos();
          // });
        })
        .catch(error => console.log(error));
    },
    close() {
      this.dialog2 = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 100);
    },
    close2() {
      this.dialog1 = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 100);
    },
    editItem(item) {
      this.id = item.id;
      console.log(this.id);
      this.editedIndex = this.carreras.indexOf(item.id);
      this.editedItem = Object.assign({}, item);
      this.dialog2 = true;
    }
  },
  created() {
    this.getCarrera();
  }
};
</script>

<style scoped>
</style>