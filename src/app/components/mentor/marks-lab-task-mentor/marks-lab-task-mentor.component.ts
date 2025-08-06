import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marks-lab-task-mentor',
  templateUrl: './marks-lab-task-mentor.component.html',
  styleUrls: ['./marks-lab-task-mentor.component.css'],
})
export class MarksLabTaskMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _result: ResultService,
    private _snack: MatSnackBar,
    private _route: ActivatedRoute
  ) {}
  lId = this._route.snapshot.params['lId'];
  uId = this._route.snapshot.params['uId'];

  labTaskResult: any;
  username: any;

  user = {
    id: this.uId,
  };

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._result.getLabTaskResultByLIdAnsUId(this.lId, this.uId).subscribe({
      next: (data: any) => {
        console.log('Lab task result loaded:', data);

        this.labTaskResult = data;
        this.username = data.user.username;

        delete this.labTaskResult['labTask']['lecture']['course'];
        delete this.labTaskResult['user'];
        this.labTaskResult['user'] = this.user;

        // Set dynamic page title
        this._title.setTitle(
          `Marking ${this.username}'s LabTask | Mentor | CodeVenture`
        );
      },
      error: (error) => {
        console.error('Error loading lab task result:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load lab task submission. Please try again.',
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

  marks: any;

  submitMarks(): void {
    const isDark = document.documentElement.classList.contains('dark');
    const maxMarks = this.labTaskResult.labTask.maxMarks;

    // Validate marks
    if (this.marks <= 0 || this.marks > maxMarks) {
      this._snack.open(`Marks should be between 0 - ${maxMarks}`, 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Update marks
    this.labTaskResult.gotMarks = this.marks;

    this._result.submitMarksLabTask(this.labTaskResult).subscribe({
      next: () => {
        Swal.fire({
          title: 'Marks Assigned!',
          text: 'Marks successfully assigned to the user',
          icon: 'success',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#10b981',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark ? '!border !border-green-600' : '!border !border-green-400'
            }`,
            confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
        });
      },
      error: (error) => {
        console.error('Error submitting marks:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not assign marks. Please try again.',
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
}
