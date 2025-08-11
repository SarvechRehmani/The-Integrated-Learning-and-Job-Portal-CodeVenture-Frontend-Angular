import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-mentor',
  templateUrl: './update-mentor.component.html',
  styleUrls: ['./update-mentor.component.css'],
})
export class UpdateMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _user: UserService,
    private _snack: MatSnackBar,
    private _rout: ActivatedRoute,
    private _router: Router
  ) {}
  id = this._rout.snapshot.params['id'];
  user: any = {};
  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

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

        this._title.setTitle(
          'Update ' + this.user.username + ' Mentor | Admin | CodeVenture'
        );
      },
      (error) => {
        console.error('Error loading mentor details:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load mentor details. Please try again.',
          icon: 'error',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#ef4444',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark ? '!border !border-red-600' : '!border !border-red-400'
            }`,
            confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
        });
      }
    );
  }

  formSubmit() {
    const isDark = document.documentElement.classList.contains('dark');
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
    };

    // Validation checks
    const validations = [
      { field: 'username', message: 'Please enter a username' },
      { field: 'firstName', message: 'Please enter first name' },
      { field: 'lastName', message: 'Please enter last name' },
      { field: 'email', message: 'Please enter a email' },
      { field: 'field', message: 'Please select field of mentor' },
    ];

    for (const validation of validations) {
      if (!this.user[validation.field]) {
        this._snack.open(validation.message, 'OK', snackbarConfig);
        return;
      }
    }

    this._user.updateUser(this.user).subscribe(
      (data: any) => {
        Swal.fire({
          title: 'Mentor Successfully updated',
          text: `Mentor with ID : ${data.id} is updated.`,
          icon: 'success',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#2196F3',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark
                ? '!border !border-emerald-600'
                : '!border !border-emerald-400'
            }`,
            confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
        }).then((e) => {
          this._router.navigate(['/admin/showmentor']);
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to update mentor.',
          icon: 'error',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#ef4444',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark ? '!border !border-red-600' : '!border !border-red-400'
            }`,
            confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
        });
      }
    );
  }
}
