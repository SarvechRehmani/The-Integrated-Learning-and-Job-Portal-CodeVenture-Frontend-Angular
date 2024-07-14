import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-mentor',
  templateUrl: './update-mentor.component.html',
  styleUrls: ['./update-mentor.component.css']
})
export class UpdateMentorComponent implements OnInit {
  constructor(
    private _title:Title,
    private _user: UserService,
    private _snack: MatSnackBar,
    private _rout: ActivatedRoute,
    private _router: Router
  ) { }
  id = this._rout.snapshot.params['id'];
  user: any = {};
  ngOnInit(): void {
    this._user.getUserById(this.id).subscribe(
      (data: any) => {
        this.user.id = data.id;
        this.user.username = data.username;
        this.user.password = data.password;
        this.user.firstName = data.firstName;
        this.user.lastName = data.lastName;
        this.user.email = data.email;
        this.user.phone = data.phone;
        this.user.field = data.field;
        this.user.bio = data.bio;
        this.user.address = data.address;

        this._title.setTitle('Update '+this.user.username+' Mentor | Admin | CodeVenture');
      },
      (error) => {
        this._snack.open('Something went wroung. please try again letter..', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        }
        );
      }
    );
  }


  formSubmit() {
    if(this.user.username == '' || this.user.username == null){
      this._snack.open('Username can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.user.firstName == '' || this.user.firstName == null){
      this._snack.open('First name can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.user.lastName == '' || this.user.lastName == null){
      this._snack.open('Last name can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.user.email == '' || this.user.email == null){
      this._snack.open('Email can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.user.field == '' || this.user.field == null){
      this._snack.open('Please select category for mentor.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    this._user.updateUser(this.user).subscribe(
      (data:any) => {
        // success
        Swal.fire('Updated..','Mentor is Successfully Updated','success').then(
          (e)=>{
            this._router.navigate(['/profile/showmentor']);
        });
      },
      (error) => {
        console.log(error);
        this._snack.open(error.error.message,'OK',{
          duration: 5000,
          verticalPosition:'top',
          horizontalPosition:'end'
        })
      }
    )

  }
}
