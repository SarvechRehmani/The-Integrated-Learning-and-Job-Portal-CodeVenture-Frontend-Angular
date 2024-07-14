import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  // Add User
  public addUser(user:any){
    return this.http.post(`${baseUrl}/user/`,user)
  }

  public getUserById(id:any){
    return this.http.get(`${baseUrl}/user/byId/${id}`);
  }

  public updateUser(user:any){
    return this.http.put(`${baseUrl}/user/`,user);
  }

  // Delete User By Id
  public deleteUser(id:any) {
    return this.http.delete(`${baseUrl}/user/${id}`);
  }

  // Get All Mentors : User
  public getMentors(){
    return this.http.get(`${baseUrl}/user/mentors`);
  }

    // Get All Companies : User
    public getCompanies(){
      return this.http.get(`${baseUrl}/user/companies`);
    }

    
    // Get All Normal Users : User
    public getAllNormalUsers(){
      return this.http.get(`${baseUrl}/user/users`);
    }

    // Change Password
    public updatePassword(changePassword:any){
      return this.http.put(`${baseUrl}/user/update/password`,changePassword);
    }
}
