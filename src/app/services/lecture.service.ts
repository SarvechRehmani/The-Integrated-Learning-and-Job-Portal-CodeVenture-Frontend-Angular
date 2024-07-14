import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient) { }

  addLecture(lecture: any) {
    return this.http.post(`${baseUrl}/lecture/`, lecture);
  }

  updateLecture(lecture: any) {
    return this.http.put(`${baseUrl}/lecture/`, lecture);
  }

  deleteLecture(id: any) {
    console.log('id is' + id)
    return this.http.delete(`${baseUrl}/lecture/${id}`);
  }

  getSingleLecture(id: any) {
    return this.http.get(`${baseUrl}/lecture/${id}`);
  }

  getLectureByCourse(id: any) {
    return this.http.get(`${baseUrl}/lecture/course/${id}`);
  }

  getLectureByCourseWithoutAssignment(id: any) {
    return this.http.get(`${baseUrl}/lecture/course/without/assignment/${id}`);
  }

  getLectureByCourseWithoutLabTask(id: any) {
    return this.http.get(`${baseUrl}/lecture/course/without/labtask/${id}`);
  }
  
  getLectureByCourseWithoutQuiz(id: any) {
    return this.http.get(`${baseUrl}/lecture/course/without/quiz/${id}`);
  }

  getAllLecturesByUser() {
    return this.http.get(`${baseUrl}/lecture/user`);
  }

  getAllLecturesByUserOfUser(cId:AnimationPlayState) {
    return this.http.get(`${baseUrl}/lecture/course/user/${cId}`);
  }

  getAllLectures() {
    return this.http.get(`${baseUrl}/lecture/`);
  }

  getSingleLectureUser(id: any) {
    return this.http.get(`${baseUrl}/lecture/user/${id}`);
  }

  getSingleLectureByCourseAndLNo(cId: any,lNo:any) {
    return this.http.get(`${baseUrl}/lecture/user/lectureNo/${cId}/${lNo}`);
  }

  countLectureOfCourse(cId: any) {
    return this.http.get(`${baseUrl}/lecture/count/lecture/course/${cId}`);
  }

  getLecturesByField(field: any) {
    return this.http.get(`${baseUrl}/lecture/field/${field}`);
  }
}
