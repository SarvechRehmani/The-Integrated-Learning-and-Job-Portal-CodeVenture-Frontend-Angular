import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar-company',
  templateUrl: './sidebar-company.component.html',
  styleUrls: ['./sidebar-company.component.css'],
})
export class SidebarCompanyComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  sidebarLinks = [
    { path: '/company/', label: 'Home', icon: 'home' },
    { path: '/company/profile', label: 'Profile', icon: 'account_circle' },
    { path: '/company/addjob', label: 'Add Job', icon: 'work' },
    {
      path: '/company/viewjobs',
      label: 'Show Jobs',
      icon: 'assignment_turned_in',
    },
    {
      path: '/company/applications',
      label: 'Show Applications',
      icon: 'shield_person',
    },
  ];
  user: any;
  constructor(private login: LoginService) {}
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
