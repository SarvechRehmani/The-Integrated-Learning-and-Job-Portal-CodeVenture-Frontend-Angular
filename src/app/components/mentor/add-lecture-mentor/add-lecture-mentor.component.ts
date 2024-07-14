import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-lecture-mentor',
  templateUrl: './add-lecture-mentor.component.html',
  styleUrls: ['./add-lecture-mentor.component.css']
})
export class AddLectureMentorComponent implements OnInit{
  constructor(
    private _title:Title,
    private _course: CourseService,
    private _lecture: LectureService
    ) { }

  courses: any;

  ngOnInit(): void {
    this._title.setTitle('Add Lecture | Mentor | CodeVenture');

    this._course.getCoursesByUser().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        Swal.fire('Error', 'Error in Loading Courses', 'error');
      }
    );
  }

  public Editor = ClassicEditor;

  public lecture = {
    lNo: '',
    lTitle: '',
    lDescription: '',
    lVideo: '',
    course:{
      cId:''
    }
  }

  formSubmit() {
    this._lecture.addLecture(this.lecture).subscribe(
      (data) => {
        Swal.fire('Added','Lecture Succesfully added..!','success');
        this.lecture = {
          lNo: '',
          lTitle: '',
          lDescription: '',
          lVideo: '',
          course: {
            cId:''
          },
        }
      },
      (error) => {
        Swal.fire('Error','Something went wroung. try again..!','error');
      }
    );
  }
}
