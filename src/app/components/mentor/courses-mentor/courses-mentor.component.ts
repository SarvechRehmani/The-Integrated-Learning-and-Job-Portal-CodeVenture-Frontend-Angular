import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses-mentor',
  templateUrl: './courses-mentor.component.html',
  styleUrls: ['./courses-mentor.component.css'],
})
export class CoursesMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _course: CourseService,
    private _snack: MatSnackBar,
    private _lecture: LectureService
  ) {}

  courses: any;

  ngOnInit(): void {
    this._title.setTitle('Courses | Mentor | CodeVenture');

    this._course.getCoursesByUser().subscribe(
      (data) => {
        this.courses = data;
        console.log(data);
        this.loadLectureLength();
      },
      (error) => {
        Swal.fire('Error', 'Something went wroung..', 'error');
      }
    );
  }

  deleteCourse(id: any) {
    const isDark = document.documentElement.classList.contains('dark');
    Swal.fire({
      title: 'Delete Course?',
      text: 'All lectures and content will be permanently removed',
      icon: 'warning',
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f3f4f6' : '#1f2937',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // red-500
      cancelButtonColor: '#10b981', // emerald-500
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      backdrop: `
        rgba(0,0,0,0.4)
        center top
        no-repeat
      `,
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
      customClass: {
        popup: `!rounded-2xl !shadow-xl !border-8 ${
          isDark ? '!border !border-emerald-600' : '!border !border-emerald-400'
        }`,
        confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
        cancelButton: '!rounded-xl !shadow-md hover:!shadow-lg',
        actions: '!gap-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._course.deleteCourse(id).subscribe(
          (success) => {
            this._snack.open('Course deleted successfully', 'Close', {
              duration: 3000,
              panelClass: ['success-mentor-snackbar'],
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            this.courses = this.courses.filter(
              (course: any) => course.cId != id
            );
          },
          (error) => {
            this._snack.open('Failed to delete course', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
          }
        );
      }
    });
  }

  loadLectureLength() {
    this.courses.forEach((course: any) => {
      this._lecture.countLectureOfCourse(course.cId).subscribe((data: any) => {
        course.lectureLength = data;
      });
    });
  }
}
