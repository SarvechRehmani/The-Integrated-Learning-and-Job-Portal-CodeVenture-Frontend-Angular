import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marks-assignment-mentor',
  templateUrl: './marks-assignment-mentor.component.html',
  styleUrls: ['./marks-assignment-mentor.component.css'],
})
export class MarksAssignmentMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _result: ResultService,
    private _snack: MatSnackBar,
    private _route: ActivatedRoute
  ) {}

  aId = this._route.snapshot.params['aId'];
  uId = this._route.snapshot.params['uId'];

  assignmentResult: any;
  username: any;

  user = {
    id: this.uId,
  };
  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._result.getAssignmentResultByAIdAnsUId(this.aId, this.uId).subscribe({
      next: (data) => {
        this.assignmentResult = data;
        this.username = this.assignmentResult.user.username;

        delete this.assignmentResult['assignment']['lecture']['course'];
        delete this.assignmentResult['user'];
        this.assignmentResult['user'] = this.user;

        this._title.setTitle(
          `Marking ${this.username}'s Assignment | Mentor | CodeVenture`
        );
      },
      error: (error) => {
        console.error('Error loading assignment submission:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load the submitted assignment. Please try again.',
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
  submitMarks() {
    const isDark = document.documentElement.classList.contains('dark');
    const maxMarks = this.assignmentResult.assignment.maxMarks;

    // Validate Marks
    if (this.marks <= 0 || this.marks > maxMarks) {
      this._snack.open(`Marks must be between 0-${maxMarks}`, 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Submit Marks
    this.assignmentResult.gotMarks = this.marks;
    this._result.submitMarksAssignment(this.assignmentResult).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Success!',
          text: 'Marks have been successfully assigned',
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
      },
      error: (error) => {
        console.error('Error submitting marks:', error);
        this._snack.open('Failed to assign marks', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
    });
  }
}
