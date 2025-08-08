import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-all-lectures-admin',
  templateUrl: './show-all-lectures-admin.component.html',
  styleUrls: ['./show-all-lectures-admin.component.css'],
})
export class ShowAllLecturesAdminComponent implements OnInit {
  constructor(
    private _title: Title,
    private _router: ActivatedRoute,
    private _lecture: LectureService,
    private _snack: MatSnackBar
  ) {}

  cId = this._router.snapshot.params['cId'];
  cTitle = this._router.snapshot.params['cTitle'];

  lectures: any;
  originalLectures: any;

  ngOnInit(): void {
    this._title.setTitle(this.cTitle + ' Course | Admin | CodeVenture');

    this._lecture.getLectureByCourse(this.cId).subscribe(
      (data) => {
        this.originalLectures = data;
        this.lectures = structuredClone(data);
      },
      (error) => {
        this._snack.open('Error in loading Lectures...', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
  }
  deleteLecture(id: any) {
    const isDark = document.documentElement.classList.contains('dark');
    Swal.fire({
      title: 'Delete Lecture?',
      text: 'This action cannot be undone',
      icon: 'question',
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f3f4f6' : '#1f2937',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#10b981',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      backdrop: `
        rgba(0,0,0,0.4)
        center top
        no-repeat
      `,
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
      customClass: {
        popup: `!rounded-2xl !shadow-xl !border-8 ${
          isDark ? '!border !border-emerald-600' : '!border !border-emerald-400'
        }`,
        confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
        cancelButton: '!rounded-xl !shadow-md hover:!shadow-lg',
        actions: '!gap-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._lecture.deleteLecture(id).subscribe({
          next: (success) => {
            this._snack.open('Lecture deleted successfully', 'Close', {
              duration: 3000,
              panelClass: ['success-mentor-snackbar'],
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            this.lectures = this.lectures.filter(
              (lecture: any) => lecture.lId != id
            );
          },
          error: (error) => {
            this._snack.open('Failed to delete lecture', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
          },
        });
      }
    });
  }
  searchQuery: any;
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
