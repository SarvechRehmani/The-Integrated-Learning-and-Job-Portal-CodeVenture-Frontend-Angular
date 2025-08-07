import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LabTaskService } from 'src/app/services/lab-task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-labtask-admin',
  templateUrl: './show-labtask-admin.component.html',
  styleUrls: ['./show-labtask-admin.component.css']
})
export class ShowLabtaskAdminComponent implements OnInit{
  constructor(
    private _title:Title,
    private _labTask:LabTaskService,
    private _rout: ActivatedRoute,
    private _router: Router,
    private _snack:MatSnackBar
  ){}

  id = this._rout.snapshot.params['lId'];
  labTask:any = {};
  lecture:any = {}
  course:any = {}


  ngOnInit(): void {
    this._labTask.getLabTaskByLecture(this.id).subscribe(
      (data) => {
        console.log(data)
        this.labTask = data;
        this.lecture = this.labTask.lecture;
        this.course = this.lecture.course;

        this._title.setTitle(this.labTask.lecture.lTitle+'\'s lecture LabTask | Mentor | CodeVenture');
      },
      (error) => {
        Swal.fire('Error','Error in loading lectures..','error').then(
          (e) => {
            this._router.navigate(['/mentor/lectures'])
          }
        );
      }
     );
  }

  deleteAssignment(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this Lab Task",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#673ab7',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this._labTask.deleteLabTask(id).subscribe(
          (success) => {
            Swal.fire('Deleted','Lab Task is successfully deleted..','success').then(
              (e) => {
                this._router.navigate(['/profile/lectures/'+this.course.cId+'/'+this.course.cTitle]);
              }
            );
          },
          (error) => {
            this._snack.open('Something went wroung..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000
            });
          }
        );
      }
    })

  }

}
