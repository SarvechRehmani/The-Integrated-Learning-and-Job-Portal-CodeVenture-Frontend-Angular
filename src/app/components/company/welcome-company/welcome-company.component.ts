import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-welcome-company',
  templateUrl: './welcome-company.component.html',
  styleUrls: ['./welcome-company.component.css']
})
export class WelcomeCompanyComponent implements OnInit {

  constructor(
    private _title: Title,
    private _dashboard: DashboardService,
    private _snack: MatSnackBar
  ) { }

  jobsCount: any;
  jobApplications: any[] = [];

  ngOnInit(): void {
    this._title.setTitle('Dashboard | Company | CodeVenture');
    this._dashboard.countJobsAndJobApplications().subscribe(
      (data: any) => {
        this.jobsCount = data.jobs;
        this.jobApplications = data.jobsApplications;
        this.loadGraph();
        console.log(this.jobApplications);
      },
      (error) => {
        this._snack.open('Error in loading job And Job applications.', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    );
  }

  loadGraph() {
    const dateCounts: any = {};

    this.jobApplications.forEach(jobApplication => {
      const date = jobApplication.date;
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    const uniqueDates = Object.keys(dateCounts).sort();
    const counts = uniqueDates.map(date => dateCounts[date]);

    new Chart('myChart', {
      type: 'bar',
      data: {
        labels: uniqueDates,
        datasets: [
          {
            label: 'Job Applications',
            data: counts,
            backgroundColor: 'rgba(252, 186, 3, 0.3)',
            borderColor: 'rgba(252, 186, 3, 1)',
            borderWidth: 1,
            borderRadius: 20,
            hoverBackgroundColor: 'rgba(252, 186, 3, 1)',
            hoverBorderWidth: 5
          }
        ]
      },
      options: {
        scales: {
          y: {
              beginAtZero: true,
              grace:1,
              ticks:{
                  stepSize:2
              }
          }
      },
        responsive: false
      },
    });
  }
}
