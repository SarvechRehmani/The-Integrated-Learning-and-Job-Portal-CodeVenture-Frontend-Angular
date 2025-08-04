import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private _title: Title, private _login: LoginService) {}
  isLogin = false;
  ngOnInit(): void {
    this._title.setTitle('Home | CodeVenture');
    this.isLogin = this._login.isloggedIn();
  }

  sidebarOpen = false;

  onSidebarToggle() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
