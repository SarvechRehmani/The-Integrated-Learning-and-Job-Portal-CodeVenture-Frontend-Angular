import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-users-admin',
  templateUrl: './show-users-admin.component.html',
  styleUrls: ['./show-users-admin.component.css'],
})
export class ShowUsersAdminComponent implements OnInit {
  constructor(
    private _title: Title,
    private userService: UserService,
    private snack: MatSnackBar
  ) {}

  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  ngOnInit(): void {
    this._title.setTitle('List of Normal Users | Admin | CodeVenture');
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllNormalUsers().subscribe(
      (data: any) => {
        this.users = data;
        this.filteredUsers = [...this.users];
        this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
      },
      (error: any) => {
        this.snack.open('Error in loading users.', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
  }

  searchUsers(event: any): void {
    if (this.searchQuery.trim() === '') {
      this.filteredUsers = [...this.users];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredUsers = this.users.filter(
        (user) =>
          (user.firstName && user.firstName.toLowerCase().includes(query)) ||
          (user.lastName && user.lastName.toLowerCase().includes(query)) ||
          (user.username && user.username.toLowerCase().includes(query)) ||
          (user.email && user.email.toLowerCase().includes(query)) ||
          (user.field && user.field.toLowerCase().includes(query))
      );

      this.currentPage = 1;
      this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    }
  }

  get paginatedUsers(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
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
  deleteUser(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this user',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#ff4081',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          (success) => {
            this.snack.open('User has been deleted..', 'Ok', {
              verticalPosition: 'top',
              duration: 3000,
            });
            this.users = this.users.filter((user: any) => user.id != id);
            this.filteredUsers = this.filteredUsers.filter(
              (user: any) => user.id != id
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
