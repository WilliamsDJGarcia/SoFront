<template>
  <v-app id="inspire">
    <div class="login-container">
      <v-content class="justify-center">
        <v-container class="fill-height" fluid>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field v-model="username" label="Login" name="login" type="text" />

                <v-text-field v-model="password" label="Password" name="password" type="password" />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="access()" color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

  <script>
import { API } from "../service/axios";
export default {
  props: {
    source: String
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    access() {
      const dataq = {
        username: this.username,
        password: this.password
      };
      // console.log(dataq)
      API.post("Login", dataq)
        .then(response => {
          localStorage.setItem("token", response.data.token);
          console.log(response.data);
          this.$router.push("/home");
        })
        .catch(err => {
          console.log("a " + err);
        });
    }
  }
};
</script>
<style scoped>
.login-container {
  align-items: center;
  margin: auto;
  position: relative;
  display: block;
  justify-content: center;
  flex-direction: row;
  align-content: center;
  max-width: 100%;
}
</style>