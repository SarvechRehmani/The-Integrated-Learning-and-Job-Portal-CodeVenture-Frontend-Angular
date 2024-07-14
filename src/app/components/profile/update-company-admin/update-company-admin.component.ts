import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-company-admin',
  templateUrl: './update-company-admin.component.html',
  styleUrls: ['./update-company-admin.component.css']
})
export class UpdateCompanyAdminComponent implements OnInit{

  constructor(
    private _title:Title,
    private _user: UserService,
    private _snack: MatSnackBar,
    private _rout: ActivatedRoute,
    private _router: Router
  ) { }
  id = this._rout.snapshot.params['id'];

  company:any = {};
  ngOnInit(): void {
    this._user.getUserById(this.id).subscribe(
      (data: any) => {
        this.company.id = data.id;
        this.company.username = data.username;
        this.company.password = data.password;
        this.company.firstName = data.firstName;
        this.company.email = data.email;
        this.company.phone = data.phone;
        this.company.bio = data.bio;
        this.company.address = data.address;

        this._title.setTitle('Update '+this.company.username+' Company | Admin | CodeVenture');
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
  formSubmit(){
    if(this.company.username == '' || this.company.username == null){
      this._snack.open('username can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.company.firstName == '' || this.company.firstName == null){
      this.company.open('Conpany name can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.company.phone == '' || this.company.phone == null){
      this._snack.open('Contact no can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.company.email == '' || this.company.email == null){
      this._snack.open('Email no can not be blank.','OK',{
        duration: 3000,
        verticalPosition:'top'
      })
      return;
    }
    this._user.updateUser(this.company).subscribe(
      (data:any) => {
        // success
        Swal.fire('Updated..','Company is Successfully Updated','success').then(
          (e)=>{
            this._router.navigate(['/profile/showcompanies']);
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
