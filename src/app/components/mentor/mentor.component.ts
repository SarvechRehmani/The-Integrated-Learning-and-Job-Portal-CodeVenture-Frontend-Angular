import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css'],
})
export class MentorComponent {
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
