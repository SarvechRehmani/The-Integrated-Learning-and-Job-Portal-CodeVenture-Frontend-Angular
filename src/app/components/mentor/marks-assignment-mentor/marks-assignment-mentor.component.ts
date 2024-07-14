import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marks-assignment-mentor',
  templateUrl: './marks-assignment-mentor.component.html',
  styleUrls: ['./marks-assignment-mentor.component.css']
})
export class MarksAssignmentMentorComponent implements OnInit {
  constructor(
    private _title:Title, 
    private _result: ResultService,
    private _snack: MatSnackBar,
    private _route: ActivatedRoute
  ) { }

  aId = this._route.snapshot.params['aId'];
  uId = this._route.snapshot.params['uId'];

  assignmentResult: any;
  username:any;

  user={
    id:this.uId,
  }
  ngOnInit(): void {
    this._result.getAssignmentResultByAIdAnsUId(this.aId, this.uId).subscribe(
      (data) => {
        this.assignmentResult = data;
        this.username = this.assignmentResult.user.username;
        delete this.assignmentResult['assignment']['lecture']['course'];
        delete this.assignmentResult['user'];
        this.assignmentResult['user'] = this.user;

        this._title.setTitle('Marking '+this.username+'\'s Assignments | Mentor | CodeVenture');
      },
      (error) => {
        this._snack.open('Error in Loading Submitted Assignment..', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        })
      }
    );
  }

  marks: any;

  submitMarks() {
    if (this.marks <= 0 || this.assignmentResult.assignment.maxMarks < this.marks) {
      this._snack.open('Marks should be between 0 - ' + this.assignmentResult.assignment.maxMarks + '.', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    this.assignmentResult.gotMarks = this.marks;
    this._result.submitMarksAssignment(this.assignmentResult).subscribe(
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
