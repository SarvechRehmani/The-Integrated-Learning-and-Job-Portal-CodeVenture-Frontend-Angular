import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-assignments-user',
  templateUrl: './assignments-user.component.html',
  styleUrls: ['./assignments-user.component.css']
})
export class AssignmentsUserComponent implements OnInit{
  constructor(
    private _title:Title,
    private _assignment:AssignmentService,
    private _snack: MatSnackBar,
    private _login:LoginService
    ){}
    assignments:any;
  ngOnInit(): void {
    let field = this._login.getUser().field;
    this._title.setTitle('Assignments | CodeVenture');
    this._assignment.getAssignmentByField(field).subscribe(
      (data) => {
        console.log(data)
        this.assignments = data;
      },
      (error) => {
        this._snack.open('Error in loading assignments..','OK',{
          duration:3000,
          verticalPosition:'top'
        })
      }
    );
  }

  

}