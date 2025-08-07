import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private _title: Title,
    private userService: UserService,
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._title.setTitle('Register | CodeVenture');
    if (this.login.isloggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  public user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    field: '',
    checkRole: 'NORMAL',
  };

  formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('Something went wrong.', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }
    // addUser : userService
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        // success
        console.log(data);
        Swal.fire(
          'Successfully Registered',
          'User ID is ' + data.id,
          'success'
        );
        // alert("success");
      },
      (error) => {
        console.log(error);

        this.snack.open(error.error.message + '.', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
        // alert("Something went wrong..");
      }
    );
  }
}
