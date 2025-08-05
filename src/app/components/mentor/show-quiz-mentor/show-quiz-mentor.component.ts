import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-quiz-mentor',
  templateUrl: './show-quiz-mentor.component.html',
  styleUrls: ['./show-quiz-mentor.component.css'],
})
export class ShowQuizMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _quiz: QuizService,
    private _question: QuestionService,
    private _snack: MatSnackBar,
    private _rout: ActivatedRoute,
    private _router: Router
  ) {}
  id = this._rout.snapshot.params['id'];
  quiz: any;
  questions: any;
  ngOnInit(): void {
    this._quiz.getQuizByLecture(this.id).subscribe(
      (data: any) => {
        this.quiz = data;
        this.loadQuestionsOfQuiz(data.qId);

        this._title.setTitle(this.quiz.qTitle + ' Quiz | Mentor | CodeVenture');
      },
      (error) => {
        Swal.fire('Error', 'Error in loading quiz..!', 'error');
      }
    );
  }

  loadQuestionsOfQuiz(qId: any) {
    this._question.getQuestionsByQuizOfUser(qId).subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => {
        Swal.fire('Error', 'Error in loading quiz..!', 'error');
      }
    );
  }

  deleteQuestion(questionId: any) {
    const isDark = document.documentElement.classList.contains('dark');
    Swal.fire({
      title: 'Delete Question?',
      text: 'This will permanently remove the question from the quiz',
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
        popup: `!rounded-2xl !shadow-xl ${
          isDark ? '!border !border-emerald-600' : '!border !border-emerald-400'
        }`,
        confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
        cancelButton: '!rounded-xl !shadow-md hover:!shadow-lg',
        actions: '!gap-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(questionId).subscribe(
          (success) => {
            this._snack.open('Question deleted successfully', 'Close', {
              duration: 3000,
              panelClass: ['success-mentor-snackbar'],
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            this.questions = this.questions.filter(
              (question: any) => question.questionId != questionId
            );
          },
          (error) => {
            this._snack.open('Failed to delete question', 'Close', {
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
  deleteQuiz(id: any) {
    const isDark = document.documentElement.classList.contains('dark');
    Swal.fire({
      title: 'Delete Quiz?',
      text: 'All questions and results will be permanently removed',
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
        popup: `!rounded-2xl !shadow-xl ${
          isDark ? '!border !border-emerald-600' : '!border !border-emerald-400'
        }`,
        confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
        cancelButton: '!rounded-xl !shadow-md hover:!shadow-lg',
        actions: '!gap-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(id).subscribe(
          (success) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Quiz has been successfully deleted',
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
              this._router.navigate(['/mentor/quizzes']);
            });
          },
          (error) => {
            this._snack.open('Failed to delete quiz', 'Close', {
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
}
