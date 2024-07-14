import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-lecture-admin',
  templateUrl: './show-lecture-admin.component.html',
  styleUrls: ['./show-lecture-admin.component.css']
})
export class ShowLectureAdminComponent implements OnInit {

  constructor(
    private _title: Title,
    private _lecture: LectureService,
    private _rout: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private _router: Router,
    private _snack: MatSnackBar
  ) { }

  id = this._rout.snapshot.params['lId'];

  lecture: any = {
    lNo: '',

    course: {
      cTitle: ''
    }
  };

  video: any;
  ngOnInit(): void {

    this._lecture.getSingleLecture(this.id).subscribe(
      (data) => {
        this.lecture = data;
        this.video = this.sanitizeVideoUrl(this.lecture.lVideo);
        this._title.setTitle(this.lecture.lTitle + ' Lecture | Admin | CodeVenture');
      },
      (error) => {
        Swal.fire('Error', 'Error in Loading Lecture..!', 'error');
      }
    );
  }
  sanitizeVideoUrl(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  deleteLecture(lId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this Lecture",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#673ab7',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this._lecture.deleteLecture(lId).subscribe(
          (data) => {
            Swal.fire('Deleted.', 'Lecture is successfully deleted..', 'success')
              .then((e) => {
                this._router.navigate(['/profile/lectures/' + this.lecture.course.cId + '/' + this.lecture.course.cTitle]);
              });
          },
          (error) => {
            this._snack.open('Error in Deleting Lecture..', 'OK', {
              duration: 3000,
              verticalPosition: 'top'
            });
          }
        );
      }
    })
  }
}
