<template>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <button type="button" @click="dialog = true" class="btn btn-dark m-2">
            Add Survey
          </button>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <table class="table m-4">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="survey in surveys" :key="survey.id">
            <tr>
              <th scope="row">{{ survey.id }}</th>
              <td>{{ survey.title }}</td>
              <td>{{ survey.description }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card min-width="600px">
        <v-card-title class="text-h5"> Enter Survey Details </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-text-field v-model="survey.title" name="title" label="Tiltle" type="text" placeholder="Survey Title"
                required></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="survey.description" name="description" label="Description" type="text"
                placeholder="Description" required></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog=false"> Cancel </v-btn>
          <v-btn color="green darken-1" text @click="addSurvey"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import SurveyDataService from '@/services/SurveyDataService';
export default {
  name: "Survey",
  data() {
    return {
      surveys: [],
      dialog: false,
      survey: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    async getAllSurveys(userId) {
      console.log("hello");
      const surveys = await SurveyDataService.getAllSurveysForUser(userId);
      return surveys.data;
    },

    addSurvey() {
      console.log("Adding Survey");
      const { survey } = this;
      const userId = localStorage.userId;
      SurveyDataService.saveSurvey(survey, userId).then(res => {
        console.log("The response is")
        console.log(res);
        this.survey.title=""
        this.survey.description=""
        this.getAllSurveys(userId).then(
          (surveyList) => {
            this.surveys = surveyList;
            console.log(this.surveys);
            this.dialog=false;
          },
          (error) => {
            console.log(error);
            this.dialog=false;
          }
        );
      }, error => {
        alert("Something went wrong while Saving")
        console.log("Error occured");
        console.log(error)
        this.dialog=false;
      });
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