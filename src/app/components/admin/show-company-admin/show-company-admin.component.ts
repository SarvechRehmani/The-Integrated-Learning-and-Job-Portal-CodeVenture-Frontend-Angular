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
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._title.setTitle('Company Management | Admin | CodeVenture');
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.userService.getCompanies().subscribe(
      (data: any) => {
        this.companies = data || [];
        this.filteredCompanies = [...this.companies];
        this.totalPages = Math.ceil(
          this.filteredCompanies.length / this.pageSize
        );
      },
      (error: any) => {
        Swal.fire('Error', error, 'error');
        this.companies = [];
        this.filteredCompanies = [];
        this.totalPages = 1;
      }
    );
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this company',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#ff4081',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          (success) => {
            this.snack.open('Company has been deleted..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000,
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
          (error) => {
            this.snack.open('Something went wrong..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        );
      }
    });
  }
}
