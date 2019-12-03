<template>
  <v-card>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>! Bienvenido !</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>mdi-account</v-icon>Alumnos
      </v-tab>
      <v-tab>
        <v-icon left>mdi-lock</v-icon>Carreras
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <us></us>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <cl></cl>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import Us from "@/components/Main";
import Cl from "@/components/carrera";

export default {
  data: () => ({}),
  components: {
    us: Us,
    cl: Cl
  }
};
</script>