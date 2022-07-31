<template>
    <v-container class="mt-2">
        <v-row>
            <table class="table mx-auto">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="report in reports" :key="report.id">
                        <tr>
                            <th scope="row">{{ report.id }}</th>
                            <td>{{ report.name }}</td>
                            <td>{{ report.email }}</td>
                            <td>
                                <button type="button" @click="viewReport(report)" class="btn btn-success">
                                    View
                                </button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </v-row>

        <v-dialog v-model="dialog" persistent max-width="1000px">
            <v-card min-width="1000px">
                <v-card-title class="text-h5"> Report Details </v-card-title>
                <v-card-text>
                    <table class="table mx-auto">
                        <thead>
                            <tr>
                                <th scope="col">SNo</th>
                                <th scope="col">Question</th>
                                <th scope="col">Answer</th>
                                <th scope="col">Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(answer,index) in reportToView.answers" :key="answer.id">
                                <tr>
                                    <th scope="row">{{ index+1 }}</th>
                                    <td>{{ answer.question.question }}</td>
                                    <td>{{ answer.question.questionType==="BOOLEAN"?answer.answer.value==1?"True":"False":answer.answer.value }}</td>
                                    <td>{{getPercentage(answer.questionId,answer.optionId)}}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="dialog = false"> Cancel </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import ReportsDataService from '@/services/ReportsDataService'
export default {
    data() {
        return {
            reports: [],
            reportToView: null,
            allAnswers:[],
            dialog:false
        }
    },
    methods: {
        async getReportDataForSurvey(surveyId) {
            const reports = await ReportsDataService.getReport(surveyId);
            const temp = [];
            for(let i=0;i<reports.data.length;i++){
                Array.prototype.push.apply(temp,reports.data[i].answers)
            }
            this.allAnswers = temp
            return reports.data;
        },
        getPercentage(questionId,optionId){
            const totalUsers = this.reports.length;
            var count = 0;
            for(let i=0;i<this.allAnswers.length;i++){
                if(this.allAnswers[i].questionId==questionId && this.allAnswers[i].optionId==optionId){
                    count++;
                }
            }
            console.log("RTYUITRDFU")
            console.log(count)
            console.log("In getPercentage");
            var percentage = count==0?0:(count*100)/totalUsers;
            return percentage.toFixed(2);
        },
        viewReport(report) {
            this.reportToView = report;
            this.dialog=true;
        }
    },
    created() {
        const surveyId = this.$route.params.id;
        console.log(surveyId)
        this.getReportDataForSurvey(surveyId).then(res => {
            console.log("##########")
            console.log(res);
            this.reports = res
        }, err => {
            console.log(err);
        })
    }
}
</script>