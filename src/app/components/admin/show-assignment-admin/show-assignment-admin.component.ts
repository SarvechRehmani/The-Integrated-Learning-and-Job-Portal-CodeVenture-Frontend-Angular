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
    const isDark = document.documentElement.classList.contains('dark');

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
        console.error('Error loading assignment:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load assignment. Please try again.',
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
      text: 'This will permanently remove the assignment',
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
          isDark ? '!border !border-gray-700' : '!border !border-gray-200'
        }`,
        confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
        cancelButton: '!rounded-xl !shadow-md hover:!shadow-lg',
        actions: '!gap-3',
      },
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._assignment.deleteAssignment(id).subscribe({
          next: (success) => {
            this._snack.open('Failed to delete assignment', 'Close', {
              ...snackbarConfig,
              panelClass: ['success-admin-snackbar'],
            });

            this._router.navigate([
              '/admin/lectures/' + this.course.cId + '/' + this.course.cTitle,
            ]);
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
