import { Component, HostBinding } from '@angular/core';
import { ThemeService } from 'src/app/services/ThemeService';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css'],
})
export class ThemeToggleComponent {
  @HostBinding('class.dark-mode') get darkMode() {
    return this.isDark;
  }

  isDark = this.themeService.isDarkMode();

  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDark = this.themeService.isDarkMode();
  }
}
