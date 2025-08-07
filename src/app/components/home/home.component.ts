import { Component, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Home | CodeVenture';

  constructor(
    private el: ElementRef,
    private _title: Title,
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._title.setTitle('Home | CodeVenture');
    if (this.login.isloggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    this._title.setTitle('CodeVenture');
  }
  btnClick() {
    console.log('btn click');
    this.snack.open('hey welcome to my app', 'cancle');
  }
}
