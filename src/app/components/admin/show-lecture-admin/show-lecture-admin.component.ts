import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-lecture-admin',
  templateUrl: './show-lecture-admin.component.html',
  styleUrls: ['./show-lecture-admin.component.css'],
})
export class ShowLectureAdminComponent implements OnInit {
  constructor(
    private _title: Title,
    private _lecture: LectureService,
    private _rout: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private _router: Router,
    private _snack: MatSnackBar
  ) {}

  id = this._rout.snapshot.params['lId'];

  lecture: any = {
    lNo: '',

    course: {
      cTitle: '',
    },
  };

  video: any;

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._lecture.getSingleLecture(this.id).subscribe({
      next: (data) => {
        this.lecture = data;
        this.video = this.sanitizeVideoUrl(this.lecture.lVideo);
        this._title.setTitle(
          `${this.lecture.lTitle} Lecture | Admin | CodeVenture`
        );
      },
      error: (error) => {
        console.error('Error loading lecture:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load lecture. Please try again.',
          icon: 'error',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#ef4444',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark ? '!border !border-red-600' : '!border !border-red-400'
            }`,
            confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
        });
      },
    });
  }

  sanitizeVideoUrl(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  deleteLecture(lId: any) {
    const isDark = document.documentElement.classList.contains('dark');
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
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
        cancelButton: `!rounded-xl !shadow-md bg-gradient-to-r ${
          isDark
            ? 'dark:from-purple-500 dark:to-indigo-500'
            : 'from-purple-600 to-indigo-600'
        }`,
      },
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._lecture.deleteLecture(lId).subscribe({
          next: (success) => {
            this._snack.open('Lecture has been deleted successfully', 'Close', {
              ...snackbarConfig,
              panelClass: ['success-admin-snackbar'],
            });
            this._router.navigate([
              '/admin/lectures/' +
                this.lecture.course.cId +
                '/' +
                this.lecture.course.cTitle,
            ]);
          },
          error: (error) => {
            this._snack.open(
              'Failed to delete lecture',
              'Close',
              snackbarConfig
            );
          },
        });
      }
    });
  }
}
