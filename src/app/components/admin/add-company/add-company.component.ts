import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
})
export class AddCompanyComponent {
  constructor(
    private _title: Title,
    private userService: UserService,
    private snack: MatSnackBar
  ) {}
  ngOnInit(): void {
    this._title.setTitle('Add Company | Admin | CodeVenture');
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
    checkRole: 'COMPANY',
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
      { field: 'username', message: 'Please enter a username' },
      { field: 'password', message: 'Please enter a password' },
      { field: 'firstName', message: 'Please enter a company name' },
      { field: 'phone', message: 'Please enter a phone number' },
      { field: 'email', message: 'Please enter a email' },
    ];

    for (const validation of validations) {
      if (!this.user[validation.field]) {
        this.snack.open(validation.message, 'OK', snackbarConfig);
        return;
      }
    }

    // Add company user
    this.userService.addUser(this.user).subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Company Successfully Registered',
          text: `Company ID is ${data.id}`,
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
            checkRole: 'COMPANY',
          };
        });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to register company.',
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
      },
    });
  }
}
