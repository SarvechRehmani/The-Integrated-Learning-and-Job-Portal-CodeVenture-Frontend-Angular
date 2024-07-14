import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  constructor(private http:HttpClient) { }

  public addCourse(course:any){
    return this.http.post(`${baseUrl}/course/`,course);
  }

  public getAllCourse(){
    return this.http.get(`${baseUrl}/course/`);
  }

  public getCoursesByUser(){
    return this.http.get(`${baseUrl}/course/user`);
  }


  public getSingleCourse(id:any){
    return this.http.get(`${baseUrl}/course/${id}`);
  }

  public updateCourse(course:any){
    return this.http.put(`${baseUrl}/course/`,course);
  }

  public deleteCourse(id:any){
    return this.http.delete(`${baseUrl}/course/${id}`);
  }

  public getSingleCourseUser(id:any){
    return this.http.get(`${baseUrl}/course/user/${id}`);
  }

  public getCoursesByField(field:any){
    return this.http.get(`${baseUrl}/course/field/${field}`);
  }
}
