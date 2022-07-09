import http from "../http-common";

class SurveyDataService{
    saveSurvey(survey,userId){
        console.log("Create Survey is called")
        return http.post("/createSurvey",{
            title:survey.title,
            description:survey.description,
            userId:userId
        })
    }

    getAllSurveys(){
        
    }

    getAllSurveysForUser(userId){
        console.log("In getAllSurveys of user is called")
        return http.get("/survey/user/"+userId)
    }

    deleteSurvey(surveyId){
        console.log("Delete Survey is called");
        return http.delete("/survey/"+surveyId);
    }

    updateSurvey(surveyForm,userId){
        console.log("Update Survey is called");
        console.log(surveyForm)
        return http.put("/survey/"+userId,{survey:surveyForm,userId:userId})
    }
}

export default new SurveyDataService()
