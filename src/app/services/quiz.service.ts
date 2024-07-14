import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  addQuiz(quiz:any){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  updateQuiz(quiz:any){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  deleteQuiz(id:any){
    return this.http.delete(`${baseUrl}/quiz/${id}`);
  }

  getSingleQuiz(id:any){
    return this.http.get(`${baseUrl}/quiz/${id}`);
  }

  getAllQuiz(){
    return this.http.get(`${baseUrl}/quiz/`);
  }
  

  getQuizByLecture(lId:any){
    return this.http.get(`${baseUrl}/quiz/lecture/${lId}`);
  }

  getQuizzesByUserCourse(){
    return this.http.get(`${baseUrl}/quiz/user`);
  }
  getQuizzesByField(field: any) {
    return this.http.get(`${baseUrl}/quiz/field/${field}`);
  }
  
}
