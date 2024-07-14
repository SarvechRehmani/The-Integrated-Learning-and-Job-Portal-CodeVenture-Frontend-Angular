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
  styleUrls: ['./profile-mentor.component.css']
})
export class ProfileMentorComponent implements OnInit{
  
  constructor(
    private _title:Title, 
    private login: LoginService,
    private _file: FileServiceService,
    private _user: UserService,
    private _snack:MatSnackBar
  ) { }

  user: any;

  ngOnInit(): void {
    this._title.setTitle('Profile | Mentor | CodeVenture');

    this.user = this.login.getUser();
    console.log(this.user);
  }
  updateDetailsFlag = false;
  toggleUpdateDetail() { 
    this.updateDetailsFlag = !this.updateDetailsFlag;
  }
 
// Updating User Details
updateDetails(){
  var updatedUser = this.user;
  delete updatedUser['authorities'];
  this._user.updateUser(updatedUser).subscribe(
    (data:any) => {
      Swal.fire('Updated.', 'Details is Successfully Uploaded..', 'success').then(
        (e) => {
          this._user.getUserById(updatedUser.id).subscribe(
            (data) => {
              this.login.setUser(data);
              window.location.href = "/mentor/profile";
            },
            (error) => {
              Swal.fire('Error','Error in Redirecting...','error');
            }
          );
          this.toggleUpdateDetail();
        }
      );
    },
    (error) => {
      Swal.fire('Error', 'Error in Updating Details.', 'error').then(
        (e) => {
          this.toggleUpdateDetail();
        }
      );
    }
  );
}
// toggle Update Profile Container
updateProfileFlag = false;
toggleUpdateProfileContainer() { 
  this.updateProfileFlag = !this.updateProfileFlag;
}
// Updating Profile Picture
userFile: any = File;
updateProfile() {
  const picture = new FormData();
  picture.append('image', this.userFile);
  this._file.uploadProfile(picture).subscribe(
    (data) => {
      console.log(data);
      Swal.fire('Updated.', 'Profile is Successfully Uploaded..', 'success').then(
        (e) => {
          this._user.getUserById(this.user.id).subscribe(
            (data) => {
              this.login.setUser(data);
              window.location.href = "/mentor/profile";
            },
            (error) => {
              Swal.fire('Error','Error in Redirecting...','error');
              this.toggleUpdateProfileContainer();
            }
          );
          this.toggleUpdateProfileContainer();
        }
      );
    },
    (error) => {
      Swal.fire('Error', 'Error in uploading profile..', 'error').then(
        (e) => {
          this.toggleUpdateProfileContainer();
        }
      );
    }
  );
}


changePasswordFlag = false;
toggleChangePasswordFlag(){
  this.changePasswordFlag = !this.changePasswordFlag;
}
changePassword:any = {
  oldPassword:'',
  newPassword:''
}

updatePassword(){
  if(this.changePassword.oldPassword == '' || this.changePassword.oldPassword == null){
    this._snack.open('Please write old password.','OK',{
      duration:3000,
      verticalPosition:'top'
    });
    return;
  }
  if(this.changePassword.newPassword == '' || this.changePassword.newPassword == null){
    this._snack.open('Please write new password.','OK',{
      duration:3000,
      verticalPosition:'top'
    });
    return;
  }
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to Update your Password.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#673ab7',
    cancelButtonText:'No',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      this._user.updatePassword(this.changePassword).subscribe(
        (data) => {
          Swal.fire('Updated', 'Your password is successfully updated..', 'success');
          this.toggleChangePasswordFlag();
        },
        (error) => {
          this._snack.open(error.error.message, 'Ok', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      );
    }
  })
}

// Selection of Image
selectedFile: any = null;
onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
  this.userFile = this.selectedFile;
  console.log(this.selectedFile)
}
}

