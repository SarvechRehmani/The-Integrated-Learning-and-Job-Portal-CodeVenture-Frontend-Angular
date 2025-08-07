import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  constructor(
    private _title: Title,
    private router: Router,
    private login: LoginService
  ) {}

  ngOnInit(): void {
    this._title.setTitle('About us | CodeVenture');
    if (this.login.isloggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    this._title.setTitle('CodeVenture');
  }
}
