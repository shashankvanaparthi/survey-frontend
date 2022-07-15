<template>
    <div class="container mt-5 d-flex justify-content-center align-items-center">

        <div class="card">

            <div class="upper">
                <img src="https://i.imgur.com/Qtrsrk5.jpg" class="img-fluid">
            </div>

            <div class="user text-center">

                <div class="profile">

                    <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" class="rounded-circle" width="80">

                </div>

            </div>


            <div class="mt-5 text-center">

                <h4 class="mb-0">{{ user.firstName }} {{user.lastName}}</h4>
                <span class="text-muted d-block mb-2">{{ user.email }}</span>
            </div>

            <v-btn class="mt-3" color="deep-purple lighten-2" text @click="dialog = true">
                Edit
            </v-btn>

        </div>
    </div>

    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card min-width="600px">
            <v-card-title class="text-h5"> Update User Details </v-card-title>
            <v-card-text>
                <v-container fluid>
                    <v-row>
                        <v-text-field v-model="user.firstName" name="firstname" label="FirstName" type="text"
                            placeholder="First Name" required></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field v-model="user.lastName" name="lastname" label="LastName" type="text"
                            placeholder="Last Name" required></v-text-field>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false"> Cancel </v-btn>
                <v-btn color="green darken-1" text @click="editUser"> Save </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
import UserDataService from "../services/UserDataService"
export default {
    data() {
        return {
            dialog: false,
            user: {
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                createdAt: null
            }
        }
    },
    methods: {
        getUser() {
            const userId = localStorage.userId;
            UserDataService.getUser(userId).then(res => {
                this.user = res.data;
            }, err => {
                console.log(err);
            })
        },
        editUser() {
            UserDataService.updateUser(this.user).then(res => {
                this.getUser();
                this.dialog=false;
            }, err => {
                console.log(err);
            })
        }
    },
    created() {
        this.getUser()
    }
}
</script>