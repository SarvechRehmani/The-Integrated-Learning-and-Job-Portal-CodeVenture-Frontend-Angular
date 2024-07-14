import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { CourseService } from 'src/app/services/course.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-course-mentor',
  templateUrl: './add-course-mentor.component.html',
  styleUrls: ['./add-course-mentor.component.css']
})
export class AddCourseMentorComponent {

constructor(
  private _title:Title,
  private _snack: MatSnackBar,
  private _course:CourseService,
  private _login: LoginService
  ){}


course={
  cTitle:'',
  cDescription:'',
  field:'',
  totalLectures:'',
};

ngOnInit(): void {
  this._title.setTitle('Add Course | Mentor | CodeVenture');
  this.course.field = this._login.getUser().field;
}

formSubmit(){
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
  this._course.addCourse(this.course).subscribe(
    (data:any) => {
      Swal.fire('Added..!','Course is successfully added','success')
    },
    (error:any) => {
      this._snack.open('Something went wroung...','OK');
    }
  );
}
}
