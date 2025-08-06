import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-all-quiz',
  templateUrl: './show-all-quiz.component.html',
  styleUrls: ['./show-all-quiz.component.css'],
})
export class ShowAllQuizComponent implements OnInit {
  constructor(
    private _title: Title,
    private _quiz: QuizService,
    private _snack: MatSnackBar,
    private _question: QuestionService
  ) {}

  quizzes: any;
  originalQuizes: any;
  ngOnInit(): void {
    const isDark = document.documentElement.classList.contains('dark');
    this._title.setTitle('Quizzes | Mentor | CodeVenture');

    this._quiz.getQuizzesByUserCourse().subscribe({
      next: (data) => {
        this.quizzes = data;
        this.originalQuizes = structuredClone(data);
      },
      error: (error) => {
        console.error('Error loading quizzes:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load quizzes. Please try again.',
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

  deleteQuiz(id: any) {
    const isDark = document.documentElement.classList.contains('dark');

    Swal.fire({
      title: 'Delete Quiz?',
      text: 'This will permanently remove the quiz and all its questions',
      icon: 'warning',
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f3f4f6' : '#1f2937',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#10b981',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: `!rounded-2xl !shadow-xl ${
          isDark ? '!border !border-gray-700' : '!border !border-gray-200'
        }`,
        confirmButton: '!rounded-xl !shadow-md hover:!shadow-lg',
        cancelButton: '!rounded-xl !shadow-md hover:!shadow-lg',
        actions: '!gap-3',
      },
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(id).subscribe({
          next: (success) => {
            this._snack.open('Quiz deleted successfully', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar'],
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId != id);
          },
          error: (error) => {
            console.error('Error deleting quiz:', error);
            this._snack.open('Failed to delete quiz', 'Close', {
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
  searchQuery: string = '';
  onSearchQuizes() {
    // Reset if search query is empty
    if (!this.searchQuery.trim()) {
      this.quizzes = [...this.originalQuizes];
      return;
    }

    // Filter quizzes
    const searchTerm = this.searchQuery.toLowerCase();
    const filtered = this.originalQuizes.filter(
      (quiz: any) =>
        quiz.lecture.lTitle.toLowerCase().includes(searchTerm) ||
        quiz.qTitle?.toLowerCase().includes(searchTerm)
    );

    // Show feedback if no results
    if (filtered.length === 0) {
      this._snack.open('No matching quizzes found', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }

    this.quizzes = filtered;
  }
}
