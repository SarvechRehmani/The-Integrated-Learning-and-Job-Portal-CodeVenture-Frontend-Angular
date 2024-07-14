import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question-mentor',
  templateUrl: './update-question-mentor.component.html',
  styleUrls: ['./update-question-mentor.component.css']
})
export class UpdateQuestionMentorComponent implements OnInit {

  constructor(
    private _title:Title,
    private _rout: ActivatedRoute,
    private _snack: MatSnackBar,
    private _question: QuestionService,
    private _router:Router
  ) { }
  public Editor = ClassicEditor;

  id = this._rout.snapshot.params['qid'];
  question = {
    questionId:'',
    questionContent: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {
      qId: this.id
    }
  };


  ngOnInit(): void {
    this._question.getSingleQuestionUser(this.id).subscribe(
      (data:any) => {
        this.question.questionId = data.questionId;
        this.question.questionContent = data.questionContent;
        this.question.option1 = data.option1;
        this.question.option2 = data.option2;
        this.question.option3 = data.option3;
        this.question.option4 = data.option4;
        this.question.answer = data.answer;
        this.question.quiz.qId = data.quiz.qId;

        
        this._title.setTitle('Update Question | Mentor | CodeVenture');
      },
      (error) => {
        Swal.fire('Error','Error in loading question.','error');
      }
    )
  }


  updateQuestion() {
    if (this.question.questionContent == '' || this.question.questionContent == null) {
      this._snack.open('Question content can not be blank..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      })
      return;
    }
    if (
      this.question.option1 == '' ||
      this.question.option2 == '' ||
      this.question.option2 == null ||
      this.question.option3 == '' ||
      this.question.option3 == null ||
      this.question.option4 == '' ||
      this.question.option4 == null
    ) {
      this._snack.open('Options can not be blank..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      })
      return;
    }
    if (this.question.answer == '' || this.question.answer == null) {
      this._snack.open('Answer can not be blank..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      })
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data:any) => {
        Swal.fire('Updated..', 'Question is successful updated', 'success')
        .then(
          (e) => {
            this._router.navigate(['/mentor//quiz/'+data.quiz.lecture.lId])
          }
        );
      },
      (error) => {
        console.log(error)
        Swal.fire('Error', error.error.message, 'error')
      }
    );

  }
}
