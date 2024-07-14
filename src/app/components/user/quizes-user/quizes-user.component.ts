import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quizes-user',
  templateUrl: './quizes-user.component.html',
  styleUrls: ['./quizes-user.component.css']
})
export class QuizesUserComponent implements OnInit{

  constructor(
    private _title:Title,
    private _quiz:QuizService,
    private _snack:MatSnackBar,
    private _login:LoginService
  ){}
  quizess:any;
  ngOnInit(): void {
    let field = this._login.getUser().field;
    this._title.setTitle('Quizzes | CodeVenture');
    this._quiz.getQuizzesByField(field).subscribe(
      (data:any) => {
        this.quizess = data;
      },
      (error) => {
        this._snack.open('Error in loading quizzes..','OK',{
          duration:3000,
          verticalPosition:'top'
        })
      }
    );
  }
}