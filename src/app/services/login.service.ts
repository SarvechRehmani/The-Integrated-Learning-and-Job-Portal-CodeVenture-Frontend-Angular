import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public loginStatusSubject = new Subject<boolean>();

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);

  }

  public loginUser(token: any){
    localStorage.setItem('token',token );
    return true;
  }

  public isloggedIn(){
    let tokenstr=localStorage.getItem('token');
    if(tokenstr==undefined||tokenstr==null||tokenstr==''){
      return false;

    }else{
      return true;
    }

  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user: any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser(){
    let userStr=localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }
  public userRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }
}
