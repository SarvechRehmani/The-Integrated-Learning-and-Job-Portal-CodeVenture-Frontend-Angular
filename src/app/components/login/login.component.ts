import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private snack: MatSnackBar,
    private _title: Title,
    private login: LoginService,
    private router: Router) {

  }

  ngOnInit(): void {
    this._title.setTitle('Login | CodeVenture');

    if (this.login.isloggedIn()) {
      this.redirecting(this.login.userRole());
    }
  }

  redirecting(role: any) {
    if (role == "ADMIN") {
      this.router.navigate(['/profile/']);
      this.login.loginStatusSubject.next(true);
    } else if (role == "MENTOR") {
      this.router.navigate(['/mentor/']);
      this.login.loginStatusSubject.next(true);

    } else if (role == "NORMAL") {
      this.router.navigate(['/user/']);
      this.login.loginStatusSubject.next(true);

    } else if (role == "COMPANY") {
      this.router.navigate(['/company/']);
      this.login.loginStatusSubject.next(true);
    }
  }

  loginData = {
    username: '',
    password: '',
  };

  clicked = false;
  formSubmit() {
    this.clicked = true;
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('Username required.', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.clicked = false;
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('password required.', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.clicked = false;
      return;
    }
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            this.redirecting(this.login.userRole());
          },
          (error: any) => {
            console.log(error);
            this.clicked = false;
            this.snack.open("Invalid Details!! please try Again..", 'OK', {
              duration: 3000,
              verticalPosition: 'top'
            });
          }
        );
      },
      (error: any) => {
        console.log(error);
        this.clicked = false;
        this.snack.open("Invalid Details..!! please try Again..", 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        })
      }
    )
  }
}
