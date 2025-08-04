import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-all-assignments',
  templateUrl: './show-all-assignments.component.html',
  styleUrls: ['./show-all-assignments.component.css'],
})
export class ShowAllAssignmentsComponent implements OnInit {
  constructor(
    private _title: Title,
    private _assignment: AssignmentService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}

  assignments: any;
  orignalAssignments: any;

  ngOnInit(): void {
    this._title.setTitle('Assignments | Mentor | CodeVenture');

    this._assignment.getAssignmentByUserCourse().subscribe(
      (data: any) => {
        this.assignments = data;
        this.orignalAssignments = structuredClone(this.assignments);
      },
      (error) => {
        Swal.fire('Error', 'Error in loading lectures..', 'error');
      }
    );
  }

  deleteAssignment(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this Assignment',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#673ab7',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this._assignment.deleteAssignment(id).subscribe(
          (success) => {
            Swal.fire(
              'Deleted',
              'Assignment is successfully deleted..',
              'success'
            );
            this.assignments = this.assignments.filter(
              (assignment: any) => assignment.aId != id
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
  searchQuery: string = '';
  onSearchAssignment() {
    if (this.searchQuery === '') {
      // reload all lectures again
      this.assignments = this.orignalAssignments;
      return;
    }

    const filtered = this.orignalAssignments.filter((assignment: any) =>
      assignment.lecture.lTitle
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );

    if (filtered.length === 0) {
      this._snack.open('No assignments found.', 'Ok', {
        verticalPosition: 'top',
        duration: 3000,
      });
    }

    this.assignments = filtered;
  }
}
