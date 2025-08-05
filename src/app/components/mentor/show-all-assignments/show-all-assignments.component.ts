import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-all-assignments',
  templateUrl: './show-all-assignments.component.html',
  styleUrls: ['./show-all-assignments.component.css'],
})
export class ShowAllAssignmentsComponent implements OnInit {
  constructor(
    private _title: Title,
    private _assignment: AssignmentService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}

  assignments: any;
  orignalAssignments: any;

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');
    this._title.setTitle('Assignments | Mentor | CodeVenture');

    this._assignment.getAssignmentByUserCourse().subscribe({
      next: (data: any) => {
        this.assignments = data;
        this.orignalAssignments = structuredClone(data);
      },
      error: (error) => {
        console.error('Error loading assignments:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load assignments. Please try again.',
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
      text: 'This will permanently remove the assignment and all its submissions',
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
            });
            this.assignments = this.assignments.filter(
              (assignment: any) => assignment.aId != id
            );
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
  searchQuery: string = '';
  onSearchAssignment() {
    // Reset if search query is empty
    if (!this.searchQuery.trim()) {
      this.assignments = [...this.orignalAssignments];
      return;
    }

    // Filter assignments
    const searchTerm = this.searchQuery.toLowerCase();
    const filtered = this.orignalAssignments.filter(
      (assignment: any) =>
        assignment.lecture.lTitle.toLowerCase().includes(searchTerm) ||
        assignment.aContent.toLowerCase().includes(searchTerm)
    );

    // Show feedback if no results
    if (filtered.length === 0) {
      this._snack.open('No matching assignments found', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }

    this.assignments = filtered;
  }
}
