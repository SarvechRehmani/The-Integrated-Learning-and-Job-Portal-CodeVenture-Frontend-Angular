import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CourseService } from 'src/app/services/course.service';
import { LabTaskService } from 'src/app/services/lab-task.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-lab-task-mentor',
  templateUrl: './update-lab-task-mentor.component.html',
  styleUrls: ['./update-lab-task-mentor.component.css']
})
export class UpdateLabTaskMentorComponent implements OnInit{
  public Editor = ClassicEditor;

  constructor(
    private _title:Title,
    private _rout: ActivatedRoute,
    private _course: CourseService,
    private _lecture: LectureService,
    private _labTask: LabTaskService,
    private _snack: MatSnackBar,
    private _router: Router

  ) { }
  id = this._rout.snapshot.params['id'];
  courses: any;
  lectures: any;
  public labTask = {
    labId: '',
    labContent: '',
    maxMarks: '',
    lecture: {
      lId: '',
      course: {
        cId: ''
      }
    }
  };
  course = {
    cId: ''
  }
  ngOnInit(): void {
    
    this._title.setTitle('Update LabTask | Mentor | CodeVenture');
    this.loadCourses();
    this._labTask.getSingleLabTaskUser(this.id).subscribe(
      (data:any) => {
        this.labTask.labId = data.labId;
        this.labTask.labContent = data.labContent;
        this.labTask.maxMarks = data.maxMarks;
        this.labTask.lecture.lId = data.lecture.lId;
        this.labTask.lecture.course.cId = data.lecture.course.cId;
        this.course.cId =  this.labTask.lecture.course.cId 
        this.loadLectures(this.course.cId);
      },
      (error) => {
        Swal.fire('Error','Error in loading Lab Task..!','error');
      }
    );
  }



  loadCourses() {
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


  updateLabTask() {
    if(this.labTask.lecture.lId == '' || this.labTask.lecture.lId == null){
      this._snack.open('Please Select Lectures...','OK',{
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    } 
    if(parseInt(this.labTask.maxMarks) <=0 || this.labTask.maxMarks == ''){
      this._snack.open('Please enter correct maximum marks...','OK',{
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }else if(parseInt(this.labTask.maxMarks) < 10 || parseInt(this.labTask.maxMarks) > 100){
      this._snack.open('Marks should be between 10 to 100..','OK',{
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    this._labTask.updateLabTask(this.labTask).subscribe(
      (data) => {
        Swal.fire('Updated','Lab Task is successfully updated...','success').then(
          (e) => {
            this._router.navigate(['/mentor/labtasks'])
          }
        );
      },
      (error) => {
        Swal.fire('Error','Something went wroung...','error');
      }
    );
  }

}
