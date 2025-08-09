import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LabTaskService } from 'src/app/services/lab-task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-labtask-admin',
  templateUrl: './show-labtask-admin.component.html',
  styleUrls: ['./show-labtask-admin.component.css'],
})
export class ShowLabtaskAdminComponent implements OnInit {
  constructor(
    private _title: Title,
    private _labTask: LabTaskService,
    private _rout: ActivatedRoute,
    private _router: Router,
    private _snack: MatSnackBar
  ) {}

  id = this._rout.snapshot.params['lId'];
  labTask: any = {};
  lecture: any = {};
  course: any = {};

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');
    this._labTask.getLabTaskByLecture(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.labTask = data;
        this.lecture = this.labTask.lecture;
        this.course = this.lecture.course;

        this._title.setTitle(
          this.labTask.lecture.lTitle +
            "'s lecture LabTask | Mentor | CodeVenture"
        );
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error in loading lectures..',
          icon: 'error',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2196F3',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark
                ? 'dark:from-red-500 dark:to-pink-500'
                : 'from-red-600 to-pink-600'
            }`,
            confirmButton: `!rounded-xl !shadow-md bg-gradient-to-r`,
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOut animate__faster',
          },
        }).then((e) => {
          this._router.navigate([
            '/admin/lectures/' + this.course.cId + '/' + this.course.cTitle,
          ]);
        });
      },
    });
  }

  deleteLabTask(id: any) {
    const isDark = document.documentElement.classList.contains('dark');
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
    };

    Swal.fire({
      title: 'Delete Lab Task?',
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
        this._labTask.deleteLabTask(id).subscribe({
          next: (success) => {
            Swal.fire({
              title: 'Deleted',
              text: 'Lab Task was successfully deleted',
              icon: 'success',
              background: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#f3f4f6' : '#1f2937',
              confirmButtonText: 'OK',
              confirmButtonColor: '#2196F3',
              customClass: {
                popup: `!rounded-2xl !shadow-xl ${
                  isDark
                    ? 'dark:from-green-500 dark:to-teal-500'
                    : 'from-green-600 to-teal-600'
                }`,
                confirmButton: `!rounded-xl !shadow-md bg-gradient-to-r`,
              },
              showClass: {
                popup: 'animate__animated animate__fadeIn animate__faster',
              },
            }).then(() => {
              this._router.navigate([
                '/admin/lectures/' + this.course.cId + '/' + this.course.cTitle,
              ]);
            });
          },
          error: (error) => {
            this._snack.open('Failed to delete lab task', 'Close', {
              ...snackbarConfig,
              panelClass: ['error-snackbar'],
            });
          },
        });
      }
    });
  }
}
