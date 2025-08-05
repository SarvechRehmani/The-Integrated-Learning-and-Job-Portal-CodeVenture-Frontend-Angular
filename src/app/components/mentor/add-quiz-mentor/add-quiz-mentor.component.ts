import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz-mentor',
  templateUrl: './add-quiz-mentor.component.html',
  styleUrls: ['./add-quiz-mentor.component.css'],
})
export class AddQuizMentorComponent {
  public Editor = ClassicEditor;

  constructor(
    private _title: Title,
    private _lecture: LectureService,
    private _course: CourseService,
    private _snack: MatSnackBar,
    private _quiz: QuizService
  ) {}

  courses: any;
  lectures: any;

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');
    this._title.setTitle('Add Quiz | Mentor | CodeVenture');

    this._course.getCoursesByUser().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load available courses. Please try again.',
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

    this._lecture.getLectureByCourseWithoutQuiz(id).subscribe({
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

  quiz = {
    qTitle: '',
    qDescription: '',
    maxMarks: '',
    numberOfQuestions: '',
    lecture: {
      lId: '',
    },
  };

  addQuiz() {
    const isDark = document.documentElement.classList.contains('dark');

    // Validate Quiz Title
    if (!this.quiz.qTitle?.trim()) {
      this._snack.open('Quiz title is required', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Validate Marks
    const marks = parseInt(this.quiz.maxMarks);
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

    // Validate Number of Questions
    const numQuestions = parseInt(this.quiz.numberOfQuestions);
    if (isNaN(numQuestions)) {
      this._snack.open('Please enter valid number of questions', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    if (numQuestions < 1 || numQuestions > 10) {
      this._snack.open('Number of questions must be 1-10', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Submit Quiz
    this._quiz.addQuiz(this.quiz).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Success!',
          text: 'Quiz has been created successfully',
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
          this.quiz = {
            qTitle: '',
            qDescription: '',
            maxMarks: '',
            numberOfQuestions: '',
            lecture: { lId: '' },
          };
        });
      },
      error: (error) => {
        console.error('Error adding quiz:', error);
        this._snack.open('Failed to create quiz', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
        Swal.fire({
          title: 'Error',
          text: 'Failed to create quiz. Please try again.',
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
