import { Component, OnInit, ɵbypassSanitizationTrustHtml } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { LectureService } from 'src/app/services/lecture.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-lecture-user',
  templateUrl: './show-lecture-user.component.html',
  styleUrls: ['./show-lecture-user.component.css']
})
export class ShowLectureUserComponent implements OnInit {

  constructor(
    private _title:Title, 
    private _router: ActivatedRoute,
    private _lecture: LectureService,
    private _snack: MatSnackBar,
    private _sanitizer: DomSanitizer
  ) {

  }
  lId = this._router.snapshot.params['lId'];
  lecture: any;
  courseId:any;
  video: any;
  ngOnInit(): void {
    this._lecture.getSingleLecture(this.lId).subscribe(
      (data) => {
        this.lecture = data;
        this.courseId = this.lecture.course.cId;
        this.loadLengthOfLecture();
        this._title.setTitle(this.lecture.lTitle+' Lecture | CodeVenture');
        this.video = this.sanitizeVideoUrl(this.lecture.lVideo);
      },
      (error) => {
        this._snack.open('Error in loading lecture..', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    );
  }
  sanitizeVideoUrl(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  lengthLecture:any;
  loadLengthOfLecture(){
    this._lecture.countLectureOfCourse(this.courseId).subscribe(
      (data) => {
        this.lengthLecture = data;
        
      }
    );
  }

  loadPrevious(lNo: any) {
    if(lNo <= 0){
      this._snack.open('0 Lecture is not available..','OK',{
        duration:3000,
        verticalPosition:'top'
      });
      return;
    }
    this._lecture.getSingleLectureByCourseAndLNo(this.lecture.course.cId, lNo).subscribe(
      (data: any) => {
        this.lecture = data;
      },
      (error: any) => {

      }
    )
  }

  loadNext(lNo: any) {
    this._lecture.getSingleLectureByCourseAndLNo(this.lecture.course.cId, lNo).subscribe(
      (data: any) => {
        this.lecture = data;
        this.video = this.sanitizeVideoUrl(this.lecture.lVideo);
      },
      (error: any) => {
        this._snack.open('Error in loading lecture..', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    );
  }
}