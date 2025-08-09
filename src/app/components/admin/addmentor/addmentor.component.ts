import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addmentor',
  templateUrl: './addmentor.component.html',
  styleUrls: ['./addmentor.component.css'],
})
export class AddmentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private userService: UserService,
    private snack: MatSnackBar
  ) {}
  ngOnInit(): void {
    this._title.setTitle('Add Mentor | Admin | CodeVenture');
  }
  public user: any = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    field: '',
    bio: '',
    checkRole: 'MENTOR',
  };
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
      { field: 'username', message: 'Username cannot be blank' },
      { field: 'password', message: 'Password cannot be blank' },
      { field: 'firstName', message: 'First name cannot be blank' },
      { field: 'lastName', message: 'Last name cannot be blank' },
      { field: 'email', message: 'Email cannot be blank' },
      { field: 'field', message: 'Please select category for mentor' },
    ];

    for (const validation of validations) {
      if (!this.user[validation.field]) {
        this.snack.open(validation.message, 'OK', snackbarConfig);
        return;
      }
    }

    // Add mentor user
    this.userService.addUser(this.user).subscribe({
      next: (data: any) => {
        console.log(data);
        Swal.fire({
          title: 'Mentor Successfully Registered',
          text: `Mentor ID is ${data.id}`,
          icon: 'success',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonText: 'OK',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark
                ? 'dark:from-blue-500 dark:to-cyan-500'
                : 'from-blue-600 to-cyan-600'
            }`,
            confirmButton: `!rounded-xl !shadow-md bg-gradient-to-r`,
          },
          confirmButtonColor: '#2196F3',
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
        }).then(() => {
          // Reset form if needed
          this.user = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            address: '',
            field: '',
            bio: '',
            checkRole: 'MENTOR',
          };
        });
      },
      error: (error) => {
        this.snack.open('Something went wrong', 'OK', snackbarConfig);
      },
    });
  }
}
