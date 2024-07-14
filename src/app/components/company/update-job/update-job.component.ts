import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { JobService } from 'src/app/services/job.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.css']
})
export class UpdateJobComponent {

  constructor(
    private _title: Title,
    private _job: JobService,
    private _rout: ActivatedRoute,
    private _router: Router,
    private _snack: MatSnackBar,
    private _login: LoginService
  ) { }

  jId = this._rout.snapshot.params['jId'];
  user: any = this._login.getUser();
  job = {
    jId: '',
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

    this._job.getSingleJobUser(this.jId).subscribe(
      (data: any) => {
        this.job.jId = data.jId;
        this.job.jTitle = data.jTitle;
        this.job.jDescription = data.jDescription;
        this.job.jType = data.jType;
        this.job.jCompanyName = data.jCompanyName;
        this.job.jCompanyDes = data.jCompanyDes;
        this.job.jCompanyContact = data.jCompanyContact;
        this.job.jLocation = data.jLocation;
        this.job.jDeadline = data.jDeadline;
        this.job.jExperience = data.jExperience;
        this.job.jEducation = data.jEducation;
        this.job.jSkills = data.jSkills;

        this._title.setTitle('Update ' + this.job.jTitle + ' Job | Company | CodeVenture');
        this.formateDate(this.job);
      },
      (error) => {
        Swal.fire('Error', 'Something went wroung..', 'error').then(
          (e) => {
            this._router.navigate(['/company/job'])
          }
        );
      }
    );

  }

  formateDate(job: any) {
    this.job.jDeadline = this.job.jDeadline.split('T')[0];
  }

  formSubmit() {
    this.job.jCompanyName = this.user.firstName;
    this.job.jCompanyContact = this.user.phone;
    this.job.jCompanyDes = this.user.bio;

    if (this.job.jTitle == '' || this.job.jTitle == null) {
      this._snack.open('Job Title can not be blank..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }


    if (this.job.jType == '' || this.job.jType == null) {
      this._snack.open('Please Choose Job Type..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if (this.job.jLocation == '' || this.job.jLocation == null) {
      this._snack.open('Please Write Location for the Job..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if (this.job.jLocation == '' || this.job.jLocation == null) {
      this._snack.open('Please Write Location for the Job..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if (this.job.jDeadline == '' || this.job.jDeadline == null) {
      this._snack.open('Please Choose Deadline for the Job..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if (this.job.jExperience == '' || this.job.jExperience == null) {
      this._snack.open('Please Choose Experience for the Job..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if (this.job.jSkills == '' || this.job.jSkills == null) {
      this._snack.open('Please Write Skills required for the Job..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    this._job.updateJob(this.job).subscribe(
      (data) => {
        Swal.fire('Updated..', 'Job is successfully updated..', 'success').then(
          (e) => {
            this._router.navigate(['/company/viewjobs'])
          }
        );
      },
      (error) => {
        Swal.fire('Error', 'Something went wroung..', 'error').then(
          (e) => {
            this._router.navigate(['/company/job'])
          }
        );
      }
    );
  }
}
