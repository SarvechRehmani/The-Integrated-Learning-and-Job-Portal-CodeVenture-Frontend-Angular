import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseColors } from 'ng2-charts';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private _http:HttpClient
  ) { }

  // ADMIN
  public countUsers(){
    return this._http.get(`${baseUrl}/dashboard/count/users`);
  }

  public getAllUsers(){
    return this._http.get(`${baseUrl}/dashboard/users`);
  }

  // NORMAL USER

  public countTasks(){
    return this._http.get(`${baseUrl}/dashboard/count/tasks`);
  }
// MENTOR USER
  public countCourseDetails(){
    return this._http.get(`${baseUrl}/dashboard/count/courses/details`);
  }

  public countSumittedTasks(){
    return this._http.get(`${baseUrl}/dashboard/count/submitted/tasks`);
  }

  // COMPANY USER
  public countJobsAndJobApplications(){
    return this._http.get(`${baseUrl}/dashboard/count/jobs/jobsApplications`);
  }
}
