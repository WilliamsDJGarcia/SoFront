<template>
  <v-app>
    <v-card>
      <v-card-title>
        Alumnos
        <v-spacer></v-spacer>
        <v-text-field v-model="search" label="Buscar" single-line hide-details></v-text-field>
        <!-- <v-icon>{{svg2}}</v-icon> -->
      </v-card-title>
    </v-card>

    <v-content>
      <v-data-table :search="search" :headers="headers" :items="alumnos" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.lastName }}</td>
          <td>{{ props.item.age }}</td>
          <td>{{ props.item.genere }}</td>
          <td>{{ props.item.address }}</td>
          <td>{{ props.item.carrera }}</td>
          <td>
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteAlumno(props.item.id)" color="red">delete</v-icon>
          </td>
        </template>
      </v-data-table>

      <v-btn class="mx-2" fab dark color="indigo" bottom fixed right @click="dialog=true">
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

                <v-text-field v-model="editedItem.lastName" label="Apellido"></v-text-field>

                <v-text-field v-model="editedItem.age" label="Edad"></v-text-field>
                <v-text-field v-model="editedItem.genere" label="Género"></v-text-field>
                <v-text-field v-model="editedItem.address" label="Dirección"></v-text-field>
                <!-- <v-text-field v-model="editedItem.id_Carrera" label="Carrera"></v-text-field> -->
                <v-select
                  v-model="editedItem.id_Carrera"
                  :items="selected"
                  label="Carrera"
                  :placeholder="carer"
                  item-text="name"
                  item-value="id"  
                ></v-select>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="close">Cancelar</v-btn>
            <v-btn flat @click="editAlumno">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }"></template>
        <v-card>
          <v-card-title>
            <span class="headline">Agregar</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-form>
                <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>

                <v-text-field v-model="editedItem.lastName" label="Apellido"></v-text-field>

                <v-text-field v-model="editedItem.age" label="Edad"></v-text-field>
                <v-text-field v-model="editedItem.genere" label="Género"></v-text-field>
                <v-text-field v-model="editedItem.address" label="Dirección"></v-text-field>
                <!-- <v-text-field v-model="editedItem.id_Carrera" label="Carrera"></v-text-field> -->
                <v-select
                  v-model="editedItem.id_Carrera"
                  :items="selected"
                  label="Carrera"
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="close2">Cancelar</v-btn>
            <v-btn flat @click="addAlumno">Guardar</v-btn>
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
    dialog: false,
    dialog2: false,
    singleSelect: true,
    selected: [],
    search: "",
    fab: false,
    headers: [
      {
        text: "Nombre",
        value: "name"
      },
      { text: "Apellido Paterno", value: "lastName" },
      { text: "Edad", value: "age" },
      { text: "Género", value: "genere" },
      { text: "Dirección", value: "address" },
      { text: "Carrera", value: "carrera" },
      { text: "Acciones", value: "acciones" }
    ],
    alumnos: [],
    editedIndex: -1,
    carer:'',
    idC:'',
    editedItem: {
      name: "",
      lastName: "",
      age: "",
      genere: "",
      address: "",
      id_Carrera: ""
    },
    defaultItem: {
      name: "",
      lastName: "",
      age: "",
      genere: "",
      address: "",
      id_Carrera: ""
    },
    id: ""
  }),
  methods: {
    getAlumnos() {
      let config = {
        headers: {
          Authorization: "Token "+localStorage.getItem('token')
        }
      };
      // console.log(localStorage.getItem("token"));

      API.get("Registro/usuario_search/", config)
        .then(response => {
          this.alumnos = response.data;
          console.log(response.data);
        })
        .catch(error => console.log(error));
    },
    getCarrera() {
      let config = {
        headers: {
          Authorization: "Token "+ localStorage.getItem('token')
        }
      };
      // console.log(localStorage.getItem("token"));

      API.get("Registro/carrera_lista/", config)
        .then(response => {
          this.selected = response.data;
          // console.log(response.data.name);
        })
        .catch(error => console.log(error));
    },
    addAlumno() {
      let config = {
        headers: {
          Authorization: "Token "+ localStorage.getItem('token')
        }
      };

      console.log(this.editedItem);
      API.post("Registro/usuario_lista/", this.editedItem, config)
        .then(response => {
          console.log(response.data);
          // swal("Alumno creado correctamente!", "", "success").then(() => {
          this.close2();
          this.getAlumnos();
          // });
        })
        .catch(error => console.log(error));
    },
    editAlumno() {
      let config = {
        headers: {
          Authorization: "Token "+ localStorage.getItem('token')
        }
      };
      const a = {
        name: this.editedItem.name,
        lastName: this.editedItem.lastName,
        age: this.editedItem.age,
        genere: this.editedItem.genere,
        address: this.editedItem.address,
        id_Carrera: this.editedItem.id_Carrera || this.idC
      };
      console.log(this.id);
      console.log(a);
      API.put("Registro/usuario_detail/" + this.id, a, config)
        .then(response => {
          console.log(response.data);
          this.close();
          this.getAlumnos();
        })
        .catch(e => console.log(e));
    },
    deleteAlumno(x) {
      this.id = x;
      let config = {
        headers: {
          Authorization: "Token "+ localStorage.getItem('token')
        }
      };
      console.log(this.id);

      API.delete("Registro/usuario_detail/" + this.id, config)
        .then(response => {
          console.log(response);
          this.getAlumnos();
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
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 100);
    },
    editItem(item) {
      this.id = item.id;
      this.carer = item.carrera;
      this.idC = item.idC
      console.log(this.carer);
      console.log(this.idC);
      console.log(this.id);
      this.editedIndex = this.alumnos.indexOf(item.id);
      this.editedItem = Object.assign({}, item);
      this.dialog2 = true;
    }
  },
  created() {
    this.getAlumnos();
    this.getCarrera();
  }
};
</script>

<style scoped>
</style>