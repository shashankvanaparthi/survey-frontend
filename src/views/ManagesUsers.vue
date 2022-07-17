<template>
    <v-container class="mt-4">
        <v-row v-if="usersList.length == 0">
            <h3>No Users Present</h3>
        </v-row>
        <v-row v-else>
            <table class="table mx-auto">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="user in usersList" :key="user.id">
                        <tr>
                            <th scope="row">{{ user.id }}</th>
                            <td>{{ user.firstName }}</td>
                            <td>{{ user.email }}</td>
                            <td>
                                <button type="button" @click="deleteUser(user.id)" class="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </v-row>

    </v-container>
</template>

<script>
import UserDataService from '@/services/UserDataService';

export default {

    data() {
        return {
            usersList: []
        }
    },
    methods: {

        async getAllUsers() {
            const users = await UserDataService.getAllUsers();
            return users.data;
        },

        deleteUser(userId) {
            UserDataService.deleteUser(userId).then(res => {
                console.log(res);
                this.getAllUsers().then(
                    (res) => {
                        this.usersList = res;
                        console.log(res);
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            }, error => {
                console.log(error);
            })
        }

    },
    created() {
        this.getAllUsers().then(
            (res) => {
                this.usersList = res;
                console.log(res);
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
</script>
