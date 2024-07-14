import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _title:Title,
    private userService: UserService,
    private snack: MatSnackBar
    ){}
  ngOnInit(): void {
    this._title.setTitle('Register | CodeVenture');
  }


  public user={
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    username:'',
    password:'',
    field:'',
    checkRole:'NORMAL'
  }
  // formSubmit(){
  //   console.log(this.user);
  //   if(this.user.username==''||this.user.username==null){
  //     alert('user required');
  //     return;
  //   }
  

    // this.userService.addUser(this.user).subscribe(
    //   {
    //     error:HttpErrorResponse=>
        
    //       alert('wrong')
    //     ,
    //     next:data=>console.log(data),
       
    //   }
    // )
    //   }
   /* formSubmit(){

      if(this.user.username == '' || this.user.username == null){
        this.snack.open('Something went wrong.','OK',{
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
          this.snack.open('Successfully Registered','User ID is ',{
            duration: 3000,
            verticalPosition:'top'
          })
          // alert("success");
        },
        (error) => {
          console.log(error);
          this.snack.open('Something went wrong.','OK',{
            duration: 3000,
            verticalPosition:'top'
          })
          // alert("Something went wrong..");
        }
      )
    }*/
    formSubmit(){

      if(this.user.username == '' || this.user.username == null){
        this.snack.open('Something went wrong.','OK',{
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
          Swal.fire('Successfully Registered','User ID is '+data.id,'success');
          // alert("success");
        },
        (error) => {
          console.log(error);

          this.snack.open(error.error.message+'.','OK',{
            duration: 3000,
            verticalPosition:'top'
          })
          // alert("Something went wrong..");
        }
      )
    }
}
