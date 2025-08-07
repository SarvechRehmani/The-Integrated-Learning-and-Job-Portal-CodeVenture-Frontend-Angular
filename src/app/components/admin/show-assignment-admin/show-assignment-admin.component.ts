import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-assignment-admin',
  templateUrl: './show-assignment-admin.component.html',
  styleUrls: ['./show-assignment-admin.component.css']
})
export class ShowAssignmentAdminComponent implements OnInit {
  constructor(
    private _title:Title,
    private _assignment:AssignmentService,
    private _rout: ActivatedRoute,
    private _router: Router,
    private _snack:MatSnackBar
  ){}

  id = this._rout.snapshot.params['lId'];

  assignment:any = {};
  lecture:any = {}
  course:any = {}

  ngOnInit(): void {
   this._assignment.getAssignmentByLecture(this.id).subscribe(
    (data) => {
      console.log(data)
      this.assignment = data;
      this.lecture = this.assignment.lecture;
      this.course = this.lecture.course;

      this._title.setTitle(this.assignment.lecture.lTitle+'\'s lecture Assignment | Admin | CodeVenture');
    },
    (error) => {
      Swal.fire('Error','Error in loading Assignment..','error');
    }
   );
  }


  deleteAssignment(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this Assignment",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#673ab7',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this._assignment.deleteAssignment(id).subscribe(
          (success) => {
            Swal.fire('Deleted','Assignment is successfully deleted..','success').then(
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
