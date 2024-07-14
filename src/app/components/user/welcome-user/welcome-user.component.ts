import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css']
})
export class WelcomeUserComponent implements OnInit {

  constructor(
    private _title: Title,
    private _dashboard: DashboardService,
    private _snack: MatSnackBar
  ) { }
  dataObject: any[] = [];

  assignments: any[] = [];
  labTasks: any[] = [];
  quizzes: any[] = [];

  ngOnInit(): void {
    this._title.setTitle('Dashboard | CodeVenture');
    this._dashboard.countTasks().subscribe(
      (data: any) => {
        this.assignments = data.assignmentResults;
        this.labTasks = data.labTaskResults;
        this.quizzes = data.quizResults;

        this.loadGraph();

      },
      (error) => {
        this._snack.open('Error in Counting Tasks','OK',{
          duration:3000,
          verticalPosition:'top'
        });
      }
    );
  }

  loadGraph() {
    const dateCounts1: any = {};
    const dateCounts2: any = {};
    const dateCounts3: any = {};

    // Count occurrences of each date for Assignment
    this.assignments.forEach(assignment => {
      const date1 = assignment.date;
      dateCounts1[date1] = (dateCounts1[date1] || 0) + 1;
    });

    // Count occurrences of each date for LabTask
    this.labTasks.forEach(labTask => {
      const date2 = labTask.date;
      dateCounts2[date2] = (dateCounts2[date2] || 0) + 1;
    });

    // Count occurrences of each date for Quiz
    this.quizzes.forEach(quiz => {
      const date3 = quiz.date;
      dateCounts3[date3] = (dateCounts3[date3] || 0) + 1;
    });

    const uniqueDates = [...new Set([...Object.keys(dateCounts1), ...Object.keys(dateCounts2), ...Object.keys(dateCounts3)])].sort();

    const counts1 = uniqueDates.map(date => dateCounts1[date] || 0);
    const counts2 = uniqueDates.map(date => dateCounts2[date] || 0);
    const counts3 = uniqueDates.map(date => dateCounts3[date] || 0);

    const myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: uniqueDates,
        datasets: [
          {
            label: 'Assignment',
            data: counts1,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            fill: true,
            borderColor: 'rgba(0, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'LabTask',
            data: counts2,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Quizzes',
            data: counts3,
            fill: true,
            backgroundColor: 'rgba(5, 145, 3, 0.5)',
            borderColor: 'rgba(5, 145, 3, 1)',
            borderWidth: 1,
          }
        ]
      },
      options: {
        scales: {
          y: {
            grace: 3,
            ticks: {
              // stepSize:2
            }
          }
        },
        responsive: false
      }
    });
  }
}