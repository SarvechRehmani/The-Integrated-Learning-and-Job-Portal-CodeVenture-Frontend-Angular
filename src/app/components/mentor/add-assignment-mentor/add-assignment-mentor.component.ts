import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-assignment-mentor',
  templateUrl: './add-assignment-mentor.component.html',
  styleUrls: ['./add-assignment-mentor.component.css'],
})
export class AddAssignmentMentorComponent {
  constructor(
    private _title: Title,
    private _course: CourseService,
    private _lecture: LectureService,
    private _assignment: AssignmentService,
    private _snack: MatSnackBar
  ) {}
  public Editor = ClassicEditor;

  courses: any;
  lectures: any;

  assignment = {
    aContent: '',
    maxMarks: '',
    lecture: {
      lId: '',
    },
  };

  ngOnInit(): void {
    this._title.setTitle('Add Assignment | Mentor | CodeVenture');
    this._course.getCoursesByUser().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        Swal.fire('Error', 'Error in loading Courses..!', 'error');
      }
    );
  }

  loadLectures(id: any) {
    if (id == '' || id == null) {
      this.lectures = [];
      return;
    }
    this._lecture.getLectureByCourseWithoutAssignment(id).subscribe(
      (data: any) => {
        this.lectures = data;
      },
      (error: any) => {
        Swal.fire('Error', 'Error in loading lectures', 'error');
      }
    );
  }

  addAssignments() {
    if (
      this.assignment.lecture.lId == '' ||
      this.assignment.lecture.lId == null
    ) {
      this._snack.open('Please Select Lectures...', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }
    if (
      parseInt(this.assignment.maxMarks) <= 0 ||
      this.assignment.maxMarks == ''
    ) {
      this._snack.open('Please enter correct maximum marks...', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    } else if (
      parseInt(this.assignment.maxMarks) < 10 ||
      parseInt(this.assignment.maxMarks) > 100
    ) {
      this._snack.open('Marks should be between 10 to 100..', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    this._assignment.addAssignment(this.assignment).subscribe(
      (data) => {
        Swal.fire(
          'Added',
          'Assignment is successfully added...',
          'success'
        ).then((e) => {
          this.lectures = [];
          this.assignment = {
            aContent: '',
            maxMarks: '',
            lecture: {
              lId: '',
            },
          };
        });
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Something went wroung...', 'error');
      }
    );
  }
}
