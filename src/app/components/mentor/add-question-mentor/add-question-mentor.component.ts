import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question-mentor',
  templateUrl: './add-question-mentor.component.html',
  styleUrls: ['./add-question-mentor.component.css']
})
export class AddQuestionMentorComponent implements OnInit {
  constructor(
    private _title:Title,
    private _rout:ActivatedRoute,
    private _snack:MatSnackBar,
    private _question:QuestionService
  ){}
  public Editor = ClassicEditor;
    id = this._rout.snapshot.params['qid'];
    qTitle = this._rout.snapshot.params['qTitle'];
  question={
    questionContent:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:{
      qId:this.id
    }
  };

  ngOnInit(): void {
    this._title.setTitle('Add Question | Mentor | CodeVenture');
  }
  addQuestion(){
    if(this.question.questionContent == '' || this.question.questionContent == null){
      this._snack.open('Question content can not be blank..','OK',{
        duration:3000,
        verticalPosition:'top'
      })
      return;
    }
    if(
      this.question.option1 == '' ||
      this.question.option2 == '' ||
      this.question.option2 == null ||
      this.question.option3 == '' ||
      this.question.option3 == null ||
      this.question.option4 == '' ||
      this.question.option4 == null
     ){
      this._snack.open('Options can not be blank..','OK',{
        duration:3000,
        verticalPosition:'top'
      })
      return;
    }
    if(this.question.answer == '' || this.question.answer == null){
      this._snack.open('Answer can not be blank..','OK',{
        duration:3000,
        verticalPosition:'top'
      })
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data) =>{
        Swal.fire('Added..','Question is successful added in'+this.qTitle,'success').then(
          (e) => {
            this.question={
              questionContent:'',
              option1:'',
              option2:'',
              option3:'',
              option4:'',
              answer:'',
              quiz:{
                qId:this.id
              }
            }
          }
        );
      },
      (error) => {
        console.log(error)
        Swal.fire('Error',error.error.message,'error')
      }
    );

  }
}