import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-welcome-mentor',
  templateUrl: './welcome-mentor.component.html',
  styleUrls: ['./welcome-mentor.component.css']
})
export class WelcomeMentorComponent implements OnInit {

  constructor(
    private _title: Title,
    private _dashboard: DashboardService,
    private _snack: MatSnackBar
  ) { }

  coursesDetails: any;
  ngOnInit(): void {
    this._title.setTitle('DashBoard | Mentor | CodeVenture');
    this._dashboard.countCourseDetails().subscribe(
      (data) => {
        this.coursesDetails = data;
        this.loadSubmittedTasks();
      },
      (error) => {
        this._snack.open('Error in loading Details of Courses.', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    );

  }
  submittedAssignments: any[] = [];
  submittedLabTasks: any[] = [];
  submittedQuizzes: any[] = [];
  loadSubmittedTasks() {
    this._dashboard.countSumittedTasks().subscribe(
      (data: any) => {
        this.submittedAssignments = data.assignmentResults;
        this.submittedLabTasks = data.labTaskResults;
        this.submittedQuizzes = data.quizResults;
        this.loadGraph();
      },
      (error) => {
        this._snack.open('Error in loading Submitted Tasks.', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    );
  }

  loadGraph() {
    const dateCounts1: any = {};
    const dateCounts2: any = {};
    const dateCounts3: any = {};

    this.submittedAssignments.forEach(submitedAssignment => {
      const date1 = submitedAssignment.date;
      dateCounts1[date1] = (dateCounts1[date1] || 0) + 1;
    });

    this.submittedLabTasks.forEach(submittedLabTask => {
      const date2 = submittedLabTask.date;
      dateCounts2[date2] = (dateCounts2[date2] || 0) + 1;
    });

    this.submittedQuizzes.forEach(submittedQuiz => {
      const date3 = submittedQuiz.date;
      dateCounts3[date3] = (dateCounts3[date3] || 0) + 1;
    });
    let uniqueDates = [...new Set([...Object.keys(dateCounts1), ...Object.keys(dateCounts2), ...Object.keys(dateCounts3)])].sort();

    // uniqueDates = this.sortDate(uniqueDates);

    const counts1 = uniqueDates.map(date => dateCounts1[date] || 0);
    const counts2 = uniqueDates.map(date => dateCounts2[date] || 0);
    const counts3 = uniqueDates.map(date => dateCounts3[date] || 0);

    new Chart('myChart', {
      type: 'bar',
      data: {
        labels: uniqueDates,
        datasets: [
          {
            label: 'Assignment',
            data: counts1,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(0, 192, 192, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75, 192, 192, 1)',
            hoverBorderWidth: 5
          },
          {
            label: 'LabTask',
            data: counts2,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 99, 132, 1)',
            hoverBorderWidth: 5
          },
          {
            label: 'Quizzes',
            data: counts3,
            backgroundColor: 'rgba(5, 145, 3, 0.5)',
            borderColor: 'rgba(5, 145, 3, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(5, 145, 3, 1)',
            hoverBorderWidth: 5
          }
        ]
      },
      options: {
        scales: {
          y: {
              beginAtZero: true,
              grace:3,
              ticks:{
                  // stepSize:2
              }
          }
        },
        responsive: false
      },
    });
  }

}
