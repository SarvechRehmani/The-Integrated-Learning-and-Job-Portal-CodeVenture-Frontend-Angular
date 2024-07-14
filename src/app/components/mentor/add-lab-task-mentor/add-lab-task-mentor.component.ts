import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CourseService } from 'src/app/services/course.service';
import { LabTaskService } from 'src/app/services/lab-task.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-lab-task-mentor',
  templateUrl: './add-lab-task-mentor.component.html',
  styleUrls: ['./add-lab-task-mentor.component.css']
})
export class AddLabTaskMentorComponent implements OnInit{
  constructor(
    private _title:Title, 
    private _course: CourseService,
    private _lecture: LectureService,
    private _labtask:LabTaskService,
    private _snack: MatSnackBar
  ) { }
  public Editor = ClassicEditor;

  courses: any;
  lectures: any;

  labTask = {
    labContent: '',
    maxMarks: '',
    lecture: {
      lId: ''
    }
  };

  ngOnInit(): void {
    this._title.setTitle('Add Lab Task | Mentor | CodeVenture');

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
    this._lecture.getLectureByCourseWithoutLabTask(id).subscribe(
      (data) => {
        this.lectures = data;
      },
      (error) => {
        Swal.fire('Error', 'Error in loading lectures', 'error');
      });
  }

  addLabTask() {
    if (this.labTask.lecture.lId == '' || this.labTask.lecture.lId == null) {
      this._snack.open('Please Select Lectures...', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    if (parseInt(this.labTask.maxMarks) <= 0 || this.labTask.maxMarks == '') {
      this._snack.open('Please enter correct maximum marks...', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    } else if (parseInt(this.labTask.maxMarks) < 10 || parseInt(this.labTask.maxMarks) > 100) {
      this._snack.open('Marks should be between 10 to 100..', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    this._labtask.addLabTask(this.labTask).subscribe(
      (data) => {
        Swal.fire('Added', 'Lab Task is successfully added...', 'success').then(
          (e) => {
            this.lectures = [];
            this.labTask = {
              labContent: '',
              maxMarks: '',
              lecture: {
                lId: ''
              }
            }
          }
        );
      },
      (error) => {
        console.log(error)
        Swal.fire('Error', 'Something went wroung...', 'error');
      }
    );
  }
}
