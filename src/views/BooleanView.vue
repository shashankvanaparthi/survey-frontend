<template>
    <!-- <v-radio-group v-model="ex7" column>
        <v-radio v-for="(item, index) in answers" :key="index" :value="item.value"></v-radio>
    </v-radio-group> -->
    <v-container class="m-2 p-2">
        <v-row>
            <ul>
                <li v-for="(answer,index) in answers" :key="index">
                    {{answer.value}}
                </li>
            </ul>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            answers: []
        }
    },
    created() {
        this.answers = [];
        this.answers.push({ value: true })
        this.answers.push({ value: false })
    }
}
</script>