import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marks-lab-task-mentor',
  templateUrl: './marks-lab-task-mentor.component.html',
  styleUrls: ['./marks-lab-task-mentor.component.css']
})
export class MarksLabTaskMentorComponent implements OnInit {
  constructor(
    private _title:Title, 
    private _result: ResultService,
    private _snack: MatSnackBar,
    private _route: ActivatedRoute
  ) { }
  lId = this._route.snapshot.params['lId'];
  uId = this._route.snapshot.params['uId'];

  labTaskResult: any;
  username:any;

  user={
    id:this.uId,
  }

  ngOnInit(): void {
    this._result.getLabTaskResultByLIdAnsUId(this.lId, this.uId).subscribe(
      (data) => {
        console.log(data);
        
        this.labTaskResult = data;
        this.username = this.labTaskResult.user.username;
        delete this.labTaskResult['labTask']['lecture']['course'];
        delete this.labTaskResult['user'];
        this.labTaskResult['user'] = this.user;

        this._title.setTitle('Marking '+this.username+'\'s LabTask | Mentor | CodeVenture');
      },
      (error) => {
        this._snack.open('Error in Loading Submitted LabTask..', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        })
      }
    );
  }

  
  marks: any;

  submitMarks() {
    if (this.marks <= 0 || this.labTaskResult.labTask.maxMarks < this.marks) {
      this._snack.open('Marks should be between 0 - ' + this.labTaskResult.labTask.maxMarks + '.', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    this.labTaskResult.gotMarks = this.marks;
    this._result.submitMarksLabTask(this.labTaskResult).subscribe(
      (data) => {
        Swal.fire('Marks Assigned','Marks successfully assigned to the user','success');
      },
      (error) => {
        this._snack.open('Error in Assigning Marks..','OK',{
          duration:3000,
          verticalPosition:'top'
        });
      });
  }
}
