import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-all-lectures',
  templateUrl: './show-all-lectures.component.html',
  styleUrls: ['./show-all-lectures.component.css'],
})
export class ShowAllLecturesComponent implements OnInit {
  constructor(
    private _title: Title,
    private _lecture: LectureService,
    private _snack: MatSnackBar,
    private _rout: ActivatedRoute
  ) {}

  lectures: any;
  originalLectures: any;
  cId = this._rout.snapshot.params['cId'];
  cTitle = this._rout.snapshot.params['cTitle'];
  searchQuery: string = '';

  ngOnInit(): void {
    this._title.setTitle('Lectures | Mentor | CodeVenture');
    if (this.cId) {
      this._lecture.getAllLecturesByUserOfUser(this.cId).subscribe(
        (data) => {
          this.originalLectures = data;
          this.lectures = structuredClone(this.originalLectures);
        },
        (error) => {
          Swal.fire('Error', 'Error in Loading Lectures', 'error');
        }
      );
    } else {
      this._lecture.getAllLecturesByUser().subscribe(
        (data) => {
          this.originalLectures = data;
          this.lectures = structuredClone(this.originalLectures);
        },
        (error) => {
          Swal.fire('Error', 'Error in Loading Lectures', 'error');
        }
      );
    }
  }

  deleteLecture(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this Lecture',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#673ab7',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this._lecture.deleteLecture(id).subscribe(
          (success) => {
            this._snack.open('Lecture has been deleted..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000,
            });
            this.lectures = this.lectures.filter(
              (lecture: any) => lecture.lId != id
            );
          },
          (error) => {
            this._snack.open('Error in deleting Lecture. try again..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        );
      }
    });
  }

  onSearchLecture() {
    if (this.searchQuery === '') {
      // reload all lectures again
      console.log(this.lectures);
      console.log(this.originalLectures);

      this.lectures = this.originalLectures;
      return;
    }

    const filtered = this.originalLectures.filter((lecture: any) =>
      lecture.lTitle.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (filtered.length === 0) {
      this._snack.open('No lectures found.', 'Ok', {
        verticalPosition: 'top',
        duration: 3000,
      });
    }

    this.lectures = filtered;
  }
}
