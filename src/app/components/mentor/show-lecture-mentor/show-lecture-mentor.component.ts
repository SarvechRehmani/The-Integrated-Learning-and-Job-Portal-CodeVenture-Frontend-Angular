import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-lecture-mentor',
  templateUrl: './show-lecture-mentor.component.html',
  styleUrls: ['./show-lecture-mentor.component.css'],
})
export class ShowLectureMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _lecture: LectureService,
    private _rout: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private _router: Router,
    private _snack: MatSnackBar
  ) {}

  id = this._rout.snapshot.params['id'];

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
      next: (data: any) => {
        this.lecture = data;
        this.video = this.sanitizeVideoUrl(data.lVideo);

        // Set dynamic page title
        this._title.setTitle(`${data.lTitle} Lecture | Mentor | CodeVenture`);
      },
      error: (error) => {
        console.error('Error loading lecture:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load lecture details. Please try again.',
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

  deleteLecture(lId: any): void {
    const isDark = document.documentElement.classList.contains('dark');

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this lecture',
      icon: 'warning',
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f3f4f6' : '#1f2937',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#673ab7',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: `!rounded-2xl !shadow-xl ${
          isDark ? '!border !border-red-600' : '!border !border-red-400'
        }`,
        confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
        cancelButton: '!rounded-xl !shadow-md hover:!shadow-lg',
      },
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._lecture.deleteLecture(lId).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Lecture has been successfully deleted',
              icon: 'success',
              background: isDark ? '#1f2937' : '#ffffff',
              color: isDark ? '#f3f4f6' : '#1f2937',
              confirmButtonColor: '#10b981',
              customClass: {
                popup: `!rounded-2xl !shadow-xl ${
                  isDark
                    ? '!border !border-green-600'
                    : '!border !border-green-400'
                }`,
                confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
              },
              showClass: {
                popup: 'animate__animated animate__fadeIn animate__faster',
              },
            }).then(() => {
              this._router.navigate([
                '/mentor/lectures',
                this.lecture.course.cId,
                this.lecture.course.cTitle,
              ]);
            });
          },
          error: (error) => {
            console.error('Error deleting lecture:', error);

            this._snack.open('Failed to delete lecture', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });

            Swal.fire({
              title: 'Error',
              text: 'Could not delete lecture. Please try again.',
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
    });
  }
}
