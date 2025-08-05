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
    this._labTask.getLabTaskByLecture(this.id).subscribe(
      (data) => {
        console.log(data);
        this.labTask = data;
        this.lecture = this.labTask.lecture;
        this.course = this.lecture.course;

        this._title.setTitle(
          this.labTask.lecture.lTitle +
            "'s lecture LabTask | Mentor | CodeVenture"
        );
      },
      (error) => {
        Swal.fire('Error', 'Error in loading lectures..', 'error').then((e) => {
          this._router.navigate(['/mentor/lectures']);
        });
      }
    );
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

  deleteAssignment(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this Lab Task',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#673ab7',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this._labTask.deleteLabTask(id).subscribe(
          (success) => {
            Swal.fire(
              'Deleted',
              'Lab Task is successfully deleted..',
              'success'
            ).then((e) => {
              this._router.navigate(['/mentor/lectures']);
            });
          },
          (error) => {
            this._snack.open('Something went wroung..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        );
      }
    });
  }
}
