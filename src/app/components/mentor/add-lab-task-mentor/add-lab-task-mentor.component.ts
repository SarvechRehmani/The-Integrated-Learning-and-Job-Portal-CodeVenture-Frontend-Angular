import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CourseService } from 'src/app/services/course.service';
import { LabTaskService } from 'src/app/services/lab-task.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-lab-task-mentor',
  templateUrl: './add-lab-task-mentor.component.html',
  styleUrls: ['./add-lab-task-mentor.component.css'],
})
export class AddLabTaskMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _course: CourseService,
    private _lecture: LectureService,
    private _labtask: LabTaskService,
    private _snack: MatSnackBar
  ) {}
  public Editor = ClassicEditor;

  courses: any;
  lectures: any;

  labTask = {
    labContent: '',
    maxMarks: '',
    lecture: {
      lId: '',
    },
  };

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');
    this._title.setTitle('Add Lab Task | Mentor | CodeVenture');

    this._course.getCoursesByUser().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load course list. Please try again later.',
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

  loadLectures(id: any) {
    const isDark = document.documentElement.classList.contains('dark');

    // Clear lectures if no valid course ID
    if (!id) {
      this.lectures = [];
      return;
    }

    this._lecture.getLectureByCourseWithoutLabTask(id).subscribe({
      next: (data) => {
        this.lectures = data;
      },
      error: (error) => {
        console.error('Error loading lectures:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load lectures. Please try again.',
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

  addLabTask() {
    const isDark = document.documentElement.classList.contains('dark');

    // Validate Lecture Selection
    if (!this.labTask.lecture?.lId) {
      this._snack.open('Please select a lecture', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Validate Marks
    const marks = parseInt(this.labTask.maxMarks);
    if (isNaN(marks) || marks <= 0) {
      this._snack.open('Please enter valid maximum marks', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    if (marks < 10 || marks > 100) {
      this._snack.open('Marks must be between 10-100', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Submit Lab Task
    this._labtask.addLabTask(this.labTask).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Success!',
          text: 'Lab task has been added successfully',
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
          this.lectures = [];
          this.labTask = {
            labContent: '',
            maxMarks: '',
            lecture: { lId: '' },
          };
        });
      },
      error: (error) => {
        console.error('Error adding lab task:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to add lab task',
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
