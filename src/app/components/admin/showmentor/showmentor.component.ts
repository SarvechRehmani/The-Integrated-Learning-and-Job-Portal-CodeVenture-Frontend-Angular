import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-showmentor',
  templateUrl: './showmentor.component.html',
  styleUrls: ['./showmentor.component.css'],
})
export class ShowmentorComponent implements OnInit {
  mentors: any[] = [];
  filteredMentors: any[] = [];
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
    this._title.setTitle('List of Mentors | Admin | CodeVenture');
    this.loadMentors();
  }

  loadMentors(): void {
    this.userService.getMentors().subscribe(
      (data: any) => {
        this.mentors = data || [];
        this.filteredMentors = [...this.mentors];
        this.totalPages = Math.ceil(
          this.filteredMentors.length / this.pageSize
        );
      },
      (error: any) => {
        Swal.fire('Error', error, 'error');
        this.mentors = [];
        this.filteredMentors = [];
        this.totalPages = 1;
      }
    );
  }

  searchMentors(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredMentors = [...this.mentors];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredMentors = this.mentors.filter(
        (mentor) =>
          (mentor.firstName &&
            mentor.firstName.toLowerCase().includes(query)) ||
          (mentor.lastName && mentor.lastName.toLowerCase().includes(query)) ||
          (mentor.username && mentor.username.toLowerCase().includes(query)) ||
          (mentor.email && mentor.email.toLowerCase().includes(query)) ||
          (mentor.field && mentor.field.toLowerCase().includes(query)) ||
          (mentor.bio && mentor.bio.toLowerCase().includes(query))
      );
    }
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredMentors.length / this.pageSize);
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

  deleteMentor(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this mentor',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#ff4081',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          (success) => {
            this.snack.open('Mentor has been deleted..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000,
            });
            this.mentors = this.mentors.filter(
              (mentor: any) => mentor.id != id
            );
            this.filteredMentors = this.filteredMentors.filter(
              (mentor: any) => mentor.id != id
            );
            this.totalPages = Math.ceil(
              this.filteredMentors.length / this.pageSize
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
