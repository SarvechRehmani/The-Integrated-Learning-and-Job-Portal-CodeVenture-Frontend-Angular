import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabTaskService {

  constructor(private _http:HttpClient) { }

  addLabTask(labTask:any){
    return this._http.post(`${baseUrl}/labtask/`,labTask);
  }

  updateLabTask(labTask:any){
    return this._http.put(`${baseUrl}/labtask/`,labTask);
  }

  deleteLabTask(id:any){
    return this._http.delete(`${baseUrl}/labtask/${id}`);
  }

  getSingleLabTask(id:any){
    return this._http.get(`${baseUrl}/labtask/${id}`);
  }

  getAllLabTask(){
    return this._http.get(`${baseUrl}/labtask/`);
  }

  getLabTaskByLecture(lId:any){
    return this._http.get(`${baseUrl}/labtask/lecture/${lId}`);
  }

  getLabTaskByUserCourses(){
    return this._http.get(`${baseUrl}/labtask/user`);
  }

  getSingleLabTaskUser(id:any){
    return this._http.get(`${baseUrl}/labtask/user/${id}`);
  }
  getLabTasksByField(field:any){
    return this._http.get(`${baseUrl}/labtask/field/${field}`);
  }
}
