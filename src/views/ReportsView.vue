<template>
    <v-container>
        <v-row v-if="surveys.length == 0">
            <h1>No Surveys to display.</h1>
        </v-row>
        <v-row v-if="surveys.length != 0">
            <template v-for="survey in surveys" :key="survey.id">
                <v-card class="my-4" min-width="374">
                    <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                    <div class="container">
                        <div class="row">
                            <div class="col-md-8">

                                <v-card-title>{{ survey.title }}</v-card-title>

                                <v-card-text>
                                    <v-row align="center" class="mx-0">
                                        <div>
                                            {{ survey.description }}
                                        </div>
                                    </v-row>
                                </v-card-text>
                            </div>
                        </div>
                    </div>

                    <v-card-actions>
                        <v-btn color="deep-purple lighten-2" text @click="viewReport(survey.id)">
                            View Report
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-row>
    </v-container>
</template>

<script>
import SurveyDataService from '@/services/SurveyDataService'
export default {
    data() {
        return {
            surveys: []
        }
    },
    methods: {
        async getAllSurveys() {
            const userId = localStorage.userId
            const surveys = await SurveyDataService.getAllSurveysForReports(userId)
            return surveys.data
        },
        viewReport(surveyId){
            console.log("View Survey is clicked for surveyId:"+surveyId)
            this.$router.push("/reports/"+surveyId)
        }
    },
    created() {
        this.getAllSurveys().then(res => {
            console.log(res)
            this.surveys = res;
        }, err => {
            console.log(err)
        })
    }
}
</script>