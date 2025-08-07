import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  constructor(private login: LoginService) {}

  sidebarLinks = [
    { path: '/admin/', label: 'Home', icon: 'home' },
    { path: '/admin/profile', label: 'Profile', icon: 'account_circle' },
    { path: '/admin/courses', label: 'Courses', icon: 'school' },
    {
      path: '/admin/showusers',
      label: 'Show Users',
      icon: 'supervisor_account',
    },
    { path: '/admin/addmentor', label: 'Add Mentor', icon: 'person_add' },
    { path: '/admin/showmentor', label: 'Show Mentors', icon: 'group' },
    {
      path: '/admin/addcompany',
      label: 'Add Company',
      icon: 'add_business',
    },
    {
      path: '/admin/showcompanies',
      label: 'Show Companies',
      icon: 'apartment',
    },
    { path: '/admin/showjobs', label: 'Show Jobs', icon: 'work' },
  ];

  user: any = {};
  ngOnInit(): void {
    this.user = this.login.getUser();
  }

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
