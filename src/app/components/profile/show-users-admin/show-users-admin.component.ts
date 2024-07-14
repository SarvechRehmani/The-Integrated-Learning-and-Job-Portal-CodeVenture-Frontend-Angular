import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-users-admin',
  templateUrl: './show-users-admin.component.html',
  styleUrls: ['./show-users-admin.component.css']
})
export class ShowUsersAdminComponent implements OnInit{
  constructor(
    private _title:Title,
    private userService: UserService,
    private snack: MatSnackBar
  ) { }

  users:any;
  ngOnInit(): void {
    this._title.setTitle('List of Normal Users | Admin | CodeVenture');
    this.userService.getAllNormalUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.snack.open('Error in loading users.','OK',{
          duration:3000,
          verticalPosition:'top'
        });
      }
    );

  }

  deleteUser(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this user",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#ff4081',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          (success) => {
            this.snack.open('User has been deleted..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000
            });
            this.users = this.users.filter((user: any) => user.id != id)
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
