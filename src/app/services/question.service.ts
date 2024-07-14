import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private _http:HttpClient) { }

  addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/`,question);
  }

  deleteQuestion(id:any){
    return this._http.delete(`${baseUrl}/question/${id}`);
  }

  getSingleQuestion(id:any){
    return this._http.get(`${baseUrl}/question/${id}`);
  }

  getAllQuestions(){
    return this._http.get(`${baseUrl}/question/`);
  }

  getQuestionsByQuizOfUser(qId:any){
    return this._http.get(`${baseUrl}/question/quiz/user/${qId}`);
  }

  getSingleQuestionUser(id:any){
    return this._http.get(`${baseUrl}/question/user/${id}`);
  }

  getQuestionByQuiz(qId:any){
    return this._http.get(`${baseUrl}/question/quiz/${qId}`);
  }

  getQuestionByQuizWithAnswers(qId:any){
    return this._http.get(`${baseUrl}/question/quiz/answers/${qId}`);
  }


  countQuestionOfQuiz(qId:any){
    return this._http.get(`${baseUrl}/question/count/${qId}`);
  }
}

