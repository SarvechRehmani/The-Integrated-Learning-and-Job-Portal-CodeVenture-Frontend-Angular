import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-lecture-mentor',
  templateUrl: './add-lecture-mentor.component.html',
  styleUrls: ['./add-lecture-mentor.component.css'],
})
export class AddLectureMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _course: CourseService,
    private _lecture: LectureService
  ) {}

  courses: any;

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._title.setTitle('Add Lecture | Mentor | CodeVenture');

    this._course.getCoursesByUser().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load available courses. Please try again.',
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

  public Editor = ClassicEditor;

  public lecture = {
    lNo: '',
    lTitle: '',
    lDescription: '',
    lVideo: '',
    course: {
      cId: '',
    },
  };

  formSubmit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._lecture.addLecture(this.lecture).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Added!',
          text: 'Lecture successfully added',
          icon: 'success',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#10b981',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark ? '!border !border-green-600' : '!border !border-green-400'
            }`,
            confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
        });

        // Reset form
        this.lecture = {
          lNo: '',
          lTitle: '',
          lDescription: '',
          lVideo: '',
          course: {
            cId: '',
          },
        };
      },
      error: (error) => {
        console.error('Error adding lecture:', error);
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong. Please try again.',
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
}
