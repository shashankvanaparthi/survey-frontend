    <template >
    <div class="background">
        <v-container fluid class="p-5">
            <v-card class="mx-auto" width="600">
                <v-card-title>
                    {{ surveyNotFound ? surveyNotFoundMessage : (questions.length == 0 &&
                            !surveyNotFound) ? noquestions : surveyTitle
                    }}
                </v-card-title>
                <v-card-subtitle>
                    {{ surveyDescription }}
                </v-card-subtitle>

                <v-card-text v-if="questions.length != 0 && !surveyNotFound">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-col>
                            <v-text-field v-model="first" label="Name" variant="outlined" shaped></v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field v-model="first" label="Email" variant="outlined" shaped></v-text-field>
                        </v-col>

                        <v-row v-for="(question, index) in questions" :key="question.id">
                            <v-col v-if="question.questionType == 'CHOICE'">
                                <span>
                                    {{ index + 1 }}.
                                    {{ question.question }}
                                </span>
                                <v-radio-group>
                                    <v-radio v-for="(option) in question.options" :key="option.id"
                                        :label="`${option.value}`" :value="option.id"></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col v-if="question.questionType == 'BOOLEAN'">
                                <span>
                                    {{ index + 1 }}.
                                    {{ question.question }}
                                </span>
                                <v-radio-group>
                                    <v-radio v-for="(option) in question.options" :key="option.id"
                                        :label="`${option.value == '1' ? 'True' : 'False'}`" :value="option.id">
                                    </v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col v-if="question.questionType == 'SCALE'">
                                <span>
                                    {{ index + 1 }}.
                                    {{ question.question }}
                                </span>
                                <div class="container mt-3">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <v-slider thumb-label="always" track-color="grey" min="0" max="5" :step="1">
                                            </v-slider>
                                        </div>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-card-actions v-if="questions.length != 0 && !surveyNotFound">
                    <v-btn color="primary">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import SurveyDataService from '@/services/SurveyDataService';
export default {
    data() {
        return {
            questions: [],
            surveyNotFound: false,
            surveyDescription: "",
            surveyTitle: "",
            noquestions: "No Questions are present in this Survey, Please wait till the Creator add's Some questions",
            surveyNotFoundMessage: "Sorry, Please check the survey link and try again!.."
        }
    },
    methods: {
        async getAllQuestions(surveyId) {
            const userId = localStorage.userId;
            const questions = await SurveyDataService.getSurveyForId(surveyId, userId);
            console.log("$$$$")
            console.log(questions);
            return questions.data;
        }
    },
    created() {
        const surveyId = this.$route.params.id;
        this.getAllQuestions(surveyId).then((res) => {
            console.log(res);
            this.surveyTitle = res.title;
            this.surveyDescription = res.description
            this.questions = res.questions;
        }, (err) => {
            this.surveyNotFound = true;
            console.log(err);
        });
    },
}
</script>


<style>
.background {
  width: 100vw;
  min-height:100vh;
  background-color: #808080;
}
</style>