import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-find-job-user',
  templateUrl: './find-job-user.component.html',
  styleUrls: ['./find-job-user.component.css']
})
export class FindJobUserComponent {
  constructor(
    private _title:Title,
    private _job: JobService,
    private _snack: MatSnackBar
  ) { }

  searchQuery: string = '';
  jobs: any[] = [];
  filteredJobs: any[] = [];
  initialJobsToShow = 5;

  ngOnInit(): void {
    this._title.setTitle('Find Jobs | CodeVenture');
    this.loadAllJobs();
    this.filteredJobs = [];
  }

  loadAllJobs(): void {
    this._job.getAllJobs().subscribe(
      (data:any) => {
        this.jobs = data;
        this.filteredJobs = this.jobs.slice(0, this.initialJobsToShow);
        console.log(data);
      },
      (error: any) => {
        this._snack.open('Error in loading Jobs..', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    );
  }

  loadMoreJobs(): void {
    this.searchQuery = '';
    const remainingJobs = this.jobs.slice(
      this.filteredJobs.length,
      this.filteredJobs.length + this.initialJobsToShow
    );
    this.filteredJobs = [...this.filteredJobs, ...remainingJobs];
  }

  searchJobs(): void {
    if (this.searchQuery.trim() !== '') {
      this.filteredJobs = this.jobs.filter(
        job =>
        job.jTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.jDescription.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.jSkills.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      
        false
      );
    } else {
      // If the search query is empty, show all jobs
      this.filteredJobs = [...this.jobs];
    }
  }
}
