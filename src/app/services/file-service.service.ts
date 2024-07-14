import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private http:HttpClient) { }

  public uploadProfile(picture:any){
    return this.http.post(`${baseUrl}/file/upload`,picture)
  }


  public uploadResume(formData:any,jobId:any){
    return this.http.post(`${baseUrl}/file/resume/upload/${jobId}`,formData)
  }
}
