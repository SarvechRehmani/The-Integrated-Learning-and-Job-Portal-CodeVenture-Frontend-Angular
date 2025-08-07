import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LectureService } from 'src/app/services/lecture.service';

@Component({
  selector: 'app-show-all-lectures-admin',
  templateUrl: './show-all-lectures-admin.component.html',
  styleUrls: ['./show-all-lectures-admin.component.css']
})
export class ShowAllLecturesAdminComponent implements OnInit {
  constructor(
    private _title: Title,
    private _router: ActivatedRoute,
    private _lecture: LectureService,
    private _snack: MatSnackBar
  ) { }

  cId = this._router.snapshot.params['cId'];
  cTitle = this._router.snapshot.params['cTitle'];

  lectures: any;

  ngOnInit(): void {
    this._title.setTitle(this.cTitle + ' Course | Admin | CodeVenture');

    this._lecture.getLectureByCourse(this.cId).subscribe(
      (data) => {
        this.lectures = data;
      },
      (error) => {
        this._snack.open('Error in loading Lectures...', "OK", {
          duration: 3000,
          verticalPosition: 'top'
        });
      });

  }
}