import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-courses-admin',
  templateUrl: './view-courses-admin.component.html',
  styleUrls: ['./view-courses-admin.component.css'],
})
export class ViewCoursesAdminComponent implements OnInit {
  constructor(
    private _title: Title,
    private _course: CourseService,
    private _snack: MatSnackBar,
    private _lecture: LectureService
  ) {}

  courses: any;

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._title.setTitle('Courses | Admin | CodeVenture');

    this._course.getAllCourse().subscribe(
      (data) => {
        this.courses = data;
        this.loadLectureLength();
      },
      (error) => {
        console.error('Error loading course:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load course. Please try again.',
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
      }
    );
  }

  deleteCourse(id: any) {
    const isDark = document.documentElement.classList.contains('dark');
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
    };

    Swal.fire({
      title: 'Delete Course?',
      text: 'This action cannot be undone',
      icon: 'warning',
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f3f4f6' : '#1f2937',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#2196F3',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: `!rounded-2xl !shadow-xl ${
          isDark
            ? 'dark:from-red-500 dark:to-pink-500'
            : 'from-red-600 to-pink-600'
        }`,
        confirmButton: `!rounded-xl !shadow-md bg-gradient-to-r`,
        cancelButton: `!rounded-xl !shadow-md bg-gradient-to-r ${
          isDark
            ? 'dark:from-blue-500 dark:to-indigo-500'
            : 'from-blue-600 to-indigo-600'
        }`,
      },
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._course.deleteCourse(id).subscribe({
          next: (success) => {
            this._snack.open('Course has been deleted successfully', 'Close', {
              ...snackbarConfig,
              panelClass: ['success-admin-snackbar'],
            });

            this.courses = this.courses.filter(
              (course: any) => course.cId != id
            );
          },
          error: (error) => {
            this._snack.open(
              'Failed to delete course',
              'Close',
              snackbarConfig
            );
          },
        });
      }
    });
  }

  loadLectureLength() {
    const isDark = document.documentElement.classList.contains('dark');

    this.courses.forEach((course: any) => {
      this._lecture.countLectureOfCourse(course.cId).subscribe({
        next: (data: any) => {
          course.lectureLength = data;
        },
        error: (error) => {
          console.error('Error loading lectures count:', error);
          Swal.fire({
            title: 'Error',
            text: 'Could not load lectures count. Please try again.',
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
    });
  }
}
