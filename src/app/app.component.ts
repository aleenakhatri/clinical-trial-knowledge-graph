// app.component.ts
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './theme.service';
import { ThemeToggleComponent } from './theme-toggle.component';
import { AnalyticsDashboardComponent } from './analytics-dashboard.component';
import { ExportService } from './export.service';

// Declare Chart variable from the CDN loaded script
declare const Chart: any;

interface Trial {
  id: string;
  name: string;
  phase?: string;
  condition?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ThemeToggleComponent,
    AnalyticsDashboardComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('phaseChart') phaseChart!: ElementRef;
  @ViewChild('conditionChart') conditionChart!: ElementRef;
  
  title = '🧪 Clinical Trial Knowledge Graph';
  trials: Trial[] = [];
  searchTerm: string = '';
  phaseChartInstance: any = null;
  conditionChartInstance: any = null;
  
  // Add filter options
  phases: string[] = [];
  conditions: string[] = [];
  selectedPhase: string = '';
  selectedCondition: string = '';
  
  // Export options
  exportOptions = [
    { label: 'CSV', value: 'csv' },
    { label: 'JSON', value: 'json' }
  ];
  selectedExportFormat: string = 'csv';
  
  constructor(
    private http: HttpClient,
    private themeService: ThemeService,
    private exportService: ExportService
  ) {}
  
  ngOnInit() {
    this.loadTrials();
    
    // Listen for theme changes to update charts
    this.themeService.theme$.subscribe(() => {
      // Wait for CSS variables to apply
      setTimeout(() => {
        if (this.trials.length > 0) {
          this.updateCharts();
        }
      }, 100);
    });
  }
  
