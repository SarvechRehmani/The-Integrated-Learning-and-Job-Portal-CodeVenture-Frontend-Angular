import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gradding-lab-task-mentor',
  templateUrl: './gradding-lab-task-mentor.component.html',
  styleUrls: ['./gradding-lab-task-mentor.component.css'],
})
export class GraddingLabTaskMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _result: ResultService,
    private _snack: MatSnackBar,
    private _route: ActivatedRoute,
    private _user: UserService
  ) {}

  lId = this._route.snapshot.params['lId'];

  labTasks: any;
  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._result.getLabTaskResultBylId(this.lId).subscribe({
      next: (data: any) => {
        this.labTasks = data;
        console.log('Lab tasks loaded:', data);

        if (data.length > 0) {
          const lectureTitle = data[0].labTask.lecture.lTitle;
          this._title.setTitle(
            `Grading ${lectureTitle} LabTasks | Mentor | CodeVenture`
          );
        }
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
}
