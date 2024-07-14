import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  constructor(
    private _title:Title,
    private _course: CourseService, 
    private _rout: ActivatedRoute, 
    private _router: Router,
    private _snack:MatSnackBar
    ) { }

  id = this._rout.snapshot.params['id'];
  course = {
    cId:'',
    cTitle:'',
    cDescription:'',
    field:'',
    totalLectures:''
  }

  ngOnInit(): void {
    this._course.getSingleCourseUser(this.id).subscribe(
      (data:any) => {
        this.course.cId = data.cId;
        this.course.cTitle = data.cTitle;
        this.course.cDescription = data.cDescription;
        this.course.field = data.field;
        this.course.totalLectures = data.totalLectures;

        
        this._title.setTitle('Update '+this.course.cTitle+' Course | Mentor | CodeVenture');
      },
      (error) => {
        Swal.fire('Error', 'Something went wroung..', 'error').then(
          (e) => {
            this._router.navigate(['/mentor/courses'])
          }
        );
      }
    );
  }

  formSubmit() {
    if(this.course.cTitle == '' || this.course.cTitle == null){
      this._snack.open('Course Title can not be blank..','OK',{
        duration:3000,
        verticalPosition:'top'
      });
      return;
    }else if(this.course.totalLectures == '' || parseInt(this.course.totalLectures) == 0 || parseInt(this.course.totalLectures) < 0){
      this._snack.open('Please enter a valid number of total lectures..','OK',{
        duration:3000,
        verticalPosition:'top'
      });
      return;
    }
    this._course.updateCourse(this.course).subscribe(
      (data) => {
        Swal.fire('Updated..','Course is successfully updated..','success').then(
          (e)=>{
            this._router.navigate(['/mentor/courses'])
          }
        );
      },
      (error) => {
        Swal.fire('Error', 'Something went wroung..', 'error').then(
          (e) => {
            this._router.navigate(['/mentor/courses'])
          }
        );
      }
    );
  }

}
