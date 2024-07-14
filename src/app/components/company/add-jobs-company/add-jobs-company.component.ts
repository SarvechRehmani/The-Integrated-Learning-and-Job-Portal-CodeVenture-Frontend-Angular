import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { JobService } from 'src/app/services/job.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-jobs-company',
  templateUrl: './add-jobs-company.component.html',
  styleUrls: ['./add-jobs-company.component.css']
})
export class AddJobsCompanyComponent {
  constructor(
    private _title:Title,
    private jobService: JobService,
    private snack: MatSnackBar,
    private _login: LoginService) { }

  user: any;

  public job = {
    jTitle: '',
    jDescription: '',
    jType: '',
    jCompanyName: '',
    jCompanyDes: '',
    jCompanyContact: '',
    jLocation: '',
    jDeadline: '',
    jExperience: '',
    jEducation: '',
    jSkills: '',

  }
  ngOnInit(): void {
    this._title.setTitle('Add Job | Company | CodeVenture');

    this.user = this._login.getUser();
    this.job.jCompanyName = this.user.firstName;
    this.job.jCompanyContact = this.user.phone;
    this.job.jCompanyDes = this.user.bio;
  }

  formSubmit() {
    this.job.jCompanyName = this.user.firstName;
    this.job.jCompanyContact = this.user.phone;
    this.job.jCompanyDes = this.user.bio;

    if (this.job.jTitle == '' || this.job.jTitle == null) {
      this.snack.open('Job Title can not be blank..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

     
    if (this.job.jType == '' || this.job.jType == null) {
      this.snack.open('Please Choose Job Type..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if (this.job.jLocation == '' || this.job.jLocation == null) {
      this.snack.open('Please Write Location for the Job..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if (this.job.jLocation == '' || this.job.jLocation == null) {
      this.snack.open('Please Write Location for the Job..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if (this.job.jDeadline == '' || this.job.jDeadline == null) {
      this.snack.open('Please Choose Deadline for the Job..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if (this.job.jExperience == '' || this.job.jExperience == null) {
      this.snack.open('Please Choose Experience for the Job..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if (this.job.jSkills == '' || this.job.jSkills == null) {
      this.snack.open('Please Write Skills required for the Job..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    this.jobService.addJob(this.job).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Job is Successfully Added', 'Job ID is ' + data.jId, 'success').then(
          (e) => {
            this.job = {
              jTitle: '',
              jDescription: '',
              jType: '',
              jCompanyName: '',
              jCompanyDes: '',
              jCompanyContact: '',
              jLocation: '',
              jDeadline: '',
              jExperience: '',
              jEducation: '',
              jSkills: ''
            }
          }
        );
      },
      (error) => {
        console.log(error);
        this.snack.open('Something went wrong.', 'OK',{
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    )
  }
}
