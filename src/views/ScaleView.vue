<template>
    <v-container>
        <v-row>
            <v-col>
                MIN: 0
                <br/>
                MAX: 5
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
        this.answers.push({ value: 0, name: "Zero" })
        this.answers.push({ value: 1, name: "One" })
        this.answers.push({ value: 2, name: "Two" })
        this.answers.push({ value: 3, name: "Three" })
        this.answers.push({ value: 4, name: "Four" })
        this.answers.push({ value: 5, name: "Five" })
    }
}
</script>