import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { CourseService } from 'src/app/services/course.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-course-mentor',
  templateUrl: './add-course-mentor.component.html',
  styleUrls: ['./add-course-mentor.component.css'],
})
export class AddCourseMentorComponent {
  constructor(
    private _title: Title,
    private _snack: MatSnackBar,
    private _course: CourseService,
    private _login: LoginService
  ) {}
  ngOnInit(): void {
    this._title.setTitle('Add Course | Mentor | CodeVenture');
    this.course.field = this._login.getUser().field;
  }
  course = {
    cTitle: '',
    cDescription: '',
    field: '',
    totalLectures: '',
  };
  formSubmit() {
    const isDark = document.documentElement.classList.contains('dark');

    // Validate Course Title
    if (this.course.cTitle == '' || this.course.cTitle == null) {
      this._snack.open('Course title is required', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Validate Total Lectures
    if (
      this.course.totalLectures == '' ||
      parseInt(this.course.totalLectures) <= 0 ||
      isNaN(parseInt(this.course.totalLectures))
    ) {
      this._snack.open(
        'Please enter a valid number of lectures (minimum 1)',
        'Close',
        {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'right',
        }
      );
      return;
    }

    // Submit form
    this._course.addCourse(this.course).subscribe(
      (data: any) => {
        Swal.fire({
          title: 'Course Added!',
          text: 'The course has been successfully created',
          icon: 'success',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#10b981', // emerald-500
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
      (error: any) => {
        this._snack.open(
          'Failed to create course. Please try again.',
          'Close',
          {
            duration: 3000,
            panelClass: ['error-snackbar'],
            verticalPosition: 'top',
            horizontalPosition: 'right',
          }
        );
      }
    );
  }
}
