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
  }

  toggleUpdateDetail() {
    this.updateDetailsFlag = !this.updateDetailsFlag;
  }

  // Updating User Details
  updateDetails() {
    const isDark = document.documentElement.classList.contains('dark');
    const updatedUser = { ...this.user };
    delete updatedUser['authorities'];

    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
    };

    this._user.updateUser(updatedUser).subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Updated!',
          text: 'Your details have been successfully updated',
          icon: 'success',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#2196F3',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark ? '!border !border-green-600' : '!border !border-green-400'
            }`,
            confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
          },
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
              console.error('Error fetching updated data:', error);
              Swal.fire({
                title: 'Error',
                text: 'Could not load updated profile',
                icon: 'error',
                background: isDark ? '#1f2937' : '#ffffff',
                color: isDark ? '#f3f4f6' : '#1f2937',
                confirmButtonColor: '#2196F3',
                customClass: {
                  popup: `!rounded-2xl !shadow-xl ${
                    isDark
                      ? '!border !border-red-600'
                      : '!border !border-red-400'
                  }`,
                  confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
                },
                showClass: {
                  popup: 'animate__animated animate__fadeIn animate__faster',
                },
              });
            },
          });
          this.toggleUpdateDetail();
        });
      },
      error: (error) => {
        console.error('Error updating details:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not update details',
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
      this._snack.open(
        'Please select a profile picture',
        'Close',
        snackbarConfig
      );
      return;
    }

    // Prepare form data
    const picture = new FormData();
    picture.append('image', this.userFile);

    this._file.uploadProfile(picture).subscribe({
      next: (data: any) => {
        console.log('Profile upload success:', data);

        Swal.fire({
          title: 'Updated!',
          text: 'Profile picture successfully uploaded',
          icon: 'success',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#2196F3',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark ? '!border !border-green-600' : '!border !border-green-400'
            }`,
            confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
          },
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
              console.error('Error fetching updated profile:', error);
              Swal.fire({
                title: 'Error',
                text: 'Could not load updated profile',
                icon: 'error',
                background: isDark ? '#1f2937' : '#ffffff',
                color: isDark ? '#f3f4f6' : '#1f2937',
                confirmButtonColor: '#ef4444',
                customClass: {
                  popup: `!rounded-2xl !shadow-xl ${
                    isDark
                      ? '!border !border-red-600'
                      : '!border !border-red-400'
                  }`,
                  confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
                },
                showClass: {
                  popup: 'animate__animated animate__fadeIn animate__faster',
                },
              }).then((e) => {
                this.toggleUpdateProfileContainer();
              });
            },
          });
        });
      },
      error: (error) => {
        console.error('Profile upload error:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not upload profile picture',
          icon: 'error',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#2196f#',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark ? '!border !border-red-600' : '!border !border-red-400'
            }`,
            confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
          },
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

    // Confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to update your password',
      icon: 'warning',
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f3f4f6' : '#1f2937',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#2196F3',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes, update it',
      customClass: {
        popup: `!rounded-2xl !shadow-xl ${
          isDark ? '!border !border-gray-600' : '!border !border-gray-200'
        }`,
        confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
        cancelButton: '!rounded-xl !shadow-md hover:!shadow-lg',
      },
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._user.updatePassword(this.changePassword).subscribe(
          (data) => {
            Swal.fire({
              title: 'Updated!',
              text: 'Your password has been successfully updated',
              icon: 'success',
              background: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#f3f4f6' : '#1f2937',
              confirmButtonColor: '#2196F3',
              customClass: {
                popup: `!rounded-2xl !shadow-xl ${
                  isDark
                    ? '!border !border-green-600'
                    : '!border !border-green-400'
                }`,
                confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
              },
              showClass: {
                popup: 'animate__animated animate__fadeIn animate__faster',
              },
            });
            this.toggleChangePasswordFlag();
          },
          (error) => {
            console.error('Error updating password:', error);
            Swal.fire({
              title: 'Error',
              text: 'Could not update password. Please try again.',
              icon: 'error',
              background: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#f3f4f6' : '#1f2937',
              confirmButtonColor: '#2196F3',
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
