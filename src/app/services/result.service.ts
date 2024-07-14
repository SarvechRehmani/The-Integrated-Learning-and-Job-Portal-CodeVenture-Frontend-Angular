import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private _http: HttpClient) { }


  // ------------QUIZ-OPERATIONS--------------
  // Get Quiz Result of User
  getQuizResult(qId: any) {
    return this._http.get(`${baseUrl}/result/quiz/${qId}`);
  }

  // Save Quiz Result of User
  resultQuiz(questions: any) {
    return this._http.post(`${baseUrl}/result/quiz`, questions)
  }


  // ------------ASSIGNMENT-OPERATIONS--------------
  // Submit Assignment of User
  submitAssignment(assignment: any) {
    return this._http.post(`${baseUrl}/result/assignment`, assignment)
  }

  // Submit Assignment marks to the User
  submitMarksAssignment(assignmentResult: any) {
    return this._http.put(`${baseUrl}/result/assignment/marks`, assignmentResult)
  }

  getAssignmentResult(aId: any) {
    return this._http.get(`${baseUrl}/result/assignment/${aId}`);
  }

  getAssignmentResultByAIdAnsUId(aId: any,uId:any) {
    return this._http.get(`${baseUrl}/result/assignment/${aId}/${uId}`);
  }

  // get All Assignment Result by aId
  getAssignmentResultByAId(aId: any) {
    return this._http.get(`${baseUrl}/result/assignments/${aId}`);
  }

  // ---------------LABTASK-OPERATIONS--------------
  // Submit LabTask of User
  submitLabTask(labTask: any) {
    return this._http.post(`${baseUrl}/result/labtask`, labTask)
  }

  // Submit LabTask marks to the User
  submitMarksLabTask(labTaskResult: any) {
    return this._http.put(`${baseUrl}/result/labtask/marks`, labTaskResult)
  }

  // get LabTaskResult by LabTaskId
  getLabTaskResult(lId: any) {
    return this._http.get(`${baseUrl}/result/labtask/${lId}`);
  }

  getLabTaskResultByLIdAnsUId(lId: any,uId:any) {
    return this._http.get(`${baseUrl}/result/labtask/${lId}/${uId}`);
  }

  // get All Assignment Result by aId
  getLabTaskResultBylId(lId: any) {
    return this._http.get(`${baseUrl}/result/labtasks/${lId}`);
  }
}
