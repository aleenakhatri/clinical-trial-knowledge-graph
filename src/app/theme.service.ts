// theme.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private theme = new BehaviorSubject<Theme>('light');
  public theme$ = this.theme.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  private initTheme(): void {
    // Check for stored theme preference
    const storedTheme = localStorage.getItem('theme') as Theme;
    
    if (storedTheme) {
      // Use stored theme
      this.setTheme(storedTheme);
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  public setTheme(theme: Theme): void {
    // Store theme preference
    localStorage.setItem('theme', theme);
    
    // Update theme subject
    this.theme.next(theme);
    
    // Apply theme to body class
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      this.applyDarkTheme();
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      this.applyLightTheme();
    }
  }

  private applyLightTheme(): void {
    document.documentElement.style.setProperty('--background-color', '#ffffff');
    document.documentElement.style.setProperty('--text-color', '#333333');
    document.documentElement.style.setProperty('--text-color-secondary', '#666666');
    document.documentElement.style.setProperty('--text-color-tertiary', '#888888');
    document.documentElement.style.setProperty('--primary-color', '#4a90e2');
    document.documentElement.style.setProperty('--secondary-color', '#8de57f');
    document.documentElement.style.setProperty('--card-bg', '#ffffff');
    document.documentElement.style.setProperty('--card-bg-secondary', '#f8f9fa');
    document.documentElement.style.setProperty('--border-color', '#e5e5e5');
    document.documentElement.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
    document.documentElement.style.setProperty('--chart-grid-color', '#ddd');
    document.documentElement.style.setProperty('--hover-bg', '#f0f4f8');
  }

  private applyDarkTheme(): void {
    document.documentElement.style.setProperty('--background-color', '#121212');
    document.documentElement.style.setProperty('--text-color', '#e0e0e0');
    document.documentElement.style.setProperty('--text-color-secondary', '#aaaaaa');
    document.documentElement.style.setProperty('--text-color-tertiary', '#888888');
    document.documentElement.style.setProperty('--primary-color', '#5b9fe6');
    document.documentElement.style.setProperty('--secondary-color', '#85c978');
    document.documentElement.style.setProperty('--card-bg', '#1e1e1e');
    document.documentElement.style.setProperty('--card-bg-secondary', '#2d2d2d');
    document.documentElement.style.setProperty('--border-color', '#444444');
    document.documentElement.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.3)');
    document.documentElement.style.setProperty('--chart-grid-color', '#444');
    document.documentElement.style.setProperty('--hover-bg', '#2a3a4a');
  }

  public toggleTheme(): void {
    const current = this.theme.value;
    const newTheme: Theme = current === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  public getCurrentTheme(): Theme {
    return this.theme.value;
  }
}