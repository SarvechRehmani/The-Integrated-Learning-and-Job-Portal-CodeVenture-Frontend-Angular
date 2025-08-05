import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LabTaskService } from 'src/app/services/lab-task.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-lab-task-mentor',
  templateUrl: './show-lab-task-mentor.component.html',
  styleUrls: ['./show-lab-task-mentor.component.css'],
})
export class ShowLabTaskMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _labTask: LabTaskService,
    private _rout: ActivatedRoute,
    private _router: Router,
    private _snack: MatSnackBar,
    private _result: ResultService
  ) {}

  id = this._rout.snapshot.params['id'];
  labTask: any = {};
  labTaskResult: any = {};
  lecture: any = {};
  course: any = {};

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._labTask.getLabTaskByLecture(this.id).subscribe({
      next: (data: any) => {
        this.labTask = data;
        this.lecture = data.lecture;
        this.course = data.lecture.course;
        this.loadLabTaskResult(this.labTask.labId);
        this._title.setTitle(
          `${data.lecture.lTitle} Lab Task | Mentor | CodeVenture`
        );
      },
      error: (error) => {
        console.error('Error loading lab task:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load lab task details. Please try again.',
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

  loadLabTaskResult(id: any) {
    const isDark = document.documentElement.classList.contains('dark');

    this._result.getLabTaskResultBylId(id).subscribe({
      next: (data: any) => {
        this.labTaskResult = data;
      },
      error: (error: any) => {
        console.error('Error loading lab task results:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load lab task submissions. Please try again.',
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
              title: 'Success!',
              text: 'Lab task has been successfully deleted',
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
}
