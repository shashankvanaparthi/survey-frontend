import http from "../http-common";

class QuestionDataService{
    getAllQuestionForUser(userId){
        console.log(userId);
        return http.get("/questions/user/"+userId);
    }

    saveQuestionForUser(userId,question){
        console.log("In SaveQuestionForUser is called")
        return http.post("/addQuestion/"+userId,question)
    }

    addQuestionToSurvey(surveyId,questId){
        console.log("In addQuestionToSurvey is called");
        return http.post("/survey/addQuestion",{surveyId:surveyId,questId:questId})
    }

    deleteQuestionFromSurvey(surveyId,questId){
        console.log("In deleteQuestionFromSurvey is called")
        return http.delete("/survey/question/deleteQuestion",{params:{surveyId:surveyId,questId:questId}})
    }

    deleteQuestionForUser(userId,quesId){
        console.log(userId);
        console.log(quesId);
        return http.delete("/deleteQuestion/"+userId,{data:{quesId:quesId}})
    }

}

export default new QuestionDataService()
