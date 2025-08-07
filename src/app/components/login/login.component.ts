import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private snack: MatSnackBar,
    private _title: Title,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._title.setTitle('Login | CodeVenture');

    if (this.login.isloggedIn()) {
      this.redirecting(this.login.userRole());
    }
  }

  redirecting(role: any) {
    if (role == 'ADMIN') {
      this.router.navigate(['/admin/']);
      this.login.loginStatusSubject.next(true);
    } else if (role == 'MENTOR') {
      this.router.navigate(['/mentor/']);
      this.login.loginStatusSubject.next(true);
    } else if (role == 'NORMAL') {
      this.router.navigate(['/user/']);
      this.login.loginStatusSubject.next(true);
    } else if (role == 'COMPANY') {
      this.router.navigate(['/company/']);
      this.login.loginStatusSubject.next(true);
    }
  }

  loginData = {
    username: '',
    password: '',
  };

  clicked = false;
  formSubmit(): void {
    const isDark = document.documentElement.classList.contains('dark');
    this.clicked = true;

    // Validate username
    if (!this.loginData.username?.trim()) {
      this.snack.open('Username is required', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      this.clicked = false;
      return;
    }

    // Validate password
    if (!this.loginData.password?.trim()) {
      this.snack.open('Password is required', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      this.clicked = false;
      return;
    }

    this.login.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        console.log('Login successful, token received:', data);
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe({
          next: (user: any) => {
            this.login.setUser(user);
            this.redirecting(this.login.userRole());
          },
          error: (error: any) => {
            console.error('Error fetching user details:', error);
            this.clicked = false;

            this.snack.open('Invalid credentials. Please try again', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });

            Swal.fire({
              title: 'Error',
              text: 'Failed to fetch user details. Please try again.',
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
      },
      error: (error: any) => {
        console.error('Login failed:', error);
        this.clicked = false;

        this.snack.open('Invalid credentials. Please try again', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });

        Swal.fire({
          title: 'Login Failed',
          text: 'Invalid username or password. Please try again.',
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
