import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-instructions-user',
  templateUrl: './quiz-instructions-user.component.html',
  styleUrls: ['./quiz-instructions-user.component.css']
})
export class QuizInstructionsUserComponent implements OnInit{

  constructor(
    private _title:Title,
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _snack: MatSnackBar,
    private _router: Router
  ){}

  lId = this._route.snapshot.params['lId'];
  quiz:any;
  ngOnInit(): void {
    this._title.setTitle('Quiz Instructions | CodeVenture');
    this._quiz.getQuizByLecture(this.lId).subscribe(
      (data:any) => {
        this.quiz = data;
      },
      (error) => {
        this._snack.open('Error in Loading quiz..','OK',{
          duration:3000,
          verticalPosition:'top'
        })
      }
    );
  }

  startQuiz(){
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to Start the Quiz.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Start'
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/quiz/start/'+this.quiz.qId])
      }else if(result.isDenied){

      }
    });
  }
}
