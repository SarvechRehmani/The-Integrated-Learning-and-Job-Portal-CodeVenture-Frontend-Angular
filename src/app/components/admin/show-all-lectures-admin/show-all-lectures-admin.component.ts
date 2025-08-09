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
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
    };

    this._title.setTitle(this.cTitle + ' Course | Admin | CodeVenture');

    this._lecture.getLectureByCourse(this.cId).subscribe({
      next: (data) => {
        this.originalLectures = data;
        this.lectures = structuredClone(data);
      },
      error: (error) => {
        this._snack.open('Error in loading lectures...', 'OK', snackbarConfig);
      },
    });
  }
  deleteLecture(id: any) {
    const isDark = document.documentElement.classList.contains('dark');
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
    };

    Swal.fire({
      title: 'Delete Lecture?',
      text: 'This action cannot be undone',
      icon: 'warning',
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f3f4f6' : '#1f2937',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#2196F3',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: `!rounded-2xl !shadow-xl ${
          isDark
            ? 'dark:from-red-500 dark:to-pink-500'
            : 'from-red-600 to-pink-600'
        }`,
        confirmButton: `!rounded-xl !shadow-md bg-gradient-to-r`,
        cancelButton: `!rounded-xl !shadow-md bg-gradient-to-r `,
      },
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._lecture.deleteLecture(id).subscribe({
          next: (success) => {
            this._snack.open('Lecture deleted successfully', 'Close', {
              ...snackbarConfig,
              panelClass: ['success-admin-snackbar'],
            });
            this.lectures = this.lectures.filter(
              (lecture: any) => lecture.lId != id
            );
          },
          error: (error) => {
            this._snack.open('Failed to delete lecture', 'Close', {
              ...snackbarConfig,
              panelClass: ['error-snackbar'],
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

    const filtered = this.originalLectures.filter(
      (lecture: any) =>
        lecture.lTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        lecture.lDescription
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
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
