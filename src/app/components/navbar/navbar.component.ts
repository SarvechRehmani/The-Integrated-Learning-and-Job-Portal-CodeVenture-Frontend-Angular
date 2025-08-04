import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<void>();

  mobileLinks = [
    { path: '/home', label: 'Home', icon: 'home' },
    { path: '/about', label: 'About', icon: 'info' },
    { path: '/login', label: 'Login', icon: 'login' },
    { path: '/register', label: 'Register', icon: 'how_to_reg' },
  ];
  constructor(public login: LoginService) {}

  isLoggedIn = false;

  user = {
    username: '',
    firstName: '',
    lastName: '',
  };

  ngOnInit(): void {
    this.isLoggedIn = this.login.isloggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isloggedIn();
      this.user = this.login.getUser();
    });
  }
  public logout() {
    this.login.logout();
    window.location.reload();
    this.mobileMenuOpen = false;
  }

  mobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }
}
