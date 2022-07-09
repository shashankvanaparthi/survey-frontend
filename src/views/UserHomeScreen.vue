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
            <v-btn color="deep-purple lighten-2" text @click="viewSurvey(survey.id)">
              View
            </v-btn>

            <v-btn color="deep-purple lighten-2" text @click="editSurvey(survey)">
              Edit
            </v-btn>

            <v-btn color="danger lighten-2" text @click="deleteSurvey(survey.id)">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card min-width="600px">
        <v-card-title class="text-h5"> Edit Survey Details </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-text-field v-model="updateSurveyForm.title" name="title" label="Title" type="text" placeholder="Survey Title"
                required></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="updateSurveyForm.description" name="description" label="Description" type="text"
                placeholder="Description" required></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="updateSurvey">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
    
<script>
import SurveyDataService from '@/services/SurveyDataService';
export default {
  name: "SurveyList",
  data() {
    return {
      surveys: [],
      dialog: false,
      searchKey: "",
      selectedSurveyToEdit: null,
      survey: {
        title: "",
        description: "",
      },
      updateSurveyForm: {
        id: null,
        title: "",
        description: ""
      },
    };
  },
  methods: {
    async getAllSurveys(userId) {
      console.log("hello");
      const surveys = await SurveyDataService.getAllSurveysForUser(userId);
      return surveys.data;
    },

    viewSurvey(surveyId) {
      this.$router.push({ name: "survey", params: { id: surveyId } });
      console.log("Survey view more is clicked");
    },

    deleteSurvey(surveyId) {
      console.log("Delete Survey is clicked ", surveyId);
      SurveyDataService.deleteSurvey(surveyId).then(
        (res) => {
          console.log(res);
          const userId = localStorage.userId;
          this.getAllSurveys(userId).then(
            (surveyList) => {
              this.surveys = surveyList;
              console.log(this.surveys);
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
          alert("Something went wrong while deleting survey");
        }
      );
    },

    editSurvey(survey) {
      this.selectedSurveyToEdit = survey;
      this.updateSurveyForm.id = this.selectedSurveyToEdit.id;
      this.updateSurveyForm.title = this.selectedSurveyToEdit.title;
      this.updateSurveyForm.description = this.selectedSurveyToEdit.description;
      this.dialog = true;
    },

    updateSurvey() {
      console.log("Upadate Survey is clicked");
      const userId = localStorage.userId;
      SurveyDataService.updateSurvey(this.updateSurveyForm, userId).then(
        (response) => {
          console.log(response);
          console.log(userId);
          this.getAllSurveys(userId).then(
            (surveyList) => {
              this.surveys = surveyList;
              console.log(this.surveys);
              this.dialog = false;
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
          alert("Something went wrong while deleting survey")
        }
      );
    },

  },

  created() {
    const userId = localStorage.userId;
    this.getAllSurveys(userId).then(
      (surveyList) => {
        this.surveys = surveyList;
        console.log(this.surveys);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>