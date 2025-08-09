import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { FileServiceService } from 'src/app/services/file-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css'],
})
export class AdminprofileComponent implements OnInit {
  constructor(
    private _title: Title,
    private login: LoginService,
    private _file: FileServiceService,
    private _user: UserService,
    private _snack: MatSnackBar
  ) {}

  user: any;
  previewUrl: string | ArrayBuffer | null = null; // Add this for image preview
  updateDetailsFlag = false;
  updateProfileFlag = false;
  changePasswordFlag = false;
  selectedFile: any = null;
  userFile: any = File;

  changePassword: any = {
    oldPassword: '',
    newPassword: '',
  };

  ngOnInit(): void {
    this._title.setTitle('Profile | Admin | CodeVenture');
    this.user = this.login.getUser();
    console.log(this.user);
  }

  toggleUpdateDetail() {
    this.updateDetailsFlag = !this.updateDetailsFlag;
  }

  // Updating User Details
  updateDetails() {
    const isDark = document.documentElement.classList.contains('dark');
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
    };

    // Prepare updated user data
    const updatedUser = { ...this.user };
    delete updatedUser['authorities'];

    this._user.updateUser(updatedUser).subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Details Updated',
          text: 'Your details have been successfully updated',
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
          // Refresh user data and redirect
          this._user.getUserById(updatedUser.id).subscribe({
            next: (userData) => {
              this.login.setUser(userData);
              window.location.href = '/admin/profile';
            },
            error: (error) => {
              this._snack.open(
                'Error loading updated profile',
                'OK',
                snackbarConfig
              );
            },
          });
          this.toggleUpdateDetail();
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Update Failed',
          text: 'Error in updating details',
          icon: 'error',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonText: 'OK',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark
                ? 'dark:from-red-500 dark:to-pink-500'
                : 'from-red-600 to-pink-600'
            }`,
            confirmButton: `!rounded-xl !shadow-md bg-gradient-to-r`,
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
        }).then(() => {
          this.toggleUpdateDetail();
        });
      },
    });
  }

  // toggle Update Profile Container
  toggleUpdateProfileContainer() {
    this.updateProfileFlag = !this.updateProfileFlag;
    // Reset preview when closing
    if (!this.updateProfileFlag) {
      this.previewUrl = null;
      this.selectedFile = null;
    }
  }

  updateProfile() {
    const isDark = document.documentElement.classList.contains('dark');
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
    };

    // Validate file selection
    if (!this.selectedFile) {
      this._snack.open('Please select a file first.', 'OK', snackbarConfig);
      return;
    }

    // Prepare form data
    const picture = new FormData();
    picture.append('image', this.userFile);

    this._file.uploadProfile(picture).subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Profile Updated',
          text: 'Your profile picture has been successfully uploaded',
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
          // Refresh user data and redirect
          this._user.getUserById(this.user.id).subscribe({
            next: (userData) => {
              this.login.setUser(userData);
              window.location.href = '/admin/profile';
            },
            error: (error) => {
              this._snack.open(
                'Error loading updated profile',
                'OK',
                snackbarConfig
              );
              this.toggleUpdateProfileContainer();
            },
          });
          this.toggleUpdateProfileContainer();
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Upload Failed',
          text: 'Error in uploading profile picture',
          icon: 'error',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonText: 'OK',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark
                ? 'dark:from-red-500 dark:to-pink-500'
                : 'from-red-600 to-pink-600'
            }`,
            confirmButton: `!rounded-xl !shadow-md bg-gradient-to-r`,
          },
          confirmButtonColor: '#2196F3',
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
        }).then(() => {
          this.toggleUpdateProfileContainer();
        });
      },
    });
  }

  toggleChangePasswordFlag() {
    this.changePasswordFlag = !this.changePasswordFlag;
  }

  updatePassword() {
    const isDark = document.documentElement.classList.contains('dark');
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
    };

    if (
      this.changePassword.oldPassword == '' ||
      this.changePassword.oldPassword == null
    ) {
      this._snack.open('Please enter old password.', 'OK', snackbarConfig);
      return;
    }
    if (
      this.changePassword.newPassword == '' ||
      this.changePassword.newPassword == null
    ) {
      this._snack.open('Please enter new password.', 'OK', snackbarConfig);
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Update your Password.',
      icon: 'warning',
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f3f4f6' : '#1f2937',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        popup: `!rounded-2xl !shadow-xl`,
        confirmButton: `!rounded-xl !shadow-md bg-gradient-to-r `,
        cancelButton: `!rounded-xl !shadow-md bg-gradient-to-r`,
      },
      confirmButtonColor: '#2196F3',

      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._user.updatePassword(this.changePassword).subscribe(
          (data) => {
            Swal.fire({
              title: 'Updated',
              text: 'Your password is successfully updated..',
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
            });
            this.toggleChangePasswordFlag();
          },
          (error) => {
            this._snack.open(error.error.message, 'Ok', snackbarConfig);
          }
        );
      }
    });
  }

  // Enhanced file selection with preview
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.userFile = this.selectedFile;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result ?? null;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
