<template>
    <v-container>
        <v-row v-for="(answer, index) in answers" :key="index">
            <v-col>
                {{ answer.name }} {{answer.value}}
            </v-col>
            <!-- <v-col lg="{6}">
                <v-slider v-model="answer.value" :step="1" thumb-label :min="0" :max="5" :label="answer.value">
                </v-slider>

            </v-col> -->
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
        this.answers.push({ value: 0, name: "Min:" })
        this.answers.push({ value: 5, name: "Max:" })
    }
}
</script>