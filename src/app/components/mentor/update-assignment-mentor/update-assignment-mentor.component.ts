import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-assignment-mentor',
  templateUrl: './update-assignment-mentor.component.html',
  styleUrls: ['./update-assignment-mentor.component.css'],
})
export class UpdateAssignmentMentorComponent implements OnInit {
  public Editor = ClassicEditor;

  constructor(
    private _title: Title,
    private _rout: ActivatedRoute,
    private _course: CourseService,
    private _lecture: LectureService,
    private _assignment: AssignmentService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}

  id = this._rout.snapshot.params['id'];

  courses: any;
  lectures: any;
  public assignment = {
    aId: '',
    aContent: '',
    maxMarks: '',
    totalLectures: '',
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
    this._title.setTitle('Update Assignment | Mentor | CodeVenture');

    this.loadCourses();

    this._assignment.getSingleAssignment(this.id).subscribe({
      next: (data: any) => {
        this.assignment = {
          aId: data.aId,
          aContent: data.aContent,
          maxMarks: data.maxMarks,
          totalLectures: data.totalLectures,
          lecture: {
            lId: data.lecture.lId,
            course: {
              cId: data.lecture.course.cId,
            },
          },
        };

        this.course.cId = this.assignment.lecture.course.cId;
        this.loadLectures(this.course.cId);
      },
      error: (error) => {
        console.error('Error loading assignment:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load assignment. Please try again.',
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
      next: (data: any) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
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
  loadLectures(id: any) {
    const isDark = document.documentElement.classList.contains('dark');

    // Validate course ID
    if (!id) {
      this.lectures = [];
      return;
    }

    this._lecture.getLectureByCourse(id).subscribe({
      next: (data: any) => {
        this.lectures = data;
      },
      error: (error) => {
        console.error('Error loading lectures for course:', id, error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load lectures for this course. Please try again.',
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
  updateAssignment() {
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
    const maxMarks = parseInt(this.assignment.maxMarks.toString());
    if (isNaN(maxMarks) || maxMarks <= 0) {
      this._snack.open('Please enter valid maximum marks', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    if (maxMarks < 10 || maxMarks > 100) {
      this._snack.open('Marks should be between 10 to 100', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    this._assignment.updateAssignment(this.assignment).subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Success!',
          text: 'Assignment successfully updated',
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
          this._router.navigate(['/mentor/assignments']);
        });
      },
      error: (error: any) => {
        console.error('Error updating assignment:', error);
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong. Please try again.',
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
