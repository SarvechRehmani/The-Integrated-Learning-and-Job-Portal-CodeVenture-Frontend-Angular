import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-gradding-lab-task-mentor',
  templateUrl: './gradding-lab-task-mentor.component.html',
  styleUrls: ['./gradding-lab-task-mentor.component.css']
})
export class GraddingLabTaskMentorComponent implements OnInit{
  constructor(
    private _title:Title, 
    private _result:ResultService,
    private _snack:MatSnackBar,
    private _route:ActivatedRoute,
    private _user:UserService
  ){}

  lId = this._route.snapshot.params['lId']; 

  labTasks:any;

  ngOnInit(): void {
    this._result.getLabTaskResultBylId(this.lId).subscribe(
      (data) => {
        this.labTasks=data;
        console.log(data);
        
        this._title.setTitle('Gradding '+this.labTasks[0].labTask.lecture.lTitle+' LabTasks | Mentor | CodeVenture');
      },
      (error) => {
        this._snack.open('Error in loading LabTasks..','OK',{
          duration:3000,
          verticalPosition:'top'
        })
      }
    );
  }
}
