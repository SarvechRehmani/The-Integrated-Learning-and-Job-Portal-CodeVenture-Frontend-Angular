import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-assignment-admin',
  templateUrl: './show-assignment-admin.component.html',
  styleUrls: ['./show-assignment-admin.component.css'],
})
export class ShowAssignmentAdminComponent implements OnInit {
  constructor(
    private _title: Title,
    private _assignment: AssignmentService,
    private _rout: ActivatedRoute,
    private _router: Router,
    private _snack: MatSnackBar
  ) {}

  id = this._rout.snapshot.params['lId'];

  assignment: any = {};
  lecture: any = {};
  course: any = {};

  ngOnInit(): void {
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
    };
    this._assignment.getAssignmentByLecture(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.assignment = data;
        this.lecture = this.assignment.lecture;
        this.course = this.lecture.course;

        this._title.setTitle(
          this.assignment.lecture.lTitle +
            "'s lecture Assignment | Admin | CodeVenture"
        );
      },
      error: (error) => {
        this._snack.open(
          'Error in loading Assignment...',
          'Close',
          snackbarConfig
        );
      },
    });
  }

  deleteAssignment(id: any) {
    const isDark = document.documentElement.classList.contains('dark');
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
    };

    Swal.fire({
      title: 'Delete Assignment?',
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
        confirmButton: `!rounded-xl !shadow-md bg-gradient-to-r `,
        cancelButton: `!rounded-xl !shadow-md bg-gradient-to-r `,
      },
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._assignment.deleteAssignment(id).subscribe({
          next: (success) => {
            Swal.fire({
              title: 'Deleted',
              text: 'Assignment was successfully deleted',
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
                '/profile/lectures/' +
                  this.course.cId +
                  '/' +
                  this.course.cTitle,
              ]);
            });
          },
          error: (error) => {
            this._snack.open('Failed to delete assignment', 'Close', {
              ...snackbarConfig,
              panelClass: ['error-snackbar'],
            });
          },
        });
      }
    });
  }
}
