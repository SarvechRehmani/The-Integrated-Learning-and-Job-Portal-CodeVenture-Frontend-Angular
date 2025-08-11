import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { JobService } from 'src/app/services/job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-jobs',
  templateUrl: './show-jobs.component.html',
  styleUrls: ['./show-jobs.component.css'],
})
export class ShowJobsComponent {
  constructor(
    private _title: Title,
    private _job: JobService,
    private _snack: MatSnackBar
  ) {}

  jobs: any;
  originalJobs: any;
  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._title.setTitle('Jobs | Admin | CodeVenture');

    this._job.getAllJobs().subscribe({
      next: (data) => {
        this.originalJobs = data;
        this.jobs = structuredClone(data);
        this.formatDate(this.jobs);
      },
      error: (error: any) => {
        console.error('Error loading jobs:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load jobs. Please try again.',
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
  formatDate(jobs: any) {
    jobs.forEach((j: any) => {
      const d = new Date(j.jDeadline);
      j.jDeadline = d.toLocaleDateString();
    });
    console.log(this.jobs);
  }

  deleteJob(jId: any) {
    const isDark = document.documentElement.classList.contains('dark');
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
    };

    Swal.fire({
      title: 'Delete Job?',
      text: 'This action cannot be undone',
      icon: 'warning',
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f3f4f6' : '#1f2937',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#2196F3',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: `!rounded-2xl !shadow-xl ${
          isDark
            ? 'dark:from-red-500 dark:to-pink-500'
            : 'from-red-600 to-pink-600'
        }`,
        confirmButton: `!rounded-xl !shadow-md bg-gradient-to-r`,
        cancelButton: `!rounded-xl !shadow-md bg-gradient-to-r ${
          isDark
            ? 'dark:from-purple-500 dark:to-indigo-500'
            : 'from-purple-600 to-indigo-600'
        }`,
      },
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._job.deleteJob(jId).subscribe({
          next: (success) => {
            this._snack.open('Job has been deleted successfully', 'Close', {
              ...snackbarConfig,
              panelClass: ['success-admin-snackbar'],
            });
            this.jobs = this.jobs.filter((job: any) => job.jId != jId);
          },
          error: (error) => {
            this._snack.open('Failed to delete job', 'Close', {
              ...snackbarConfig,
              panelClass: ['error-snackbar'],
            });
          },
        });
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
        job.jDescription
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        job.jSkills.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.jDeadline.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.jEducation.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.jLocation.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (filtered.length === 0) {
      this._snack.open('No lectures found.', 'Ok', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-snackbar'],
        duration: 3000,
      });
    }

    this.jobs = filtered;
  }
}
