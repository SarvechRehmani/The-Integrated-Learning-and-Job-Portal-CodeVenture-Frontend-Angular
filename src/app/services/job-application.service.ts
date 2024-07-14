import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  constructor(
    private http:HttpClient
  ) { }

  public updateJobApplication(jobApplication:any){
    return this.http.put(`${baseUrl}/job-application/`,jobApplication);
  }

  public deleteJobApplication(jobAId:any){
    return this.http.delete(`${baseUrl}/job-application/${jobAId}`);
  }


  public getSingleJobApplication(jobAId:any){
    return this.http.get(`${baseUrl}/job-application/${jobAId}`);
  }

  public getJobApplicationByUser(userId:any){
    return this.http.get(`${baseUrl}/job-application/user/${userId}`);
  }

  public getJobApplicationByJob(jobId:any){
    return this.http.get(`${baseUrl}/job-application/job/${jobId}`);
  }

  public getJobApplicationByJobAndUser(jobId:any,userId:any){
    return this.http.get(`${baseUrl}/job-application/job/user/${jobId}/${userId}`);
  }

  public getJobsApplicationsByJobIdOfUserJob(jobId:any){
    return this.http.get(`${baseUrl}/job-application/application/user/job/${jobId}`);
  }
  
  public getJobsApplicationsByUser(){
    return this.http.get(`${baseUrl}/job-application/application/user`);
  }
}
