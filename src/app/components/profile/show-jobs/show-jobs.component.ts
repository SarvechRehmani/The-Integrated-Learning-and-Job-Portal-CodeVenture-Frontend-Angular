import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { JobService } from 'src/app/services/job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-jobs',
  templateUrl: './show-jobs.component.html',
  styleUrls: ['./show-jobs.component.css']
})
export class ShowJobsComponent {
  constructor(
    private _title:Title,
    private _job:JobService,
    private _snack:MatSnackBar
    ){}
  
  jobs:any;

  ngOnInit(): void {
    this._title.setTitle('Jobs | Admin | CodeVenture');


   this._job.getAllJobs().subscribe(
    (data) => {
      this.jobs = data;
      console.log(this.jobs);
      this.formatDate(this.jobs);
    },
    (error:any) => {
      Swal.fire('Error','Something went wroung..','error');
    }
   );
  }
  formatDate(jobs:any){
    jobs.forEach((j:any) => {

      const d = new Date(j.jDeadline);
        j.jDeadline = d.toLocaleDateString();
    });
    console.log(this.jobs);
    
  }
  
  deleteJob(jId:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this Course",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#673ab7',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this._job.deleteJob(jId).subscribe(
          (success) => {
            this._snack.open('Job has been deleted..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000
            });
            this.jobs = this.jobs.filter((job: any) => job.jId != jId)
          },
          (error) => {
            this._snack.open('Something went wroung..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000
            });
          }
        );
      }
    })

  }

}
