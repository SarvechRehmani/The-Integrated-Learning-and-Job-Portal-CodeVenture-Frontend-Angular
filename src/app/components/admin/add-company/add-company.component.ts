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
        console.log(data);
        Swal.fire({
          title: 'Company Successfully Registered',
          text: `Company ID is ${data.id}`,
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
        console.log(error);
        this.snack.open(
          `Something went wrong: ${error.message || error}`,
          'OK',
          {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: isDark ? ['dark-snackbar'] : [],
          }
        );
      },
    });
  }
}
