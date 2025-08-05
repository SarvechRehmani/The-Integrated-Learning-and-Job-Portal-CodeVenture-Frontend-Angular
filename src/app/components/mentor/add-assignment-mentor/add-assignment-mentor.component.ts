import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-assignment-mentor',
  templateUrl: './add-assignment-mentor.component.html',
  styleUrls: ['./add-assignment-mentor.component.css'],
})
export class AddAssignmentMentorComponent {
  constructor(
    private _title: Title,
    private _course: CourseService,
    private _lecture: LectureService,
    private _assignment: AssignmentService,
    private _snack: MatSnackBar
  ) {}
  public Editor = ClassicEditor;

  courses: any;
  lectures: any;

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._title.setTitle('Add Assignment | Mentor | CodeVenture');

    this._course.getCoursesByUser().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load courses',
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

    // Clear lectures if no course selected
    if (!id) {
      this.lectures = [];
      return;
    }
    // Load lectures for selected course
    this._lecture.getLectureByCourseWithoutAssignment(id).subscribe(
      (data: any) => {
        this.lectures = data;
      },
      (error: any) => {
        console.error('Error loading lectures:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load lectures',
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
  assignment = {
    aContent: '',
    maxMarks: '',
    lecture: {
      lId: '',
    },
  };
  addAssignments() {
    const isDark = document.documentElement.classList.contains('dark');

    // Validate Lecture Selection
    if (!this.assignment.lecture?.lId) {
      this._snack.open('Please select a lecture', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Validate Marks
    const marks = parseInt(this.assignment.maxMarks);
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

    // Submit Assignment
    this._assignment.addAssignment(this.assignment).subscribe(
      (data) => {
        Swal.fire({
          title: 'Success!',
          text: 'Assignment has been added successfully',
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
        }).then((e) => {
          this.lectures = [];
          this.assignment = {
            aContent: '',
            maxMarks: '',
            lecture: { lId: '' },
          };
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to add assignment',
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
}
