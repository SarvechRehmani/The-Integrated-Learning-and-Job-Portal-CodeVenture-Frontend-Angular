import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { JobService } from 'src/app/services/job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-jobs-company',
  templateUrl: './view-jobs-company.component.html',
  styleUrls: ['./view-jobs-company.component.css'],
})
export class ViewJobsCompanyComponent {
  constructor(
    private _title: Title,
    private _job: JobService,
    private _snack: MatSnackBar
  ) {}

  jobs: any;
  originalJobs: any;
  ngOnInit(): void {
    this._title.setTitle('Jobs | Company | CodeVenture');

    this._job.getJobsByUser().subscribe(
      (data) => {
        console.log(data);

        this.originalJobs = data;
        this.jobs = structuredClone(data);
        this.formatDate(this.jobs);
      },
      (error: any) => {
        Swal.fire('Error', 'Something went wroung..', 'error');
      }
    );
  }
  formatDate(jobs: any) {
    jobs.forEach((j: any) => {
      const d = new Date(j.jDeadline);
      j.jDeadline = d.toLocaleDateString();
    });
    console.log(this.jobs);
  }

  deleteJob(jId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this Course',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#673ab7',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this._job.deleteJob(jId).subscribe(
          (success) => {
            this._snack.open('Job has been deleted..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000,
            });
            this.jobs = this.jobs.filter((job: any) => job.jId != jId);
          },
          (error) => {
            this._snack.open('Something went wroung..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        );
      }
    });
  }
  searchQuery: any;
  onSearchJobs() {
    if (this.searchQuery === '') {
      // reload all lectures again
      console.log(this.jobs);
      console.log(this.originalJobs);

      this.jobs = this.originalJobs;
      return;
    }

    const filtered = this.originalJobs.filter(
      (job: any) =>
        job.jTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.jType.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.jExperience
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        job.jDeadline.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.jDescription
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        job.jLocation.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.jSkills.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.jEducation.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (filtered.length === 0) {
      this._snack.open('No jobs found.', 'Ok', {
        verticalPosition: 'top',
        duration: 3000,
      });
    }

    this.jobs = filtered;
  }
}
