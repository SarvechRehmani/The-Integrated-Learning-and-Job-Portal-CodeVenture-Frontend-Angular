import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileServiceService } from 'src/app/services/file-service.service';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { JobService } from 'src/app/services/job.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {

  constructor(
    private _title: Title,
    private _job: JobService,
    private _router: ActivatedRoute,
    private _snack: MatSnackBar,
    private _login: LoginService,
    private _file: FileServiceService,
    private _rout: Router,
    private _jobApplication: JobApplicationService

  ) { }

  jId = this._router.snapshot.params['jId'];

  job: any = {};
  user: any = this._login.getUser();
  ngOnInit(): void {
    this.loadJobApplication();
    this._job.getSingleJob(this.jId).subscribe(
      (data) => {
        this.job = data;
        console.log(this.job);
        this._title.setTitle(this.job.jTitle+' Job | CodeVenture');
      },
      (error) => {
        this._snack.open('Error in loading job details..', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    );
  }

  jobApplication: any;
  className: any;
  loadJobApplication() {
    this._jobApplication.getJobApplicationByJobAndUser(this.jId, this.user.id).subscribe(
      (data: any) => {
        this.jobApplication = data;
        if (this.jobApplication.status.toLowerCase() == "pending") {
          this.className = "pending";
        } else if (this.jobApplication.status.toLowerCase() == "rejected") {
          this.className = "reject";
        } else if (this.jobApplication.status.toLowerCase() == "accepted") {
          this.className = "accept";
        }
      },
      (error) => {
        this.jobApplication = null
      }
    );
  }

  ja: any = {
    userEducation: '',
    userExperience: '',
    userSkill: '',
  };

  submitApplication() {

    if (this.ja.userEducation == '' || this.ja.userEducation == null) {
      this._snack.open('Please Write Your Education..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if (this.ja.userExperience == '' || this.ja.userExperience == null) {
      this._snack.open('Please Choose Experience..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if (this.ja.userSkill == '' || this.ja.userSkill == null) {
      this._snack.open('Please Write Your Skill..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if (this.selectedFile.name == '' || this.selectedFile.name == null) {
      this._snack.open('Please Select your resume..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    let fileName: string = this.selectedFile.name;
    let extension = fileName.substring(fileName.lastIndexOf("."));

    if (extension.toLocaleLowerCase() != ".pdf") {
      this._snack.open('File not Supported. Please Choose .PDF Extension.', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    if (this.selectedFile.size > 10000000) {
      this._snack.open('File size must be less then 10MB. Please Choose Another.', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    const formData = new FormData();
    formData.append('resume', this.userFile);
    formData.append('jobApplications', JSON.stringify(this.ja));

    this._file.uploadResume(formData, this.job.jId).subscribe(
      (data) => {
        Swal.fire('Submitted', 'Your application for this job is submitted.', 'success')
          .then((e) => { this._rout.navigate(['/user/findjob']) });
      },
      (error) => {
        Swal.fire('Error', 'Your application is not submitted due to error.', 'error');

      }
    );

  }

  isApply = false;
  toggleIsApply() {
    this.isApply = !this.isApply;
  }

  // Selection of Image
  selectedFile: any = {
    name: ''
  };
  userFile: any = File;
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.userFile = this.selectedFile;
    console.log(this.selectedFile)
  }
}
