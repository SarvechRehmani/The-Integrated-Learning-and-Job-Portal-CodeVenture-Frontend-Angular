import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'user-sidebar',
  templateUrl: './usersidebar.component.html',
  styleUrls: ['./usersidebar.component.css'],
})
export class UsersidebarComponent {
  ngOnInit(): void {}
  constructor(private login: LoginService) {}
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  sidebarLinks = [
    { path: '/user', label: 'Dashboard', icon: 'dashboard' },
    { path: '/user/profile', label: 'Profile', icon: 'account_circle' },
    { path: '/user/course', label: 'Courses', icon: 'school' },
    { path: '/user/lectures', label: 'Lectures', icon: 'subscriptions' },
    { path: '/user/quizess', label: 'Quizzes', icon: 'help' },
    { path: '/user/assignments', label: 'Assignments', icon: 'assignment' },
    {
      path: '/user/labtasks',
      label: 'Lab Tasks',
      icon: 'assignment_turned_in',
    },
    { path: '/user/findjob', label: 'Find Jobs', icon: 'work' },
  ];

  toggle() {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }
  public logout() {
    this.login.logout();
    window.location.reload();
  }
}
