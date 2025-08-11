import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gradding-assignment-mentor',
  templateUrl: './gradding-assignment-mentor.component.html',
  styleUrls: ['./gradding-assignment-mentor.component.css'],
})
export class GraddingAssignmentMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _result: ResultService,
    private _snack: MatSnackBar,
    private _route: ActivatedRoute
  ) {}

  aId = this._route.snapshot.params['aId'];

  assignments: any;
  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._result.getAssignmentResultByAId(this.aId).subscribe({
      next: (data: any) => {
        this.assignments = data;
        console.log('Assignments loaded:', data);

        if (data?.length > 0 && data[0]?.assignment?.lecture?.lTitle) {
          this._title.setTitle(
            `Grading ${data[0].assignment.lecture.lTitle} Assignments | Mentor | CodeVenture`
          );
        } else {
          this._title.setTitle('Assignments | Mentor | CodeVenture');
        }
      },
      error: (error) => {
        console.error('Error loading assignments:', error);
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
}