  ngAfterViewInit() {
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
      if (this.trials.length > 0) {
        this.updateCharts();
      }
    }, 100);
  }

  updateCharts() {
    this.createPhaseChart();
    if (this.conditionChart && this.conditionChart.nativeElement) {
      this.createConditionChart();
    }
  }
  
  get filteredTrials() {
    const term = this.searchTerm.toLowerCase();
    return this.trials.filter(t => {
      // Apply text search
      const matchesSearch = term === '' || 
        t.name.toLowerCase().includes(term) ||
        (t.condition?.toLowerCase().includes(term)) ||
        (t.phase?.toLowerCase().includes(term));
      
      // Apply phase filter
      const matchesPhase = this.selectedPhase === '' || t.phase === this.selectedPhase;
      
      // Apply condition filter
      const matchesCondition = this.selectedCondition === '' || t.condition === this.selectedCondition;
      
      return matchesSearch && matchesPhase && matchesCondition;
    });
  }

  loadTrials() {
    this.http.get<Trial[]>('http://localhost:8080/api/trials').subscribe({
      next: (data) => {
        this.trials = data;
        this.extractFilterOptions();
        
        // Wait for view to be ready
        setTimeout(() => {
          this.updateCharts();
        }, 100);
      },
      error: (err) => {
        console.error('Error loading trials', err);
        this.createSampleData();
        this.extractFilterOptions();
        
        // Wait for view to be ready
        setTimeout(() => {
          this.updateCharts();
        }, 100);
      }
    });
  }
  
  extractFilterOptions() {
    // Extract unique phases and conditions for filters
    this.phases = [...new Set(this.trials.map(t => t.phase || 'Unknown'))];
    this.conditions = [...new Set(this.trials.map(t => t.condition || 'Unknown'))];
  }
  
  createSampleData() {
    // Sample data for testing when API is not available
    this.trials = [
      { id: '1', name: 'COVID-19 Vaccine Trial', phase: 'Phase 3', condition: 'COVID-19' },
      { id: '2', name: 'COVID-19 Treatment Study', phase: 'Phase 2', condition: 'COVID-19' },
      { id: '3', name: 'Diabetes Treatment Study', phase: 'Phase 2', condition: 'Diabetes' },
      { id: '4', name: 'Diabetes Prevention Trial', phase: 'Phase 3', condition: 'Diabetes' },
      { id: '5', name: 'Diabetes Monitoring Research', phase: 'Phase 1', condition: 'Diabetes' },
      { id: '6', name: 'Alzheimer\'s Research', phase: 'Phase 1', condition: 'Alzheimer\'s' },
      { id: '7', name: 'Alzheimer\'s Early Detection', phase: 'Phase 2', condition: 'Alzheimer\'s' },
      { id: '8', name: 'Cancer Immunotherapy', phase: 'Phase 2/3', condition: 'Oncology' },
      { id: '9', name: 'Cancer Vaccine Study', phase: 'Phase 1', condition: 'Oncology' },
      { id: '10', name: 'Lung Cancer Treatment', phase: 'Phase 3', condition: 'Oncology' },
      { id: '11', name: 'Arthritis Pain Relief', phase: 'Phase 4', condition: 'Arthritis' },
      { id: '12', name: 'Rheumatoid Arthritis Therapy', phase: 'Phase 3', condition: 'Arthritis' }
    ];
  }

  clearTrials() {
    this.trials = [];
    this.searchTerm = '';
    this.selectedPhase = '';
    this.selectedCondition = '';
    this.phases = [];
    this.conditions = [];
    
    if (this.phaseChartInstance) {
      this.phaseChartInstance.destroy();
      this.phaseChartInstance = null;
    }
    
    if (this.conditionChartInstance) {
      this.conditionChartInstance.destroy();
      this.conditionChartInstance = null;
    }
  }
  
  resetFilters() {
    this.searchTerm = '';
    this.selectedPhase = '';
    this.selectedCondition = '';
    this.updateCharts();
  }
  
  applyFilters() {
    this.updateCharts();
  }
  
  // Export functions
  exportData(format: string = 'csv') {
    const filename = 'clinical_trials_' + (this.searchTerm ? `search_${this.searchTerm}` : 'all');
    
    if (format === 'json') {
      this.exportService.exportToJSON(this.filteredTrials, filename);
    } else {
      // Default to CSV
      this.exportService.exportToCSV(this.filteredTrials, filename);
    }
  }
  
  exportFiltered() {
    this.exportData(this.selectedExportFormat);
  }
  
  exportAll() {
    const filename = 'clinical_trials_complete';
    
    if (this.selectedExportFormat === 'json') {
      this.exportService.exportToJSON(this.trials, filename);
    } else {
      this.exportService.exportToCSV(this.trials, filename);
    }
  }
  
  createPhaseChart() {
    if (!this.phaseChart || !this.phaseChart.nativeElement || this.filteredTrials.length === 0) return;
    
    // Get current theme for chart styling
    const isDarkMode = this.themeService.getCurrentTheme() === 'dark';
    const textColor = isDarkMode ? '#e0e0e0' : '#333333';
    const gridColor = isDarkMode ? '#444' : '#ddd';
    
    // Destroy existing chart if it exists
    if (this.phaseChartInstance) {
      this.phaseChartInstance.destroy();
    }
    
    // Count trials by phase
    const phaseCount: {[key: string]: number} = {};
    this.filteredTrials.forEach(trial => {
      const phase = trial.phase || 'Unknown';
      phaseCount[phase] = (phaseCount[phase] || 0) + 1;
    });
    
    // Create chart data
    const phases = Object.keys(phaseCount);
    const phaseCounts = Object.values(phaseCount);
    
    // Create charts
    const ctx = this.phaseChart.nativeElement.getContext('2d');
    
    // Make sure Chart is defined (loaded from CDN)
    if (typeof Chart !== 'undefined') {
      this.phaseChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: phases,
          datasets: [{
            label: 'Number of Trials',
            data: phaseCounts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Clinical Trials by Phase',
              color: textColor
            },
            legend: {
              display: false,
              labels: {
                color: textColor
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Trials',
                color: textColor
              },
              ticks: {
                color: textColor
              },
              grid: {
                color: gridColor
              }
            },
            x: {
              title: {
                display: true,
                text: 'Trial Phase',
                color: textColor
              },
              ticks: {
                color: textColor
              },
              grid: {
                color: gridColor
              }
            }
          }
        }
      });
    } else {
      console.error('Chart.js not loaded from CDN');
    }
  }
  
  createConditionChart() {
    if (!this.conditionChart || !this.conditionChart.nativeElement || this.filteredTrials.length === 0) return;
    
    // Get current theme for chart styling
    const isDarkMode = this.themeService.getCurrentTheme() === 'dark';
    const textColor = isDarkMode ? '#e0e0e0' : '#333333';
    
    // Destroy existing chart if it exists
    if (this.conditionChartInstance) {
      this.conditionChartInstance.destroy();
    }
    
    // Count trials by condition
    const conditionCount: {[key: string]: number} = {};
    this.filteredTrials.forEach(trial => {
      const condition = trial.condition || 'Unknown';
      conditionCount[condition] = (conditionCount[condition] || 0) + 1;
    });
    
    // Create chart data
    const conditions = Object.keys(conditionCount);
    const conditionCounts = Object.values(conditionCount);
    
    // Create charts
    const ctx = this.conditionChart.nativeElement.getContext('2d');
    
    // Make sure Chart is defined (loaded from CDN)
    if (typeof Chart !== 'undefined') {
      this.conditionChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: conditions,
          datasets: [{
            data: conditionCounts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(201, 203, 207, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(201, 203, 207, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          plugins: {
            title: {
              display: true,
              text: 'Clinical Trials by Condition',
              color: textColor
            },
            legend: {
              position: 'right',
              labels: {
                color: textColor,
                font: {
                  size: 11
                }
              }
            }
          }
        }
      });
    } else {
      console.error('Chart.js not loaded from CDN');
    }
  }
}