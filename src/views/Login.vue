<template>
  <div class="container">
    <div class="col-md-6 mx-auto">
      <div class="card card-container p-3">
        <div class="mb-2">
          <h3>Login Form</h3>
        </div>
        <Form @submit="handleLogin" :validation-schema="schema">
          <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="text-danger" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="text-danger" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Login</span>
            </button>
          </div>
          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </Form>
      </div>

    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UserDataService from "@/services/UserDataService";
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      console.log("In handle login ",user);
      
      UserDataService.login(user).then(response=>{
        console.log(response);
        this.loading = false;
        localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("userId",response.data.id);
          localStorage.setItem("isAdmin",response.data.isAdmin);
          this.emitter.emit("logged", "User LoggedIn");
          this.emitter.emit("isAdmin","Admin")
          this.$router.push({
            name: "userhome"
          });
      },error=>{
        console.log(error);
        this.loading = false;
        this.message = error.response.data.message
      });
    },
  },
};
</script>