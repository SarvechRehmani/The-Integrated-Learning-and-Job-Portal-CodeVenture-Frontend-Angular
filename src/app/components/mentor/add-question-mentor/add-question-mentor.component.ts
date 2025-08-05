import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question-mentor',
  templateUrl: './add-question-mentor.component.html',
  styleUrls: ['./add-question-mentor.component.css'],
})
export class AddQuestionMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _rout: ActivatedRoute,
    private _snack: MatSnackBar,
    private _question: QuestionService
  ) {}
  public Editor = ClassicEditor;
  id = this._rout.snapshot.params['qid'];
  qTitle = this._rout.snapshot.params['qTitle'];
  question = {
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
    this._title.setTitle('Add Question | Mentor | CodeVenture');
  }
  addQuestion() {
    const isDark = document.documentElement.classList.contains('dark');
    // Validate Question Content
    if (!this.question.questionContent?.trim()) {
      this._snack.open('Question content is required', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Validate Options
    if (
      !this.question.option1?.trim() ||
      !this.question.option2?.trim() ||
      !this.question.option3?.trim() ||
      !this.question.option4?.trim()
    ) {
      this._snack.open('All options are required', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Validate Answer
    if (!this.question.answer?.trim()) {
      this._snack.open('Please select the correct answer', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // Submit Question
    this._question.addQuestion(this.question).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Success!',
          text: `Question added to ${this.qTitle}`,
          icon: 'success',
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
          confirmButtonColor: '#10b981',
          customClass: {
            popup: `!rounded-2xl !shadow-xl ${
              isDark
                ? '!border !border-emerald-600'
                : '!border !border-emerald-400'
            }`,
            confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
        }).then(() => {
          this.question = {
            questionContent: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: '',
            quiz: { qId: this.id },
          };
        });
      },
      error: (error) => {
        console.error('Error adding question:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to add question',
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
