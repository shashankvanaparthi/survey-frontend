<template>
    <div class="container">
        <div class="col-md-6 mx-auto">
            <div class="card card-container p-3">
                <div class="mb-2">
                    <h3>Create User</h3>
                </div>
                <Form @submit="handleSignup" :validation-schema="schema">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="firstName">FirstName</label>
                                <Field name="firstName" type="text" class="form-control" />
                                <ErrorMessage name="firstName" class="text-danger" />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="lastName">LastName</label>
                                <Field name="lastName" type="text" class="form-control" />
                                <ErrorMessage name="lastName" class="text-danger" />
                            </div>
                        </div>
                    </div>


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
                        <label for="confirmPassword">Confirm Password</label>
                        <Field name="confirmPassword" type="password" class="form-control" />
                        <ErrorMessage name="confirmPassword" class="text-danger" />
                    </div>

                    <div class="form-group">
                        <button class="btn btn-primary btn-block" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            <span>Signup</span>
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
            firstName: yup.string().required("FirstName is required!"),
            lastName: yup.string().required("LastName is required!"),
            email: yup.string().required("Email is required!"),
            password: yup.string().required("Password is required!"),
            confirmPassword: yup.string().required("Confirm Password is required!")
        });
        return {
            loading: false,
            message: "",
            schema,
        };
    },
    methods: {
        handleSignup(user) {
            this.loading = true;
            if(user.password!=user.confirmPassword){
                this.loading = false;
                this.message = "Password and Confirm Password must be same";
                return;
            }
            console.log("In handle Signup ", user);
            UserDataService.signup(user).then(res => {
                console.log(res);
                this.$router.push({ name: "/signup" })
            }, error => {
                this.message = error.response.data.msg;
                this.loading = false;
                console.log(error);
            });
        },
    },
};
</script>