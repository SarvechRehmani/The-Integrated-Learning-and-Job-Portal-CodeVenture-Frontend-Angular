import { Component, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = "Home | CodeVenture"
  constructor (
    private el: ElementRef,
    private _title:Title,
    private snack:MatSnackBar,
    private login:LoginService
    ){}
  ngOnInit(): void {
    this.setupEventListeners();

    this._title.setTitle('Home | CodeVenture');
    if (this.login.isloggedIn()) {
      if (this.login.userRole() == "ADMIN") {
        window.location.href = "/profile/";
      }

      else if (this.login.userRole() == "MENTOR") {
        window.location.href = "/mentor";
      }

      else if (this.login.userRole() == "NORMAL") {
        window.location.href = "/user/";
      }
      else if (this.login.userRole() == "COMPANY") {
        window.location.href = "/company";
      }
    }
  }


  private playVideo() {
    const videoElement = this.el.nativeElement.querySelector('#video');
    videoElement.play();
  }

  private setupEventListeners() {
    // Click event
    document.addEventListener('click', () => this.playVideo());

    // Key press event
    document.addEventListener('keydown', () => this.playVideo());

    // Scroll event
    document.addEventListener('scroll', () => this.playVideo());
  }


  
  ngOnDestroy() {
    this._title.setTitle('CodeVenture');
  }

 btnClick(){
  console.log("btn click")
  this.snack.open("hey welcome to my app", "cancle")
 }
 
}
