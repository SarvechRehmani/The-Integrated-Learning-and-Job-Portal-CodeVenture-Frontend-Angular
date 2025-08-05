import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-lecture',
  templateUrl: './update-lecture.component.html',
  styleUrls: ['./update-lecture.component.css'],
})
export class UpdateLectureComponent implements OnInit {
  constructor(
    private _title: Title,
    private _rout: ActivatedRoute,
    private _lecture: LectureService,
    private _course: CourseService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}

  public Editor = ClassicEditor;
  id = this._rout.snapshot.params['id'];
  courses: any;

  public lecture = {
    lId: '',
    lNo: '',
    lTitle: '',
    lDescription: '',
    lVideo: '',
    course: {
      cId: '',
    },
  };

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    // Load lecture data
    this._lecture.getSingleLectureUser(this.id).subscribe({
      next: (data: any) => {
        this.lecture = {
          lId: data.lId,
          lNo: data.lNo,
          lTitle: data.lTitle,
          lDescription: data.lDescription,
          lVideo: data.lVideo,
          course: {
            cId: data.course.cId,
          },
        };

        this._title.setTitle(
          `Update ${this.lecture.lTitle} Lecture | Mentor | CodeVenture`
        );
      },
      error: (error) => {
        console.error('Error loading lecture:', error);

        // Show snackbar notification
        this._snack.open('Failed to load lecture details', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });

        // Show error dialog
        Swal.fire({
          title: 'Error',
          text: 'Could not load lecture details. Please try again.',
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
          this._router.navigate(['/mentor/lectures']);
        });
      },
    });

    // Load courses list
    this._course.getCoursesByUser().subscribe({
      next: (data: any) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error loading courses:', error);

        // Show snackbar notification
        this._snack.open('Failed to load courses', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });

        // Show error dialog
        Swal.fire({
          title: 'Error',
          text: 'Could not load courses. Please try again.',
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

  formSubmit() {
    const isDark = document.documentElement.classList.contains('dark');
    // Validate Lecture Title
    if (!this.lecture.lTitle?.trim()) {
      this._snack.open('Lecture title is required', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Validate Lecture Number
    if (
      !this.lecture.lNo ||
      isNaN(Number(this.lecture.lNo)) ||
      Number(this.lecture.lNo) <= 0
    ) {
      this._snack.open(
        'Please enter a valid lecture number (minimum 1)',
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

    this._lecture.updateLecture(this.lecture).subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Updated!',
          text: 'Lecture successfully updated!',
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
        }).then(() => {
          this._router.navigate(['/mentor/lectures']);
        });
      },
      error: (error: any) => {
        console.error('Error updating lecture:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not update lecture. Please try again.',
          icon: 'error',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#ef4444', // red-500
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
