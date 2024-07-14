import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AssignmentService } from 'src/app/services/assignment.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-submit-assignment-user',
  templateUrl: './submit-assignment-user.component.html',
  styleUrls: ['./submit-assignment-user.component.css']
})
export class SubmitAssignmentUserComponent implements OnInit{
  public Editor = ClassicEditor;

  constructor(
    private _title: Title,
    private _assignment:AssignmentService,
    private _snack:MatSnackBar,
    private _router:ActivatedRoute,
    private _result:ResultService
  ){}

  lId = this._router.snapshot.params['lId'];

  assignment:any;

  result:any;

  ngOnInit(): void {
    this.loadAssignment();
    
  }

  loadAssignment(){
    this._assignment.getAssignmentByLecture(this.lId).subscribe(
      (data:any) => {
        console.log(data)
        this.assignment = data;
        this._title.setTitle('Submit '+this.assignment.lecture.lTitle + ' Assignment | CodeVenture');
        delete this.assignment['lecture']['course']['user'];
        this._result.getAssignmentResult(this.assignment.aId).subscribe(
          (data) => {
            this.result = data;
            console.log(this.result);
          }
        );

      },
      (error) => {
        this._snack.open('Error in Loading Assignment..','OK',{
          duration:3000,
          verticalPosition:'top'
        })
      }
    );
  }
  
  submitAssignmentForm(){
    this._result.submitAssignment(this.assignment).subscribe(
      (data) => {
        this.result = data;
        Swal.fire('Submitted.','Assignment is Successfully Submitted.','success');
      },
      (error) => {
        Swal.fire('Error','Error in submitting Assignment.','error');
      }
    );
  }
}
