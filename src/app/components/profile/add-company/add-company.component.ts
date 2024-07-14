import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent {
  constructor(
    private _title:Title,
    private userService: UserService,
    private snack: MatSnackBar
    ){}
  ngOnInit(): void {
 
    this._title.setTitle('Add Company | Admin | CodeVenture');
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
    checkRole: 'COMPANY'
  }
  formSubmit(){
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('username can not be blank.','OK',{
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
      this.snack.open('Conpany name can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.user.phone == '' || this.user.phone == null){
      this.snack.open('Contact no can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.user.email == '' || this.user.email == null){
      this.snack.open('Email no can not be blank.','OK',{
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
        Swal.fire('Company is Successfully Registered','Company ID is '+data.id,'success').then(
          (e)=>{
            this.user={
              username:'',
              password:'',
              firstName:'',
              lastName:'',
              phone:'',
              email:'',
              address:'',
              field:'',
              bio:'',
              checkRole: 'COMPANY'
            }
          }
        );
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
