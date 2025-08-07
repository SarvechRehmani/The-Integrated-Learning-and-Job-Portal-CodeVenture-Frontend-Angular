import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-company-admin',
  templateUrl: './show-company-admin.component.html',
  styleUrls: ['./show-company-admin.component.css']
})
export class ShowCompanyAdminComponent implements OnInit{

  companies:any;
  constructor(
    private _title:Title,
    private userService: UserService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._title.setTitle('List of Companies | Admin | CodeVenture');
    this.userService.getCompanies().subscribe(
      (data: any) => {
        this.companies = data;
        console.log(data);
      },
      (error: any) => {
        Swal.fire('Error', error, 'error');
      }
    );
  }

  deleteCompany(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this company",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#ff4081',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          (success) => {
            this.snack.open('Company has been deleted..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000
            });
            this.companies = this.companies.filter((company: any) => company.id != id)
          },
          (error) => {
            this.snack.open('Something went wroung..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000
            });
          }
        );
      }
    })
  }

}
