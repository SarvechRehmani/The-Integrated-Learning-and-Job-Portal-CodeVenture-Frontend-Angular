import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http:HttpClient) { }

  public addJob(job:any){
    return this.http.post(`${baseUrl}/job/`,job);
  }

  public getAllJobs(){
    return this.http.get(`${baseUrl}/job/`);
  }

  public getJobsByUser(){
    return this.http.get(`${baseUrl}/job/user`);
  }


  public getSingleJob(id:any){
    return this.http.get(`${baseUrl}/job/${id}`);
  }

  public updateJob(job:any){
    return this.http.put(`${baseUrl}/job/`,job);
  }

  public deleteJob(jId:any){
    return this.http.delete(`${baseUrl}/job/${jId}`);
  }

  public getSingleJobUser(id:any){
    return this.http.get(`${baseUrl}/job/user/${id}`);
  }
}
