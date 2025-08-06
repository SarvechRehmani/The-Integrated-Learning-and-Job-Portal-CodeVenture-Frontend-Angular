import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-welcome-mentor',
  templateUrl: './welcome-mentor.component.html',
  styleUrls: ['./welcome-mentor.component.css'],
})
export class WelcomeMentorComponent implements OnInit {
  constructor(
    private _title: Title,
    private _dashboard: DashboardService,
    private _snack: MatSnackBar
  ) {}

  coursesDetails: any;
  submittedAssignments: any[] = [];
  submittedLabTasks: any[] = [];
  submittedQuizzes: any[] = [];

  ngOnInit(): void {
    this._title.setTitle('DashBoard | Mentor | CodeVenture');
    this._dashboard.countCourseDetails().subscribe(
      (data) => {
        this.coursesDetails = data;
        this.loadSubmittedTasks();
      },
      (error) => {
        this._snack.open('Error in loading Details of Courses.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    );
  }

  loadSubmittedTasks() {
    this._dashboard.countSumittedTasks().subscribe(
      (data: any) => {
        this.submittedAssignments = data.assignmentResults;
        this.submittedLabTasks = data.labTaskResults;
        this.submittedQuizzes = data.quizResults;
        this.loadGraph();
      },
      (error) => {
        this._snack.open('Error in loading Submitted Tasks.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    );
  }

  loadGraph() {
    const dateCounts1: any = {};
    const dateCounts2: any = {};
    const dateCounts3: any = {};

    this.submittedAssignments.forEach((submitedAssignment) => {
      const date1 = submitedAssignment.date;
      dateCounts1[date1] = (dateCounts1[date1] || 0) + 1;
    });

    this.submittedLabTasks.forEach((submittedLabTask) => {
      const date2 = submittedLabTask.date;
      dateCounts2[date2] = (dateCounts2[date2] || 0) + 1;
    });

    this.submittedQuizzes.forEach((submittedQuiz) => {
      const date3 = submittedQuiz.date;
      dateCounts3[date3] = (dateCounts3[date3] || 0) + 1;
    });

    const uniqueDates = [
      ...new Set([
        ...Object.keys(dateCounts1),
        ...Object.keys(dateCounts2),
        ...Object.keys(dateCounts3),
      ]),
    ].sort();
    const counts1 = uniqueDates.map((date) => dateCounts1[date] || 0);
    const counts2 = uniqueDates.map((date) => dateCounts2[date] || 0);
    const counts3 = uniqueDates.map((date) => dateCounts3[date] || 0);

    new Chart('myChart', {
      type: 'line',
      data: {
        labels: uniqueDates,
        datasets: [
          {
            label: 'Assignment',
            data: counts1,
            backgroundColor: 'rgba(16, 185, 129, 0.2)', // emerald
            fill: true,
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 2,
            tension: 0.3,
          },
          {
            label: 'LabTask',
            data: counts2,
            fill: true,
            backgroundColor: 'rgba(6, 182, 212, 0.2)', // cyan
            borderColor: 'rgba(6, 182, 212, 1)',
            borderWidth: 2,
            tension: 0.3,
          },
          {
            label: 'Quizzes',
            data: counts3,
            fill: true,
            backgroundColor: 'rgba(245, 158, 11, 0.2)', // amber
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#6B7280',
              font: {
                size: 14,
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(209, 213, 219, 0.3)',
            },
            ticks: {
              color: '#6B7280',
            },
          },
          y: {
            grace: 3,
            grid: {
              color: 'rgba(209, 213, 219, 0.3)',
            },
            ticks: {
              color: '#6B7280',
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      },
    });
  }
}
