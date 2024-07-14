import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz-user',
  templateUrl: './start-quiz-user.component.html',
  styleUrls: ['./start-quiz-user.component.css']
})
export class StartQuizUserComponent implements OnInit {

  constructor(
    private _title: Title,
    private _location: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snack: MatSnackBar,
    private _result: ResultService,
  ) { }

  qId = this._route.snapshot.params['qId'];
  questions: any;
  quiz: any;

  timer: any;

  result: any;

  ngOnInit(): void {
    this._result.getQuizResult(this.qId).subscribe(
      (data) => {
        this.result = data;
        console.log("result is");
        console.log(this.result);
        if (this.result == null) {
          this.preventBackButton();
          this.loadQuestions();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadQuestions() {
    this._question.getQuestionByQuiz(this.qId).subscribe(
      (data) => {
        console.log(data);
        this.questions = data;

        this.questions.forEach((q: any) => {
          delete q['quiz']['lecture']['course'];
        })


        this.quiz = this.questions[0].quiz;
        this.timer = this.questions.length * 2 * 60;

        this.startTimer();

        this._title.setTitle(this.quiz.qTitle + ' Quiz | CodeVenture');

      },
      (error) => {
        this._snack.open('Error in Loading Questions.', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        })
      }
    );
  }

  // Submit Quiz
  submitQuiz() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to Submit the Quiz.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizResult();
      } else if (result.isDenied) {
      }
    })
  }


  // Result of Quiz after Clikcing submit or Time Out
  quizResult() {
    // BACKEND CHECKING
    this._result.resultQuiz(this.questions).subscribe(
      (data: any) => {
        this.result = data;
        console.log(data);
      },
      (error) => {
        this._snack.open('Error in Submiting Quiz.', "OK", {
          duration: 3000,
          verticalPosition: 'top'
        })
      }
    );

    // FRONTEND CHECKING
    // this.isSubmit = true;
    // this.questions.forEach((q: any) => {
    //   if (q.givenAnswer === q.answer) {
    //     this.correctAnswers++;
    //     let markOfQuestion = this.quiz.maxMarks / this.quiz.numberOfQuestions;
    //     this.gotMarks += markOfQuestion;
    //   }
    //   if (this.questions.givenAnswer != '') {
    //     this.attempted++;
    //   }
    // });
  }


  // Timer Progress
  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.quizResult();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  // Formate Time
  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`
  }

  printResult() {
    window.print();
  }

  // Prevent Back Button
  preventBackButton() {
    history.pushState(null, location.href);
    this._location.onPopState(() => {
      history.pushState(null, location.href);
    });
  }
}
