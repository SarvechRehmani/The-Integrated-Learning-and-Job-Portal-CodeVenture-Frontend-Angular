import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-all-quiz',
  templateUrl: './show-all-quiz.component.html',
  styleUrls: ['./show-all-quiz.component.css']
})
export class ShowAllQuizComponent implements OnInit{

  constructor(
    private _title:Title,  
    private _quiz:QuizService,
    private _snack:MatSnackBar,
    private _question:QuestionService
    ){}

  quizzes:any;

  ngOnInit(): void {
    this._title.setTitle('Quizzes | Mentor | CodeVenture');
    this._quiz.getQuizzesByUserCourse().subscribe(
      (data) => {
        this.quizzes = data;
      },
      (error) => {
        Swal.fire('Error','Error in loading quizzes..!','error');
      }
    );

  }


  deleteQuiz(id:any){
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
            this._snack.open('Quiz has been deleted..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000
            });
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId != id)
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
