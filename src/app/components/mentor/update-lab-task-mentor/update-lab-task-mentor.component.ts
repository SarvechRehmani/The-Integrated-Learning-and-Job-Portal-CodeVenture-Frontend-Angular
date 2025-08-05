import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CourseService } from 'src/app/services/course.service';
import { LabTaskService } from 'src/app/services/lab-task.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-lab-task-mentor',
  templateUrl: './update-lab-task-mentor.component.html',
  styleUrls: ['./update-lab-task-mentor.component.css'],
})
export class UpdateLabTaskMentorComponent implements OnInit {
  public Editor = ClassicEditor;

  constructor(
    private _title: Title,
    private _rout: ActivatedRoute,
    private _course: CourseService,
    private _lecture: LectureService,
    private _labTask: LabTaskService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}
  id = this._rout.snapshot.params['id'];
  courses: any;
  lectures: any;
  public labTask = {
    labId: '',
    labContent: '',
    maxMarks: '',
    lecture: {
      lId: '',
      course: {
        cId: '',
      },
    },
  };
  course = {
    cId: '',
  };
  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');
    this._title.setTitle('Update LabTask | Mentor | CodeVenture');

    this.loadCourses();

    this._labTask.getSingleLabTaskUser(this.id).subscribe({
      next: (data: any) => {
        this.labTask = {
          labId: data.labId,
          labContent: data.labContent,
          maxMarks: data.maxMarks,
          lecture: {
            lId: data.lecture.lId,
            course: {
              cId: data.lecture.course.cId,
            },
          },
        };
        this.course = { cId: data.lecture.course.cId };
        this.loadLectures(this.course.cId);
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
        });
      },
    });
  }

  loadCourses() {
    const isDark = document.documentElement.classList.contains('dark');

    this._course.getCoursesByUser().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load your courses. Please try again.',
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

    this._lecture.getLectureByCourse(id).subscribe({
      next: (data) => {
        this.lectures = data;
      },
      error: (error) => {
        console.error('Error loading lectures:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load lectures for this course',
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

  updateLabTask() {
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
    if (isNaN(marks)) {
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

    // Update Lab Task
    this._labTask.updateLabTask(this.labTask).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Success!',
          text: 'Lab task has been updated successfully',
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
          this._router.navigate(['/mentor/labtasks']);
        });
      },
      error: (error) => {
        console.error('Error updating lab task:', error);
        this._snack.open('Failed to update lab task', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
        Swal.fire({
          title: 'Error',
          text: 'Failed to update lab task. Please try again.',
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
