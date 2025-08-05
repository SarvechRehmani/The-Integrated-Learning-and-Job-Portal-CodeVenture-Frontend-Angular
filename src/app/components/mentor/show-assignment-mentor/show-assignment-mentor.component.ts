import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-assignment-mentor',
  templateUrl: './show-assignment-mentor.component.html',
  styleUrls: ['./show-assignment-mentor.component.css'],
})
export class ShowAssignmentMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _assignment: AssignmentService,
    private _rout: ActivatedRoute,
    private _router: Router,
    private _snack: MatSnackBar,
    private _result: ResultService
  ) {}

  id = this._rout.snapshot.params['id'];
  assignment: any = {};
  assignmentResult: any = {};
  lecture: any = {};
  course: any = {};

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._assignment.getAssignmentByLecture(this.id).subscribe({
      next: (data) => {
        this.assignment = data;
        this.lecture = this.assignment.lecture;
        this.course = this.lecture.course;
        this.loadAssignmentResult(this.assignment.aId);

        this._title.setTitle(
          `${this.assignment.lecture.lTitle} Assignment | Mentor | CodeVenture`
        );
      },
      error: (error) => {
        console.error('Error loading assignment:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load assignment details. Please try again.',
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
        }).then(() => {
          this._router.navigate(['/mentor/lectures']);
        });
      },
    });
  }

  loadAssignmentResult(id: any) {
    const isDark = document.documentElement.classList.contains('dark');

    this._result.getAssignmentResultByAId(id).subscribe({
      next: (data: any) => {
        this.assignmentResult = data;
      },
      error: (error: any) => {
        console.error('Error loading assignment results:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load assignment submissions. Please try again.',
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

    Swal.fire({
      title: 'Delete Assignment?',
      text: 'This will permanently remove the assignment',
      icon: 'warning',
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f3f4f6' : '#1f2937',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#10b981',
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
            Swal.fire({
              title: 'Deleted!',
              text: 'Assignment has been successfully removed',
              icon: 'success',
              background: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#f3f4f6' : '#1f2937',
              confirmButtonColor: '#10b981',
              customClass: {
                popup: `!rounded-2xl !shadow-xl ${
                  isDark
                    ? '!border !border-emerald-600'
                    : '!border !border-emerald-400'
                }`,
                confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
              },
              showClass: {
                popup: 'animate__animated animate__fadeIn animate__faster',
              },
            }).then(() => {
              this._router.navigate(['/mentor/lectures']);
            });
          },
          error: (error) => {
            console.error('Error deleting assignment:', error);
            this._snack.open('Failed to delete assignment', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
          },
        });
      }
    });
  }
}
