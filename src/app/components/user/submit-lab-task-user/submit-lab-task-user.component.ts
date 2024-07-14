import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LabTaskService } from 'src/app/services/lab-task.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-submit-lab-task-user',
  templateUrl: './submit-lab-task-user.component.html',
  styleUrls: ['./submit-lab-task-user.component.css']
})
export class SubmitLabTaskUserComponent implements OnInit{
  public Editor = ClassicEditor;

  constructor(
    private _title: Title,
    private _labTask:LabTaskService,
    private _snack:MatSnackBar,
    private _router:ActivatedRoute,
    private _result:ResultService
  ){}

  lId = this._router.snapshot.params['lId'];

  labTask:any;

  result:any;

  ngOnInit(): void {
    this.loadLabTask();
  }

  loadLabTask(){
    this._labTask.getLabTaskByLecture(this.lId).subscribe(
      (data:any) => {
        console.log(data)
        this.labTask = data;
        this._title.setTitle('Submit '+this.labTask.lecture.lTitle + ' LabTask | CodeVenture');
        delete this.labTask['lecture']['course']['user'];
        this._result.getLabTaskResult(this.labTask.labId).subscribe(
          (data) => {
            this.result = data;
            console.log(this.result);
          }
        );

      },
      (error) => {
        this._snack.open('Error in Loading LabTask..','OK',{
          duration:3000,
          verticalPosition:'top'
        })
      }
    );
  }
  
  submitLabTaskForm(){
    this._result.submitLabTask(this.labTask).subscribe(
      (data) => {
        this.result = data;
        Swal.fire('Submitted.','LabTask is Successfully Submitted.','success');
      },
      (error) => {
        Swal.fire('Error','Error in submitting LabTask.','error');
      }
    );
  }
}
