import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { FileServiceService } from 'src/app/services/file-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-mentor',
  templateUrl: './profile-mentor.component.html',
  styleUrls: ['./profile-mentor.component.css'],
})
export class ProfileMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private login: LoginService,
    private _file: FileServiceService,
    private _user: UserService,
    private _snack: MatSnackBar
  ) {}

  user: any;
  previewUrl: string | ArrayBuffer | null = null; // Add this for image preview

  ngOnInit(): void {
    this._title.setTitle('Profile | Mentor | CodeVenture');
    this.user = this.login.getUser();
  }
  updateDetailsFlag = false;
  toggleUpdateDetail() {
    this.updateDetailsFlag = !this.updateDetailsFlag;
  }
  // Updating User Details
  updateDetails(): void {
    const isDark = document.documentElement.classList.contains('dark');
    const updatedUser = { ...this.user };
    delete updatedUser['authorities'];

    this._user.updateUser(updatedUser).subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Updated!',
          text: 'Details successfully updated',
          icon: 'success',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#10b981',
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
          this._user.getUserById(updatedUser.id).subscribe({
            next: (userData) => {
              this.login.setUser(userData);
              window.location.href = '/mentor/profile';
            },
            error: (error) => {
              console.error('Error fetching updated data:', error);
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
  updateProfileFlag = false;
  toggleUpdateProfileContainer() {
    this.updateProfileFlag = !this.updateProfileFlag;
    // Reset preview when closing
    if (!this.updateProfileFlag) {
      this.previewUrl = null;
      this.selectedFile = null;
    }
  }
  // Updating Profile Picture
  userFile: any = File;
  updateProfile(): void {
    const isDark = document.documentElement.classList.contains('dark');

    if (!this.userFile) {
      this._snack.open('Please select a profile picture', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    const picture = new FormData();
    picture.append('image', this.userFile);

    this._file.uploadProfile(picture).subscribe({
      next: (data) => {
        console.log('Profile upload success:', data);

        Swal.fire({
          title: 'Updated!',
          text: 'Profile picture successfully uploaded',
          icon: 'success',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#10b981',
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
          this._user.getUserById(this.user.id).subscribe({
            next: (userData) => {
              this.login.setUser(userData);
              window.location.href = '/mentor/profile';
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
          this.toggleUpdateProfileContainer();
        });
      },
    });
  }

  changePasswordFlag = false;
  toggleChangePasswordFlag() {
    this.changePasswordFlag = !this.changePasswordFlag;
  }
  changePassword: any = {
    oldPassword: '',
    newPassword: '',
  };

  updatePassword(): void {
    const isDark = document.documentElement.classList.contains('dark');

    // Validate old password
    if (!this.changePassword.oldPassword?.trim()) {
      this._snack.open('Please write old password', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Validate new password
    if (!this.changePassword.newPassword?.trim()) {
      this._snack.open('Please write new password', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
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
      cancelButtonColor: '#673ab7',
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
        this._user.updatePassword(this.changePassword).subscribe({
          next: () => {
            Swal.fire({
              title: 'Updated!',
              text: 'Your password has been successfully updated',
              icon: 'success',
              background: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#f3f4f6' : '#1f2937',
              confirmButtonColor: '#10b981',
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
          error: (error) => {
            console.error('Error updating password:', error);
            Swal.fire({
              title: 'Error',
              text: 'Could not update password. Please try again.',
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
    });
  }

  // Selection of Image
  selectedFile: any = null;
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
