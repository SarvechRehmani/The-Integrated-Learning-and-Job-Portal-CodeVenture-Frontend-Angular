import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LectureService } from 'src/app/services/lecture.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-show-course-user',
  templateUrl: './show-course-user.component.html',
  styleUrls: ['./show-course-user.component.css']
})
export class ShowCourseUserComponent implements OnInit{
  constructor(
    private _title:Title,
    private _router:ActivatedRoute,
    private _lecture:LectureService,
    private _snack:MatSnackBar,
    private _login:LoginService
    ){}

    cId = this._router.snapshot.params['cId'];
    cTitle= this._router.snapshot.params['cTitle'];

    lectures:any;

  ngOnInit(): void {
    let field = this._login.getUser().field;
    this._title.setTitle('Lectures | CodeVenture');
    if(this.cId){
      this._lecture.getLectureByCourse(this.cId).subscribe(
        (data) => {
          this.lectures = data;
        },
        (error) => {
          this._snack.open('Error in loading Lectures...',"OK",{
            duration:3000,
            verticalPosition:'top'
          });
        }
      );
    }else{
      this._lecture.getLecturesByField(field).subscribe(
        (data) => {
          this.lectures = data;
        },
        (error) => {
          this._snack.open('Error in loading Lectures...',"OK",{
            duration:3000,
            verticalPosition:'top'
          });
        }
      );
    }
    
  }}