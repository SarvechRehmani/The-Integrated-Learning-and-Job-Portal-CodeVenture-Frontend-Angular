import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css'],
})
export class WelcomeUserComponent implements OnInit {
  constructor(
    private _title: Title,
    private _dashboard: DashboardService,
    private _snack: MatSnackBar,
    private _login: LoginService
  ) {}

  assignments: any[] = [];
  labTasks: any[] = [];
  quizzes: any[] = [];
  userName = '';
  ngOnInit(): void {
    this._title.setTitle('Dashboard | CodeVenture');
    this.userName = this._login.getUser().username;
    this._dashboard.countTasks().subscribe(
      (data: any) => {
        this.assignments = data.assignmentResults;
        this.labTasks = data.labTaskResults;
        this.quizzes = data.quizResults;
        this.loadGraph();
      },
      (error) => {
        this._snack.open('Error in Counting Tasks', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
  }

  loadGraph() {
    const dateCounts1: any = {};
    const dateCounts2: any = {};
    const dateCounts3: any = {};

    // Count occurrences of each date for Assignment
    this.assignments.forEach((assignment) => {
      const date1 = assignment.date;
      dateCounts1[date1] = (dateCounts1[date1] || 0) + 1;
    });

    // Count occurrences of each date for LabTask
    this.labTasks.forEach((labTask) => {
      const date2 = labTask.date;
      dateCounts2[date2] = (dateCounts2[date2] || 0) + 1;
    });

    // Count occurrences of each date for Quiz
    this.quizzes.forEach((quiz) => {
      const date3 = quiz.date;
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

    const myChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: uniqueDates,
        datasets: [
          {
            label: 'Assignment',
            data: counts1,
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            fill: true,
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            tension: 0.3,
          },
          {
            label: 'LabTask',
            data: counts2,
            fill: true,
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 2,
            tension: 0.3,
          },
          {
            label: 'Quizzes',
            data: counts3,
            fill: true,
            backgroundColor: 'rgba(168, 85, 247, 0.2)',
            borderColor: 'rgba(168, 85, 247, 1)',
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
