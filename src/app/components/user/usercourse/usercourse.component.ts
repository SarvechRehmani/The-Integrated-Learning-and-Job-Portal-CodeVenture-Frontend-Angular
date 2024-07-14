import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { CourseService } from 'src/app/services/course.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-usercourse',
  templateUrl: './usercourse.component.html',
  styleUrls: ['./usercourse.component.css']
})
export class UsercourseComponent implements OnInit{

  constructor(
    private _title: Title,
    private _course:CourseService,
    private _snack:MatSnackBar,
    private _login:LoginService
  ){}
  courses:any;

  ngOnInit(): void {
    let field = this._login.getUser().field;
    console.log(field);
    this._title.setTitle('Courses | CodeVenture');
    this._course.getCoursesByField(field).subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        this._snack.open('Error in Loading Courses..','OK',{
          duration:3000,
          verticalPosition:'top'
        });
      }
    );
  }

  

  

}