import http from "../http-common";

class ReportsDataService{
    saveReport(report){
        console.log("In save Report")
        console.log(report)
        return http.post("/saveReport",report)
    }

    getReport(surveyId){
        console.log("In getReport");
        return http.get("/getReport/"+surveyId)
    }
}

export default new ReportsDataService()
