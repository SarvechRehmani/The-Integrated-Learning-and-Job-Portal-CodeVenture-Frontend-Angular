import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar-mentor',
  templateUrl: './sidebar-mentor.component.html',
  styleUrls: ['./sidebar-mentor.component.css'],
})
export class SidebarMentorComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  sidebarLinks = [
    { path: '/mentor/', label: 'Home', icon: 'home' },
    { path: '/mentor/profile', label: 'Profile', icon: 'account_circle' },
    { path: '/mentor/addcourse', label: 'Add Course', icon: 'playlist_add' },
    { path: '/mentor/courses', label: 'Courses', icon: 'subscriptions' },
    { path: '/mentor/addlecture', label: 'Add Lecture', icon: 'play_arrow' },
    { path: '/mentor/lectures', label: 'Show Lecture', icon: 'slideshow' },
    {
      path: '/mentor/addassignment',
      label: 'Add Assignments',
      icon: 'note_add',
    },
    {
      path: '/mentor/assignments',
      label: 'Show Assignments',
      icon: 'assignment',
    },
    { path: '/mentor/addlabtask', label: 'Add Lab Task', icon: 'add_task' },
    {
      path: '/mentor/labtasks',
      label: 'Show Lab Task',
      icon: 'assignment_turned_in',
    },
    { path: '/mentor/addquiz', label: 'Add Quizzes', icon: 'add_circle' },
    { path: '/mentor/quizzes', label: 'Show Quizzes', icon: 'help' },
  ];

  constructor(private login: LoginService) {}

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
