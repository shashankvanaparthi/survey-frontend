    <template>
    <v-container>
        <v-row v-if="questions.length==0">
            <h4>No Questions are present in thsi Survey, Please wait till the Creator add's Some questions</h4>
        </v-row>
        <v-row v-else>
             <v-form ref="form" v-model="valid" lazy-validation>
            <v-row v-for="(question, index) in questions" :key="question.id">
                <v-col v-if="question.questionType == 'CHOICE'">
                    <span>
                        {{ index + 1 }}.
                        {{ question.question }}
                    </span>
                    <v-radio-group>
                        <v-radio v-for="(option) in question.options" :key="option.id" :label="`${option.value}`"
                            :value="option.id"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col v-if="question.questionType == 'BOOLEAN'">
                    <span>
                        {{ index + 1 }}.
                        {{ question.question }}
                    </span>
                    <v-radio-group>
                        <v-radio v-for="(option) in question.options" :key="option.id"
                            :label="`${option.value == '1' ? 'True' : 'False'}`" :value="option.id"></v-radio>
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
                                <v-slider thumb-label="always" track-color="grey" min="0" max="5" :step="1"></v-slider>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-form>
        </v-row>
    </v-container>
</template>
<script>
import SurveyDataService from '@/services/SurveyDataService';
export default {
    data() {
        return {
            questions: []
        }
    },
    methods: {
        async getAllQuestions(surveyId) {
            const userId = localStorage.userId;
            const questions = await SurveyDataService.getSurveyForId(surveyId, userId);
            return questions.data;
        }
    },
    created() {
        const surveyId = this.$route.params.id;
        this.getAllQuestions(surveyId).then((res) => {
            console.log(res);
            this.questions = res.questions;
        }, (err) => {
            console.log(err);
        });
    },
}
</script>