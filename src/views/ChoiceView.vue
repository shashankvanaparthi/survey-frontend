<template>
    <v-container>
        <div class="form-group" v-for="(input, k) in answers" :key="k">
            <input type="text" :placeholder="'Option'+(k+1)" class="form-control" v-model="input.value">
        </div>
        <v-row>
            <v-btn class="p-2 m-2" @click="addOption">Add Option</v-btn>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props: {
        optionsList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            answers: []
        }
    },
    methods: {
        addOption() {
            console.log("Add option button is clicked")
            this.answers.push({ value: "" })
        }
    },
    created() {
        console.log(this.optionsList)
        console.log(this.$parent.$props)
    }
}
</script>