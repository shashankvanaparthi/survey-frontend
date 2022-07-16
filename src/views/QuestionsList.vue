<template>
    <v-container>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-row>
                    <v-col class="text-right">
                        <v-btn color="success" dark @click="dialog = true" v-bind="attrs" v-on="on">Add Question</v-btn>
                    </v-col>
                </v-row>
            </template>
            <v-card min-width="600px">
                <v-card-title class="text-h5"> Questions Available </v-card-title>
                <table class="table mx-auto">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Question</th>
                            <th scope="col">QuestionType</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="userQuestion in allUserQuestions" :key="userQuestion.id">
                            <tr>
                                <th scope="row">{{ userQuestion.id }}</th>
                                <td>{{ userQuestion.question }}</td>
                                <td>{{ userQuestion.questionType }}</td>
                                <td>
                                    <button type="button" @click="addQuestionToSurvey(userQuestion)"
                                        class="btn btn-primary">
                                        Add
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-row v-if="questionsList.length == 0">
            <h1>No Questions to display.</h1>
        </v-row>

         <v-row class="mt-4" v-else>
            <table class="table mx-auto">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Question</th>
                        <th scope="col">Question Type</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="question in questionsList" :key="question.id">
                        <tr>
                            <th scope="row">{{ question.id }}</th>
                            <td>{{ question.question }}</td>
                            <td>{{ question.questionType }}</td>
                            <td>
                                <button type="button" @click="deleteQuestion(question)" class="btn btn-danger">
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
import SurveyDataService from '@/services/SurveyDataService';
import QuestionDataService from '@/services/QuestionDataService';
import Questions from './Questions.vue';
export default {
    data() {
        return {
            name: "QuestionsList",
            questionsList: [],
            allUserQuestions: [],
            temp: "",
            question: {
                question: "",
                questionType: null,
                options: []
            },
            dialog: false,
        };
    },
    methods: {
        async getAllQuestions(surveyId) {
            const userId = localStorage.userId;
            const questions = await SurveyDataService.getSurveyForId(surveyId, userId);
            const userQuestions = await QuestionDataService.getAllQuestionForUser(userId);
            console.log(userQuestions);
            this.allUserQuestions = userQuestions.data;
            return questions.data;
        },
        addQuestionToSurvey(question) {
            const surveyId = this.$route.params.id;
            console.log(question);
            console.log("addQuestionTOSurvey is called ", surveyId, question.id);
            QuestionDataService.addQuestionToSurvey(surveyId, question.id).then(res => {
                console.log(res);
                this.getAllQuestions(surveyId).then((res) => {
                    this.questionsList = res.questions;
                    this.dialog = false;
                    console.log(res);
                }, (err) => {
                    console.log(err);
                });
            }, error => {
                console.log(error);
            });
        },
        deleteQuestion(question) {
            console.log("Delete Question is clicked ");
            const surveyId = this.$route.params.id;
            const questId = question.id;
            QuestionDataService.deleteQuestionFromSurvey(surveyId, questId).then(res => {
                console.log(res);
                this.getAllQuestions(surveyId).then((res) => {
                    this.questionsList = res.questions;
                    this.dialog = false;
                    console.log(res);
                }, (err) => {
                    console.log(err);
                });
            }, error => {
                console.log(error);
            });
        }
    },
    created() {
        const surveyId = this.$route.params.id;
        this.getAllQuestions(surveyId).then((res) => {
            console.log(res);
            this.questionsList = res.questions;
        }, (err) => {
            console.log(err);
        });
    },
    components: { Questions }
};
</script>
