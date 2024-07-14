import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-lecture',
  templateUrl: './update-lecture.component.html',
  styleUrls: ['./update-lecture.component.css']
})
export class UpdateLectureComponent implements OnInit {
  constructor(
    private _title:Title,
    private _rout: ActivatedRoute,
    private _lecture: LectureService,
    private _course: CourseService,
    private _snack: MatSnackBar,
    private _router: Router
  ) { }

  public Editor = ClassicEditor;
  id = this._rout.snapshot.params['id'];
  courses: any;

  public lecture = {
    lId:'',
    lNo:'',
    lTitle:'',
    lDescription:'',
    lVideo:'',
    course:{
      cId:''
    }
  };
 

  ngOnInit(): void {
    this._lecture.getSingleLectureUser(this.id).subscribe(
      (data:any) => {
        this.lecture.lId = data.lId;
        this.lecture.lNo = data.lNo;
        this.lecture.lTitle = data.lTitle;
        this.lecture.lDescription = data.lDescription;
        this.lecture.lVideo = data.lVideo;
        this.lecture.course.cId = data.course.cId;

        
        this._title.setTitle('Update '+this.lecture.lTitle+' Lecture | Mentor | CodeVenture');
      },
      (error) => {
        Swal.fire('Error', 'Error in Loading Lecture', 'error');
      }
    );

    this._course.getCoursesByUser().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        Swal.fire('Error', 'Error in Loading Courses', 'error');
      }
    );
  }

  formSubmit() {
    this._lecture.updateLecture(this.lecture).subscribe(
      (data) => {
        Swal.fire('Updated', 'Lecture Succesfully updated..!', 'success')
          .then(
            (e) => {
              this._router.navigate(['/mentor/lectures']);
            }
          );
      },
      (error) => {
        Swal.fire('Error', 'Something went wroung. try again..!', 'error');
      }
    );
  }

}
