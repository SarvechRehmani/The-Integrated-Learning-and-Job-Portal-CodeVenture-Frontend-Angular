import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LabTaskService } from 'src/app/services/lab-task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-all-lab-task-mentor',
  templateUrl: './show-all-lab-task-mentor.component.html',
  styleUrls: ['./show-all-lab-task-mentor.component.css'],
})
export class ShowAllLabTaskMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _labTask: LabTaskService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}
  labTasks: any;
  originalLabTasks: any;
  ngOnInit(): void {
    this._title.setTitle('LabTasks | Mentor | CodeVenture');
    this._labTask.getLabTaskByUserCourses().subscribe(
      (data: any) => {
        this.labTasks = data;
        this.originalLabTasks = structuredClone(this.labTasks);
      },
      (error) => {
        Swal.fire('Error', 'Error in loading lectures..', 'error');
      }
    );
  }

  deleteLabTask(id: any) {
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
        this._labTask.deleteLabTask(id).subscribe(
          (success) => {
            Swal.fire(
              'Deleted',
              'Lab Task is successfully deleted..',
              'success'
            );
            this.labTasks = this.labTasks.filter(
              (labTask: any) => labTask.labId != id
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
  onSearchLabtask() {
    if (this.searchQuery === '') {
      // reload all lectures again
      this.labTasks = this.originalLabTasks;
      return;
    }

    const filtered = this.originalLabTasks.filter((assignment: any) =>
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

    this.labTasks = filtered;
  }
}
