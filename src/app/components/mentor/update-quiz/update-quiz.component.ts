import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
  constructor (
    private _title:Title,
    private _lecture:LectureService,
    private _course:CourseService, 
    private _snack:MatSnackBar,
    private _quiz:QuizService,
    private _rout:ActivatedRoute
  ) {}

  id = this._rout.snapshot.params['id'];

  courses:any;
  lectures:any;

  quiz = {
    qId:'',
    qTitle:'',
    qDescription:'',
    maxMarks:'',
    numberOfQuestions:'',
    lecture:{
      lId:'',
      course:{
        cId:''
      }
    }
  };

  course = {
    cId:''
  }

  ngOnInit(): void {
    this.loadCourses();
    this._quiz.getSingleQuiz(this.id).subscribe(
      (data:any) => {
        this.quiz.qId = data.qId;
        this.quiz.qTitle = data.qTitle;
        this.quiz.qDescription = data.qDescription;
        this.quiz.maxMarks = data.maxMarks;
        this.quiz.numberOfQuestions = data.numberOfQuestions;
        this.quiz.lecture.lId = data.lecture.lId;
        this.quiz.lecture.course.cId = data.lecture.course.cId;
        this.course.cId =  this.quiz.lecture.course.cId
        this.loadLectures(this.course.cId);

        
        this._title.setTitle('Update '+this.quiz.qTitle+' Quiz | Mentor | CodeVenture');
      },
      (error) => {
        Swal.fire('Error','Error in loading Quiz','error');
      }
    );
  }

  loadCourses(){
    this._course.getCoursesByUser().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        Swal.fire('Error', 'Error in loading Courses..!', 'error');
      }
    );
  }

  loadLectures(id:any){
    if (id == '' || id == null) {
      this.lectures = [];
      return;
    }
    this._lecture.getLectureByCourse(id).subscribe(
      (data) => {
        this.lectures = data;
      },
      (error) => {
        Swal.fire('Error', 'Error in loading lectures...', 'error');
      });
  }
  updateQuiz(){
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

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire('Updated','Quiz is successfully updated...','success');
      },
      (error) => {
        console.log(error)
        Swal.fire('Error','Something went wroung...','error');
      }
    );
  }
}
