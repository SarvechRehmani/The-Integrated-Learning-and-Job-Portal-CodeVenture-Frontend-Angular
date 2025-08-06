import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private _title: Title,
    private _lecture: LectureService,
    private _course: CourseService,
    private _snack: MatSnackBar,
    private _quiz: QuizService,
    private _rout: ActivatedRoute
  ) {}

  id = this._rout.snapshot.params['id'];

  courses: any;
  lectures: any;

  quiz = {
    qId: '',
    qTitle: '',
    qDescription: '',
    maxMarks: '',
    numberOfQuestions: '',
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
    this.loadCourses();

    this._quiz.getSingleQuiz(this.id).subscribe({
      next: (data: any) => {
        // Update quiz data
        this.quiz = {
          qId: data.qId,
          qTitle: data.qTitle,
          qDescription: data.qDescription,
          maxMarks: data.maxMarks,
          numberOfQuestions: data.numberOfQuestions,
          lecture: {
            lId: data.lecture.lId,
            course: {
              cId: data.lecture.course.cId,
            },
          },
        };

        this.course.cId = this.quiz.lecture.course.cId;
        this.loadLectures(this.course.cId);

        // Set page title
        this._title.setTitle(
          `Update ${this.quiz.qTitle} Quiz | Mentor | CodeVenture`
        );
      },
      error: (error) => {
        console.error('Error loading quiz:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load quiz. Please try again.',
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
  loadCourses(): void {
    const isDark = document.documentElement.classList.contains('dark');
    this._course.getCoursesByUser().subscribe({
      next: (data) => {
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
  loadLectures(id: any): void {
    const isDark = document.documentElement.classList.contains('dark');

    // Validate input parameter
    if (!id) {
      this.lectures = [];
      this._snack.open('No course selected', 'Close', {
        duration: 2000,
        panelClass: ['info-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    this._lecture.getLectureByCourse(id).subscribe({
      next: (data) => {
        this.lectures = data;
      },
      error: (error) => {
        console.error('Error loading lectures for course:', id, error);
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

        // Fallback to empty array
        this.lectures = [];
      },
    });
  }
  updateQuiz(): void {
    const isDark = document.documentElement.classList.contains('dark');

    // Validate quiz title
    if (!this.quiz.qTitle?.trim()) {
      this._snack.open('Please enter quiz title', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Validate max marks
    const maxMarks = parseInt(this.quiz.maxMarks);
    if (isNaN(maxMarks) || maxMarks <= 0) {
      this._snack.open('Please enter valid maximum marks', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    } else if (maxMarks < 10 || maxMarks > 100) {
      this._snack.open('Marks should be between 10 to 100', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Validate number of questions
    const numQuestions = parseInt(this.quiz.numberOfQuestions);
    if (isNaN(numQuestions) || numQuestions <= 0) {
      this._snack.open('Please enter valid number of questions', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    } else if (numQuestions > 10) {
      this._snack.open(
        'Number of questions should be between 1 to 10',
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

    // Update quiz
    this._quiz.updateQuiz(this.quiz).subscribe({
      next: () => {
        Swal.fire({
          title: 'Updated!',
          text: 'Quiz has been successfully updated',
          icon: 'success',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#10b981',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark ? '!border !border-green-600' : '!border !border-green-400'
            }`,
            confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
        });
      },
      error: (error) => {
        console.error('Error updating quiz:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to update quiz. Please try again.',
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
