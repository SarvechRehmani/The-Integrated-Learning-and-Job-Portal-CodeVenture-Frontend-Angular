import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-showmentor',
  templateUrl: './showmentor.component.html',
  styleUrls: ['./showmentor.component.css']
})
export class ShowmentorComponent implements OnInit {
 
  constructor(
    private _title:Title,
    private userService: UserService,
    private snack: MatSnackBar
  ) { }
  mentors: any;
  ngOnInit(): void {
    this._title.setTitle('List of Mentors | Admin | CodeVenture');
    this.userService.getMentors().subscribe(
      (data: any) => {
        this.mentors = data;
        console.log(data);
      },
      (error: any) => {
        Swal.fire('Error', error, 'error');
      }
    );
  }

  deleteMentor(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this mentor",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#ff4081',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          (success) => {
            this.snack.open('Mentor has been deleted..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000
            });
            this.mentors = this.mentors.filter((mentor: any) => mentor.id != id)
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

