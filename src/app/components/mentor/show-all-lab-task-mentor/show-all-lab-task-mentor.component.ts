import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LabTaskService } from 'src/app/services/lab-task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-all-lab-task-mentor',
  templateUrl: './show-all-lab-task-mentor.component.html',
  styleUrls: ['./show-all-lab-task-mentor.component.css'],
})
export class ShowAllLabTaskMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _labTask: LabTaskService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}
  labTasks: any;
  originalLabTasks: any;
  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');
    this._title.setTitle('LabTasks | Mentor | CodeVenture');

    this._labTask.getLabTaskByUserCourses().subscribe({
      next: (data: any) => {
        this.labTasks = data;
        this.originalLabTasks = structuredClone(data);
      },
      error: (error) => {
        console.error('Error loading lab tasks:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load lab tasks. Please try again.',
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

  deleteLabTask(id: any) {
    const isDark = document.documentElement.classList.contains('dark');

    Swal.fire({
      title: 'Delete Lab Task?',
      text: 'This will permanently remove the lab task and all its submissions',
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
        this._labTask.deleteLabTask(id).subscribe({
          next: (success) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Lab task has been successfully removed',
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
            this.labTasks = this.labTasks.filter(
              (labTask: any) => labTask.labId != id
            );
          },
          error: (error) => {
            console.error('Error deleting lab task:', error);
            this._snack.open('Failed to delete lab task', 'Close', {
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
  onSearchLabtask() {
    // Reset if search query is empty
    if (!this.searchQuery.trim()) {
      this.labTasks = [...this.originalLabTasks];
      return;
    }

    // Filter lab tasks
    const searchTerm = this.searchQuery.toLowerCase();
    const filtered = this.originalLabTasks.filter(
      (labTask: any) =>
        labTask.lecture.lTitle.toLowerCase().includes(searchTerm) ||
        labTask.labContent?.toLowerCase().includes(searchTerm)
    );

    // Show feedback if no results
    if (filtered.length === 0) {
      this._snack.open('No matching lab tasks found', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }

    this.labTasks = filtered;
  }
}
