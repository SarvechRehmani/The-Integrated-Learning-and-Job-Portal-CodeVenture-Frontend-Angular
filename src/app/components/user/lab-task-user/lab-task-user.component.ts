import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { LabTaskService } from 'src/app/services/lab-task.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-lab-task-user',
  templateUrl: './lab-task-user.component.html',
  styleUrls: ['./lab-task-user.component.css']
})
export class LabTaskUserComponent implements OnInit{
  constructor(
    private _title:Title,
    private _labTask:LabTaskService,
    private _snack: MatSnackBar,
    private _login:LoginService
    ){}
    labTasks:any;
  ngOnInit(): void {
    let field = this._login.getUser().field;
    this._title.setTitle('LabTasks | CodeVenture');
    this._labTask.getLabTasksByField(field).subscribe(
      (data) => {
        console.log(data)
        this.labTasks = data;
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