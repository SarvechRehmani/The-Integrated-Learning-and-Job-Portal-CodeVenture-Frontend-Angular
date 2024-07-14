import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addmentor',
  templateUrl: './addmentor.component.html',
  styleUrls: ['./addmentor.component.css']
})
export class AddmentorComponent implements OnInit {
  constructor(
    private _title:Title,
    private userService: UserService,
    private snack: MatSnackBar
    ){}
  ngOnInit(): void {
    this._title.setTitle('Add Mentor | Admin | CodeVenture');
  }
  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    phone:'',
    email:'',
    address:'',
    field:'',
    bio:'',
    checkRole: 'MENTOR'
  }
  formSubmit(){

    if(this.user.username == '' || this.user.username == null){
      this.snack.open('Username can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.user.password == '' || this.user.password == null){
      this.snack.open('Password can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.user.firstName == '' || this.user.firstName == null){
      this.snack.open('First name can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.user.lastName == '' || this.user.lastName == null){
      this.snack.open('Last name can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.user.email == '' || this.user.email == null){
      this.snack.open('Email can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.user.field == '' || this.user.field == null){
      this.snack.open('Please select category for mentor.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    // addUser : userService
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        // success
        console.log(data);
        Swal.fire('Mentor is Successfully Registered','Mentor ID is '+data.id,'success');
        // alert("success");
      },
      (error) => {
        console.log(error);
        this.snack.open('Something went wrong.'+error,'OK',{
          duration: 3000,
          verticalPosition:'top'
        })
        // alert("Something went wrong..");
      }
    )
  }
}
