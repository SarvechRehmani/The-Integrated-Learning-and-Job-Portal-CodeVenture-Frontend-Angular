import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses-mentor',
  templateUrl: './courses-mentor.component.html',
  styleUrls: ['./courses-mentor.component.css'],
})
export class CoursesMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _course: CourseService,
    private _snack: MatSnackBar,
    private _lecture: LectureService
  ) {}

  courses: any;

  ngOnInit(): void {
    this._title.setTitle('Courses | Mentor | CodeVenture');

    this._course.getCoursesByUser().subscribe(
      (data) => {
        this.courses = data;
        console.log(data);
        this.loadLectureLength();
      },
      (error) => {
        Swal.fire('Error', 'Something went wroung..', 'error');
      }
    );
  }

  deleteCourse(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this Course',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#673ab7',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this._course.deleteCourse(id).subscribe(
          (success) => {
            this._snack.open('Course has been deleted..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000,
            });
            this.courses = this.courses.filter(
              (course: any) => course.cId != id
            );
          },
          (error) => {
            this._snack.open('Something went wroung..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        );
      }
    });
  }

  loadLectureLength() {
    this.courses.forEach((course: any) => {
      this._lecture.countLectureOfCourse(course.cId).subscribe((data: any) => {
        course.lectureLength = data;
      });
    });
  }
}
