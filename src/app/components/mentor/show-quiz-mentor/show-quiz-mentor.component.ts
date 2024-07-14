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
  styleUrls: ['./show-quiz-mentor.component.css']
})
export class ShowQuizMentorComponent implements OnInit {
  constructor(
    private _title:Title,
    private _quiz: QuizService,
    private _question: QuestionService,
    private _snack: MatSnackBar,
    private _rout: ActivatedRoute,
    private _router: Router
  ) { }
  id = this._rout.snapshot.params['id'];
  quiz: any;
  questions: any;
  ngOnInit(): void {
    this._quiz.getQuizByLecture(this.id).subscribe(
      (data:any) => {
        this.quiz = data;
        this.loadQuestionsOfQuiz(data.qId);

        this._title.setTitle(this.quiz.qTitle+' Quiz | Mentor | CodeVenture');
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
        console.log(this.questions);
      },
      (error) => {
        Swal.fire('Error', 'Error in loading quiz..!', 'error');
      }
    )
  }

  deleteQuestion(questionId:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this Question",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#673ab7',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(questionId).subscribe(
          (success) => {
            this._snack.open('Question is successfully deleted..!', 'Ok', {
              verticalPosition: 'top',
              duration: 3000
            });
            this.questions = this.questions.filter((quesrion: any) => quesrion.questionId != questionId);
          },
          (error) => {
            this._snack.open('Something went wroung..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000
            });
          }
        );
      }
    })
  }
  deleteQuiz(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this Quiz",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#673ab7',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(id).subscribe(
          (success) => {
            Swal.fire('Deleted', 'Quiz is successfully deleted..!', 'success').then(
              (e) => {
                this._router.navigate(['/mentor/quizzes']);
              }
            );
          },
          (error) => {
            this._snack.open('Something went wroung..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000
            });
          }
        );
      }
    })
  }

}
