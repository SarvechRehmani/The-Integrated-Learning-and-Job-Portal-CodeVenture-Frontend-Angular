import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-assignment-mentor',
  templateUrl: './update-assignment-mentor.component.html',
  styleUrls: ['./update-assignment-mentor.component.css']
})
export class UpdateAssignmentMentorComponent implements OnInit{
  public Editor = ClassicEditor;

  constructor(
    private _title:Title,
    private _rout: ActivatedRoute,
    private _course: CourseService,
    private _lecture: LectureService,
    private _assignment: AssignmentService,
    private _snack: MatSnackBar,
    private _router: Router

  ){}

  id = this._rout.snapshot.params['id'];

  courses: any;
  lectures: any;
  public assignment = {
    aId:'',
    aContent:'',
    maxMarks:'',
    totalLectures:'',
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
    
    this._title.setTitle('Update Assignment | Mentor | CodeVenture');
    
    this.loadCourses();
    this._assignment.getSingleAssignment(this.id).subscribe(
      (data:any) => {
        console.log(data);
        
        this.assignment.aId = data.aId;
        this.assignment.aContent = data.aContent;
        this.assignment.maxMarks = data.maxMarks;
        this.assignment.totalLectures = data.totalLectures;
        this.assignment.lecture.lId = data.lecture.lId;
        this.assignment.lecture.course.cId = data.lecture.course.cId;
        this.course.cId =  this.assignment.lecture.course.cId 
        this.loadLectures(this.course.cId);
      },
      (error) => {
        Swal.fire('Error','Error in loading assignment..!','error');
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
  loadLectures(id: any) {

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


  
  addAssignments() {
    if(this.assignment.lecture.lId == '' || this.assignment.lecture.lId == null){
      this._snack.open('Please Select Lectures...','OK',{
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    } 
    if(parseInt(this.assignment.maxMarks) <=0 || this.assignment.maxMarks == ''){
      this._snack.open('Please enter correct maximum marks...','OK',{
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }else if(parseInt(this.assignment.maxMarks) < 10 || parseInt(this.assignment.maxMarks) > 100){
      this._snack.open('Marks should be between 10 to 100..','OK',{
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    this._assignment.updateAssignment(this.assignment).subscribe(
      (data) => {
        Swal.fire('Updated','Assignment is successfully updated...','success').then(
          (e) => {
            this._router.navigate(['/mentor/assignments'])
          }
        );
      },
      (error) => {
        Swal.fire('Error','Something went wroung...','error');
      }
    );
  }

}
