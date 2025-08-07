import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  sidebarOpen = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (!this.isMobile() && !this.sidebarOpen) {
      this.sidebarOpen = true;
    }
  }

  isMobile(): boolean {
    return window.innerWidth < 768; // Tailwind's md breakpoint
  }

  ngOnInit() {
    // Open sidebar by default on desktop
    if (!this.isMobile()) {
      this.sidebarOpen = true;
    }
  }
  onSidebarToggle() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
