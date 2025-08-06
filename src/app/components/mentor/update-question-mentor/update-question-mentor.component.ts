import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question-mentor',
  templateUrl: './update-question-mentor.component.html',
  styleUrls: ['./update-question-mentor.component.css'],
})
export class UpdateQuestionMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _rout: ActivatedRoute,
    private _snack: MatSnackBar,
    private _question: QuestionService,
    private _router: Router
  ) {}
  public Editor = ClassicEditor;

  id = this._rout.snapshot.params['qid'];
  question = {
    questionId: '',
    questionContent: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {
      qId: this.id,
    },
  };

  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this._question.getSingleQuestionUser(this.id).subscribe({
      next: (data: any) => {
        // Update question data using object assignment
        this.question = {
          questionId: data.questionId,
          questionContent: data.questionContent,
          option1: data.option1,
          option2: data.option2,
          option3: data.option3,
          option4: data.option4,
          answer: data.answer,
          quiz: {
            qId: data.quiz.qId,
          },
        };

        // Set page title
        this._title.setTitle('Update Question | Mentor | CodeVenture');
      },
      error: (error) => {
        console.error('Error loading question:', error);

        // Show snackbar notification
        this._snack.open('Failed to load question data', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });

        // Show error dialog
        Swal.fire({
          title: 'Error',
          text: 'Could not load question. Please try again.',
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

  updateQuestion(): void {
    const isDark = document.documentElement.classList.contains('dark');

    // Validate question content
    if (!this.question.questionContent?.trim()) {
      this._snack.open('Question content cannot be blank', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Validate all options
    if (
      !this.question.option1?.trim() ||
      !this.question.option2?.trim() ||
      !this.question.option3?.trim() ||
      !this.question.option4?.trim()
    ) {
      this._snack.open('All options must be filled', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Validate answer
    if (!this.question.answer?.trim()) {
      this._snack.open('Please select an answer', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    this._question.addQuestion(this.question).subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Updated!',
          text: 'Question has been successfully updated',
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
        }).then(() => {
          this._router.navigate([`/mentor/quiz/${data.quiz.lecture.lId}`]);
        });
      },
      error: (error) => {
        console.error('Error updating question:', error);
        Swal.fire({
          title: 'Error',
          text: error.error.message || 'Failed to update question',
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
