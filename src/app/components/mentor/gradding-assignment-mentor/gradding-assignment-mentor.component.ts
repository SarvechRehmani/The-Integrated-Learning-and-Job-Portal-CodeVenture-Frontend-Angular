import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-gradding-assignment-mentor',
  templateUrl: './gradding-assignment-mentor.component.html',
  styleUrls: ['./gradding-assignment-mentor.component.css']
})
export class GraddingAssignmentMentorComponent implements OnInit{
  constructor(
    private _title:Title, 
    private _result:ResultService,
    private _snack:MatSnackBar,
    private _route:ActivatedRoute,
  ){}

  aId = this._route.snapshot.params['aId']; 

  assignments:any;
  ngOnInit(): void {
   
    this._result.getAssignmentResultByAId(this.aId).subscribe(
      (data) => {        
        this.assignments = data;
        console.log(this.assignments);
        this._title.setTitle('Gradding '+this.assignments[0].assignment.lecture.lTitle+' Assignments | Mentor | CodeVenture');
      },
      (error) => {
        this._snack.open('Error in loading Assignment..','OK',{
          duration:3000,
          verticalPosition:'top'
        })
      }
    );
  }

}
