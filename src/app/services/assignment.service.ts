import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
    constructor(
    private http:HttpClient,

  ) { }

  addAssignment(assignment:any){
    return this.http.post(`${baseUrl}/assignment/`,assignment);
  }

  updateAssignment(assignment:any){
    return this.http.put(`${baseUrl}/assignment/`,assignment);
  }

  getSingleAssignment(id:any){
    return this.http.get(`${baseUrl}/assignment/${id}`);
  }

  getAssignmentByLecture(id:any){
    return this.http.get(`${baseUrl}/assignment/lecture/${id}`);
  }

  getAssignmentByUserCourse(){
    return this.http.get(`${baseUrl}/assignment/user`);
  }

  getAllAssignment(){
    return this.http.get(`${baseUrl}/assignment/`);
  }

  deleteAssignment(id:any){
    return this.http.delete(`${baseUrl}/assignment/${id}`);
  }

  getAssignmentByField(field:any){
    return this.http.get(`${baseUrl}/assignment/field/${field}`);
  }
}
