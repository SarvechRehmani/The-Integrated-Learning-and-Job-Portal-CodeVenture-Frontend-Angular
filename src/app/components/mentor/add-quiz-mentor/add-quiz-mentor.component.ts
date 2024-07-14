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
  styleUrls: ['./add-quiz-mentor.component.css']
})
export class AddQuizMentorComponent {  public Editor = ClassicEditor;

  constructor(
    private _title:Title, 
    private _lecture:LectureService,
    private _course:CourseService, 
    private _snack:MatSnackBar,
    private _quiz:QuizService
    ){ }
  
    courses: any;
    lectures:any;

  ngOnInit(): void {
   this._title.setTitle('Add Quiz | Mentor | CodeVenture');
    this._course.getCoursesByUser().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        Swal.fire('Error', 'Error in loading Courses..!', 'error');
      }
    );
  }


  loadLectures(id: any) {
    if (id == '' || id == null) {
      this.lectures = [];
      return;
    }
    this._lecture.getLectureByCourseWithoutQuiz(id).subscribe(
      (data) => {
        this.lectures = data;
      },
      (error) => {
        Swal.fire('Error', 'Error in loading lectures', 'error');
      });
  }


  quiz = {
    qTitle:'',
    qDescription:'',
    maxMarks:'',
    numberOfQuestions:'',
    lecture:{
      lId:''
    }
  };

  addQuiz(){
    if(this.quiz.qTitle == '' || this.quiz.qTitle == null){
      this._snack.open('Please Enter Quiz Title','OK',{
        duration: 3000,
        verticalPosition: 'top'
      })
      return;
    }
    if(parseInt(this.quiz.maxMarks) <=0 || this.quiz.maxMarks == ''){
      this._snack.open('Please enter correct maximum marks...','OK',{
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }else if(parseInt(this.quiz.maxMarks) < 10 || parseInt(this.quiz.maxMarks) > 100){
      this._snack.open('Marks should be between 10 to 100..','OK',{
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if(parseInt(this.quiz.numberOfQuestions) <=0 || this.quiz.numberOfQuestions == ''){
      this._snack.open('Please enter correct number of questions...','OK',{
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }else if(parseInt(this.quiz.numberOfQuestions) > 10){
      this._snack.open('Number of questions should be between 1 to 10..','OK',{
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    this._quiz.addQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire('Added','Quiz is successfully added...','success').then(
          (e)=> {
            this.lectures = [];
            this.quiz = {
              qTitle:'',
              qDescription:'',
              maxMarks:'',
              numberOfQuestions:'',
              lecture:{
                lId:''
              }
            };
          }
        );
      },
      (error) => {
        console.log(error)
        Swal.fire('Error','Something went wroung...','error');
      }
    );
  }
}
