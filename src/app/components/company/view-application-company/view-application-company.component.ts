import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApplicationService } from 'src/app/services/job-application.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-application-company',
  templateUrl: './view-application-company.component.html',
  styleUrls: ['./view-application-company.component.css']
})
export class ViewApplicationCompanyComponent implements OnInit {
  constructor(
    private _title:Title,
    private _jobApplication:JobApplicationService,
    private _rout:ActivatedRoute,
    private _snack:MatSnackBar
  ) { }

  jobId = this._rout.snapshot.params['jId'];
  jobApplications:any = [];

  ngOnInit(): void {
    if(this.jobId){
      this._jobApplication.getJobsApplicationsByJobIdOfUserJob(this.jobId).subscribe(
        (data:any) => {
          this.jobApplications = data;
          console.log(this.jobApplications);
    
          this._title.setTitle(this.jobApplications[0].job.jTitle+' Applications | Company | CodeVenture');
        },
        (error) => {
          this._snack.open('Error in laoding Job Applications.','OK',{
            duration:3000,
            verticalPosition:'top'
          });
        });
    }else{
      this._jobApplication.getJobsApplicationsByUser().subscribe(
        (data:any) => {
          this.jobApplications = data;
          console.log(this.jobApplications);
    
          this._title.setTitle('All Job Applications | Company | CodeVenture');
        },
        (error) => {
          this._snack.open('Error in laoding Job Applications.','OK',{
            duration:3000,
            verticalPosition:'top'
          });
        });
    }
  }


  updateStatus(status:any,jobAId:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to "+status.substring(0,6)+" this Application",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff4081',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        let ja = {
          jobAId:jobAId,
          status:status
        }
        this._jobApplication.updateJobApplication(ja).subscribe(
          (data) => {
            Swal.fire('Application '+status,'Application Successfully '+status,'success').then(
              (e) => {
                window.location.href = '/company/applications/'+this.jobId;
              }
            );
          },
          (error) => {
            status = status.substring(0,6)
            Swal.fire('Error','Error in '+status+'ing Application','error')
          }
        );
      }
    })
  }
}
