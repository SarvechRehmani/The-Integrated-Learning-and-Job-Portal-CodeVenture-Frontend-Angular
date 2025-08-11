import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-quiz-admin',
  templateUrl: './show-quiz-admin.component.html',
  styleUrls: ['./show-quiz-admin.component.css'],
})
export class ShowQuizAdminComponent implements OnInit {
  constructor(
    private _title: Title,
    private _quiz: QuizService,
    private _question: QuestionService,
    private _snack: MatSnackBar,
    private _rout: ActivatedRoute,
    private _router: Router
  ) {}
  id = this._rout.snapshot.params['lId'];
  quiz: any;
  questions: any;
  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._quiz.getQuizByLecture(this.id).subscribe({
      next: (data: any) => {
        this.quiz = data;
        this.loadQuestionsOfQuiz(data.qId);
        this._title.setTitle(`${this.quiz.qTitle} Quiz | Admin | CodeVenture`);
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

  loadQuestionsOfQuiz(qId: any) {
    const isDark = document.documentElement.classList.contains('dark');

    this._question.getQuestionByQuizWithAnswers(qId).subscribe({
      next: (data) => {
        this.questions = data;
        console.log(this.questions);
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error in loading questions',
          icon: 'error',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#2196F3', // Blue confirm button
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark
                ? 'dark:from-blue-500 dark:to-indigo-500'
                : 'from-blue-600 to-indigo-600'
            }`,
            confirmButton: `!rounded-xl !shadow-md bg-gradient-to-r`,
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOut animate__faster',
          },
        });
      },
    });
  }

  deleteQuestion(questionId: any) {
    const isDark = document.documentElement.classList.contains('dark');
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
    };

    Swal.fire({
      title: 'Delete Question?',
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
        this._question.deleteQuestion(questionId).subscribe({
          next: (success) => {
            this._snack.open(
              'Question has been deleted successfully',
              'Close',
              {
                ...snackbarConfig,
                panelClass: ['success-admin-snackbar'],
              }
            );
            this.questions = this.questions.filter(
              (question: any) => question.questionId != questionId
            );
          },
          error: (error) => {
            this._snack.open(
              'Failed to delete question',
              'Close',
              snackbarConfig
            );
          },
        });
      }
    });
  }

  deleteQuiz(id: any) {
    const isDark = document.documentElement.classList.contains('dark');
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
    };

    Swal.fire({
      title: 'Delete Quiz?',
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
        this._quiz.deleteQuiz(id).subscribe({
          next: (success) => {
            this._snack.open('Quiz has been deleted successfully', 'Close', {
              ...snackbarConfig,
              panelClass: ['success-admin-snackbar'],
            });

            this._router.navigate(['/admin/lecture/' + this.id]);
          },
          error: (error) => {
            this._snack.open('Failed to delete quiz', 'Close', snackbarConfig);
          },
        });
      }
    });
  }
}
