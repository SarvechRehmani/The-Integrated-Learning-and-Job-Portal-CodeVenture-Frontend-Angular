import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-company-admin',
  templateUrl: './show-company-admin.component.html',
  styleUrls: ['./show-company-admin.component.css'],
})
export class ShowCompanyAdminComponent implements OnInit {
  companies: any[] = [];
  filteredCompanies: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(
    private _title: Title,
    private userService: UserService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._title.setTitle('Company Management | Admin | CodeVenture');
    this.loadCompanies();
  }

  loadCompanies(): void {
    const isDark = document.documentElement.classList.contains('dark');

    this.userService.getCompanies().subscribe({
      next: (data: any) => {
        this.companies = data || [];
        this.filteredCompanies = [...this.companies];
        this.totalPages = Math.ceil(
          this.filteredCompanies.length / this.pageSize
        );
      },
      error: (error: any) => {
        console.error('Error loading companies:', error);
        Swal.fire({
          title: 'Error',
          text: 'Could not load companies. Please try again.',
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

        this.companies = [];
        this.filteredCompanies = [];
        this.totalPages = 1;
      },
    });
  }

  searchCompanies(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredCompanies = [...this.companies];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredCompanies = this.companies.filter(
        (company) =>
          (company.firstName &&
            company.firstName.toLowerCase().includes(query)) ||
          (company.lastName &&
            company.lastName.toLowerCase().includes(query)) ||
          (company.username &&
            company.username.toLowerCase().includes(query)) ||
          (company.email && company.email.toLowerCase().includes(query)) ||
          (company.industry &&
            company.industry.toLowerCase().includes(query)) ||
          (company.address && company.address.toLowerCase().includes(query))
      );
    }
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredCompanies.length / this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(
        1,
        this.currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  getMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  deleteCompany(id: any) {
    const isDark = document.documentElement.classList.contains('dark');
    const snackbarConfig = {
      duration: 3000,
      verticalPosition: 'top' as const,
      horizontalPosition: 'right' as const,
      panelClass: ['error-snackbar'],
    };

    Swal.fire({
      title: 'Delete Company?',
      text: 'This action cannot be undone',
      icon: 'warning',
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f3f4f6' : '#1f2937',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#2196F3',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: `!rounded-2xl !shadow-xl ${
          isDark
            ? 'dark:from-red-500 dark:to-pink-500'
            : 'from-red-600 to-pink-600'
        }`,
        confirmButton: `!rounded-xl !shadow-md bg-gradient-to-r `,
        cancelButton: `!rounded-xl !shadow-md bg-gradient-to-r `,
      },
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: (success) => {
            this._snack.open('Company was successfully deleted', 'Close', {
              ...snackbarConfig,
              panelClass: ['success-admin-snackbar'],
            });
            this.companies = this.companies.filter(
              (company: any) => company.id != id
            );
            this.filteredCompanies = this.filteredCompanies.filter(
              (company: any) => company.id != id
            );
            this.totalPages = Math.ceil(
              this.filteredCompanies.length / this.pageSize
            );
          },
          error: (error) => {
            this._snack.open('Failed to delete company', 'Close', {
              ...snackbarConfig,
              panelClass: ['error-snackbar'],
            });
          },
        });
      }
    });
  }
}
