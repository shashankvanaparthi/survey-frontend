<template>
    <v-container>
        <v-row>
            <v-col>
                <v-toolbar dark color="blue darken-3" class="mb-1">
                    <button type="button" @click="dialog = true" class="btn btn-dark m-2">
                        Add Question
                    </button>
                </v-toolbar>
            </v-col>
        </v-row>
        <v-row>
            <table class="table mx-auto">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Question</th>
                        <th scope="col">Question Type</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="question in questionList" :key="question.id">
                        <tr>
                            <th scope="row">{{ question.id }}</th>
                            <td>{{ question.question }}</td>
                            <td>{{ question.questionType }}</td>
                            <td>
                                <button type="button" @click="deleteQuestion(question.id)" class="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </v-row>

        <v-dialog v-model="dialog" persistent max-width="1000px">
            <v-card min-width="1000px">
                <v-card-title class="text-h5"> Enter Question Details </v-card-title>
                <v-card-text>
                    <v-container fluid>
                        <v-row>
                            <v-col md="{6}">
                                <v-container fluid>
                                    <v-row>
                                        <v-text-field v-model="question.question" name="question" label="Question"
                                            type="text" placeholder="Question" required>
                                        </v-text-field>
                                    </v-row>

                                    <v-row class="d-flex" cols="12" sm="6">
                                        <v-select v-model="selectedQuestionType" :items="questionTypes"
                                            label="Question Type" outlined>
                                        </v-select>
                                    </v-row>

                                </v-container>
                            </v-col>
                            <v-col md="{6}">
                                <v-container fluid>
                                    <v-row>
                                        <h3>Preview</h3>
                                    </v-row>
                                    <v-row>
                                        <p>{{ question.question }}</p>
                                    </v-row>
                                    <v-row v-if="selectedQuestionType == 'CHOICE'">
                                        <!-- Here we need to add the dynamic component -->
                                        <!-- <component :is="preView" >

                                        </component> -->
                                        <choice-view ref="answersRef">
                                        </choice-view>
                                    </v-row>
                                    <v-row v-if="selectedQuestionType == 'BOOLEAN'">
                                        <boolean-view-vue ref="answersRef">
                                        </boolean-view-vue>
                                    </v-row>
                                    <v-row v-if="selectedQuestionType == 'SCALE'">
                                        <scale-view-vue ref="answersRef">
                                        </scale-view-vue>
                                    </v-row>
                                </v-container>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="dialog = false"> Cancel </v-btn>
                    <v-btn color="green darken-1" text @click="addQuestion"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
import QuestionDataService from "../services/QuestionDataService"
import BooleanViewVue from "./BooleanView.vue";
import ChoiceViewVue from './ChoiceView.vue';
import ScaleViewVue from './ScaleView.vue';
import ChoiceView from './ChoiceView.vue';
export default {
    data() {
        return {
            name: "QuestionList",
            questionList: [],
            question: {
                question: "",
                questionType: null,
                options: [],
            },
            questionTypes: ["CHOICE", "BOOLEAN", "SCALE"],
            selectedQuestionType: "",
            dialog: false,
        };
    },
    components: { ChoiceViewVue, ScaleViewVue, BooleanViewVue, ChoiceView },
    methods: {
        async getAllQuestions(userId) {
            const questions = await QuestionDataService.getAllQuestionForUser(userId);
            return questions.data;
        },

        deleteQuestion(quesId) {
            console.log("Delete Question  is clicked ", quesId);
            const userId = localStorage.userId
            QuestionDataService.deleteQuestionForUser(userId, quesId).then(res => {
                this.getAllQuestions(userId).then(
                    (questionsList) => {
                        this.questionList = questionsList;
                        console.log(this.questionList);
                    },
                    (error) => {
                        console.log(error);
                        alert("Something went wrong")
                    }
                );
            }, error => {
                console.log(error)
                alert("Track Deletion Failed")

            })
        },

        addQuestion() {
            console.log("Adding Question");
            const { question } = this;
            const userId = localStorage.userId;
            this.question.questionType = this.selectedQuestionType
            this.question.options = this.$refs.answersRef.answers
            console.log(question)
            QuestionDataService.saveQuestionForUser(userId, question).then(
                (res) => {
                    console.log(res)
                    this.question.question = "";
                    this.question.questionType = null;
                    this.question.options = [];
                    this.getAllQuestions(userId).then(
                        (questionsList) => {
                            this.dialog = false;
                            this.questionList = questionsList;
                            console.log(this.questionList);
                        },
                        (error) => {
                            console.log(error);
                            alert("Something went wrong")
                        }
                    );
                },
                (error) => {
                    console.log(error);
                    alert("Something went wrong")
                }
            )
        },

        viewTrack(trackLink) {
            console.log("View Track is called");
            if (trackLink) {
                console.log("Opening")
                window.open(trackLink, '_newtab')
            }
        },

        openEditTrackDialog(track) {
            this.editTrack.name = track.name;
            this.editTrack.id = track.id;
            this.editTrack.duration = track.duration;
            this.editTrack.link = track.link;
            this.editDialog = true
        },

        updateTrack() {
            console.log("Update Track is called ", this.editTrack)
            const userId = localStorage.userId
            TrackDataService.updateTrack(userId, this.editTrack).then(res => {
                console.log(res);
                this.getAllTracks(userId).then(
                    (res) => {
                        this.trackList = res;
                        console.log(res);
                        this.editDialog = false;
                    },
                    (err) => {
                        console.log(err);
                        alert("Something went wrong")
                    }
                );
            }, error => {
                console.log(error);
                alert("Something went wrong")
            })
        }
    },

    created() {
        const userId = localStorage.userId;
        this.getAllQuestions(userId).then(
            (res) => {
                this.questionList = res;
                console.log(res);
            },
            (err) => {
                console.log(err);
            }
        );
    },

    computed: {
        preView() {
            console.log("In Preview Method")
            if (this.selectedQuestionType == 'CHOICE') {
                return ChoiceViewVue
            }

            if (this.selectedQuestionType == 'BOOLEAN') {
                return BooleanViewVue
            }

            if (this.selectedQuestionType == 'SCALE') {
                return ScaleViewVue
            }
        }
    }

};
</script>