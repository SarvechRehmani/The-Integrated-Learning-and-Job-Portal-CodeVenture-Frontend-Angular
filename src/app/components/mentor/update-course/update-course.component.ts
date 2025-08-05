import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css'],
})
export class UpdateCourseComponent implements OnInit {
  constructor(
    private _title: Title,
    private _course: CourseService,
    private _rout: ActivatedRoute,
    private _router: Router,
    private _snack: MatSnackBar
  ) {}

  id = this._rout.snapshot.params['id'];
  course = {
    cId: '',
    cTitle: '',
    cDescription: '',
    field: '',
    totalLectures: '',
  };

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._course.getSingleCourseUser(this.id).subscribe({
      next: (data: any) => {
        this.course = {
          cId: data.cId,
          cTitle: data.cTitle,
          cDescription: data.cDescription,
          field: data.field,
          totalLectures: data.totalLectures,
        };

        this._title.setTitle(
          `Update ${this.course.cTitle} | Mentor | CodeVenture`
        );
      },
      error: (error) => {
        console.error('Error loading course:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load course details. Please try again.',
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
          this._router.navigate(['/mentor/courses']);
        });
      },
    });
  }

  formSubmit() {
    const isDark = document.documentElement.classList.contains('dark');

    // Validate Course Title
    if (!this.course.cTitle?.trim()) {
      this._snack.open('Course title is required', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Validate Total Lectures
    const totalLectures = parseInt(this.course.totalLectures);
    if (isNaN(totalLectures)) {
      this._snack.open('Please enter a valid number of lectures', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    if (totalLectures <= 0) {
      this._snack.open('Number of lectures must be greater than 0', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Update Course
    this._course.updateCourse(this.course).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Success!',
          text: 'Course has been updated successfully',
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
          this._router.navigate(['/mentor/courses']);
        });
      },
      error: (error) => {
        console.error('Error updating course:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to update course. Please try again.',
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
          this._router.navigate(['/mentor/courses']);
        });
      },
    });
  }
}
