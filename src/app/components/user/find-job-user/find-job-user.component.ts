import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-find-job-user',
  templateUrl: './find-job-user.component.html',
  styleUrls: ['./find-job-user.component.css'],
})
export class FindJobUserComponent {
  constructor(
    private _title: Title,
    private _job: JobService,
    private _snack: MatSnackBar
  ) {}

  // Search and filter properties
  searchQuery: string = '';
  locationQuery: string = '';
  jobs: any[] = [];
  filteredJobs: any[] = [];
  initialJobsToShow = 5;

  // Filter properties
  showAdvancedFilters: boolean = false;
  selectedJobType: string[] = [];
  selectedExperience: string[] = [];
  salaryRange: string = 'any';
  activeFilters: string[] = [];

  // Job type and experience options
  jobTypeOptions = [
    { value: 'fulltime', display: 'Full-time' },
    { value: 'parttime', display: 'Part-time' },
    { value: 'contract', display: 'Contract' },
    { value: 'internship', display: 'Internship' },
    { value: 'remote', display: 'Remote' },
  ];

  experienceOptions = [
    { value: 'entry', display: 'Entry Level' },
    { value: 'mid', display: 'Mid Level' },
    { value: 'senior', display: 'Senior' },
    { value: 'lead', display: 'Lead' },
  ];

  salaryOptions = [
    { value: 'any', display: 'Any Salary' },
    { value: '50k', display: '$50k+' },
    { value: '100k', display: '$100k+' },
    { value: '150k', display: '$150k+' },
  ];

  ngOnInit(): void {
    this._title.setTitle('Find Jobs | CodeVenture');
    this.loadAllJobs();
  }

  loadAllJobs(): void {
    this._job.getAllJobs().subscribe(
      (data: any) => {
        this.jobs = data;
        this.filteredJobs = this.jobs.slice(0, this.initialJobsToShow);
      },
      (error: any) => {
        this._snack.open('Error in loading Jobs..', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
  }

  loadMoreJobs(): void {
    const remainingJobs = this.jobs.slice(
      this.filteredJobs.length,
      this.filteredJobs.length + this.initialJobsToShow
    );
    this.filteredJobs = [...this.filteredJobs, ...remainingJobs];
  }

  searchJobs(): void {
    if (this.searchQuery.trim() === '' && this.locationQuery.trim() === '') {
      this.filteredJobs = this.jobs.slice(0, this.initialJobsToShow);
      return;
    }

    this.filteredJobs = this.jobs.filter((job) => {
      const matchesSearch =
        this.searchQuery.trim() === '' ||
        job.jTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.jDescription
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        job.jSkills.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesLocation =
        this.locationQuery.trim() === '' ||
        (job.jLocation &&
          job.jLocation
            .toLowerCase()
            .includes(this.locationQuery.toLowerCase()));

      return matchesSearch && matchesLocation;
    });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.locationQuery = '';
    this.filteredJobs = this.jobs.slice(0, this.initialJobsToShow);
    this.activeFilters = [];
  }

  applyFilters(): void {
    this.activeFilters = [];

    // Build active filters display
    if (this.selectedJobType.length > 0) {
      const jobTypes = this.selectedJobType.map(
        (type) =>
          this.jobTypeOptions.find((opt) => opt.value === type)?.display || type
      );
      this.activeFilters.push(`Job Types: ${jobTypes.join(', ')}`);
    }

    if (this.selectedExperience.length > 0) {
      const experiences = this.selectedExperience.map(
        (exp) =>
          this.experienceOptions.find((opt) => opt.value === exp)?.display ||
          exp
      );
      this.activeFilters.push(`Experience: ${experiences.join(', ')}`);
    }

    if (this.salaryRange !== 'any') {
      const salary =
        this.salaryOptions.find((opt) => opt.value === this.salaryRange)
          ?.display || this.salaryRange;
      this.activeFilters.push(`Salary: ${salary}`);
    }

    // Apply filters to jobs
    this.filteredJobs = this.jobs.filter((job) => {
      // Job type filter
      const jobTypeMatch =
        this.selectedJobType.length === 0 ||
        (job.jType && this.selectedJobType.includes(job.jType.toLowerCase()));

      // Experience filter (assuming job has jExperience property)
      const experienceMatch =
        this.selectedExperience.length === 0 ||
        (job.jExperience &&
          this.selectedExperience.includes(job.jExperience.toLowerCase()));

      // Salary filter (assuming job has jSalary property)
      const salaryMatch =
        this.salaryRange === 'any' ||
        (job.jSalary && this.checkSalaryRange(job.jSalary));

      return jobTypeMatch && experienceMatch && salaryMatch;
    });

    // If no search query, reset to initial count
    if (this.searchQuery.trim() === '' && this.locationQuery.trim() === '') {
      this.filteredJobs = this.filteredJobs.slice(0, this.initialJobsToShow);
    }
  }

  private checkSalaryRange(salary: string): boolean {
    if (!salary) return false;

    // Extract numeric value from salary string (e.g., "$120,000" -> 120000)
    const numericSalary = parseInt(salary.replace(/[^0-9]/g, ''));

    switch (this.salaryRange) {
      case '50k':
        return numericSalary >= 50000;
      case '100k':
        return numericSalary >= 100000;
      case '150k':
        return numericSalary >= 150000;
      default:
        return true;
    }
  }

  resetFilters(): void {
    this.selectedJobType = [];
    this.selectedExperience = [];
    this.salaryRange = 'any';
    this.activeFilters = [];
    this.filteredJobs = this.jobs.slice(0, this.initialJobsToShow);
  }

  removeFilter(filter: string): void {
    // Remove from active filters
    this.activeFilters = this.activeFilters.filter((f) => f !== filter);

    // Determine which filter type was removed
    if (filter.startsWith('Job Types:')) {
      this.selectedJobType = [];
    } else if (filter.startsWith('Experience:')) {
      this.selectedExperience = [];
    } else if (filter.startsWith('Salary:')) {
      this.salaryRange = 'any';
    }

    // Reapply remaining filters
    this.applyFilters();
  }
}
