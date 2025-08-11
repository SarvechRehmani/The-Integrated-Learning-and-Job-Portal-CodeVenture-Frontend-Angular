import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-company-admin',
  templateUrl: './update-company-admin.component.html',
  styleUrls: ['./update-company-admin.component.css'],
})
export class UpdateCompanyAdminComponent implements OnInit {
  constructor(
    private _title: Title,
    private _user: UserService,
    private _snack: MatSnackBar,
    private _rout: ActivatedRoute,
    private _router: Router
  ) {}
  id = this._rout.snapshot.params['id'];

  company: any = {};
  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

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

        this._title.setTitle(
          'Update ' + this.company.username + ' Company | Admin | CodeVenture'
        );
      },
      (error) => {
        console.error('Error loading company details:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load company details. Please try again.',
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
      { field: 'firstName', message: 'Please enter a company name' },
      { field: 'phone', message: 'Please enter a phone number' },
      { field: 'email', message: 'Please enter a email' },
    ];

    for (const validation of validations) {
      if (!this.company[validation.field]) {
        this._snack.open(validation.message, 'OK', snackbarConfig);
        return;
      }
    }

    this._user.updateUser(this.company).subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Company Successfully updated',
          text: `Company with ID : ${data.id} is updated.`,
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
          this._router.navigate(['/admin/showcompanies']);
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to update company.',
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
