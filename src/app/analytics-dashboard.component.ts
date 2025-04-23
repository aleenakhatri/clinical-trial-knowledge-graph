// analytics-dashboard.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Trial {
  id: string;
  name: string;
  phase?: string;
  condition?: string;
}

interface AnalyticsSummary {
  totalTrials: number;
  phaseDistribution: {[key: string]: {count: number, percentage: number}};
  conditionDistribution: {[key: string]: {count: number, percentage: number}};
  mostCommonPhase: string;
  mostCommonCondition: string;
}

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="analytics-dashboard">
      <h2>Analytics Dashboard</h2>
      <div class="analytics-grid">
        <div class="analytics-card">
          <div class="card-title">Total Trials</div>
          <div class="card-value">{{ summary.totalTrials }}</div>
        </div>
        
        <div class="analytics-card">
          <div class="card-title">Most Common Phase</div>
          <div class="card-value">{{ summary.mostCommonPhase }}</div>
          <div class="card-subtitle" *ngIf="summary.phaseDistribution[summary.mostCommonPhase]">
            {{ summary.phaseDistribution[summary.mostCommonPhase].percentage.toFixed(1) }}% of trials
          </div>
        </div>
        
        <div class="analytics-card">
          <div class="card-title">Most Common Condition</div>
          <div class="card-value">{{ summary.mostCommonCondition }}</div>
          <div class="card-subtitle" *ngIf="summary.conditionDistribution[summary.mostCommonCondition]">
            {{ summary.conditionDistribution[summary.mostCommonCondition].percentage.toFixed(1) }}% of trials
          </div>
        </div>
        
        <div class="analytics-card">
          <div class="card-title">Distribution by Phase</div>
          <div class="distribution-bars">
            <div *ngFor="let phase of getTopPhases(3)" class="distribution-bar">
              <div class="bar-label">{{ phase }}</div>
              <div class="bar-container">
                <div class="bar" [style.width.%]="summary.phaseDistribution[phase].percentage"></div>
                <div class="bar-value">{{ summary.phaseDistribution[phase].percentage.toFixed(1) }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analytics-dashboard {
      background-color: var(--card-bg, #1e1e1e);
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px var(--shadow-color, rgba(0,0,0,0.3));
    }
    
    .analytics-dashboard h2 {
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 1.2rem;
      color: var(--text-color, #e0e0e0);
    }
    
    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 15px;
    }
    
    .analytics-card {
      background-color: var(--card-bg-secondary, #2d2d2d);
      border-radius: 6px;
      padding: 15px;
      box-shadow: 0 1px 3px var(--shadow-color, rgba(0,0,0,0.3));
    }
    
    .card-title {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-color-secondary, #aaaaaa);
      margin-bottom: 8px;
    }
    
    .card-value {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-color, #e0e0e0);
    }
    
    .card-subtitle {
      font-size: 0.8rem;
      color: var(--text-color-tertiary, #888888);
      margin-top: 5px;
    }
    
    .distribution-bars {
      margin-top: 10px;
    }
    
    .distribution-bar {
      margin-bottom: 10px;
    }
    
    .bar-label {
      font-size: 0.8rem;
      margin-bottom: 3px;
      color: var(--text-color-secondary, #aaaaaa);
    }
    
    .bar-container {
      display: flex;
      align-items: center;
      height: 20px;
    }
    
    .bar {
      height: 100%;
      background-color: var(--primary-color, #5b9fe6);
      border-radius: 3px;
    }
    
    .bar-value {
      margin-left: 8px;
      font-size: 0.8rem;
      color: var(--text-color-secondary, #aaaaaa);
    }
    
    @media (max-width: 768px) {
      .analytics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 480px) {
      .analytics-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AnalyticsDashboardComponent implements OnChanges {
  @Input() trials: Trial[] = [];
  
  summary: AnalyticsSummary = {
    totalTrials: 0,
    phaseDistribution: {},
    conditionDistribution: {},
    mostCommonPhase: 'Unknown',
    mostCommonCondition: 'Unknown'
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trials']) {
      this.calculateAnalytics();
    }
  }

  calculateAnalytics(): void {
    // Reset summary
    this.summary = {
      totalTrials: this.trials.length,
      phaseDistribution: {},
      conditionDistribution: {},
      mostCommonPhase: 'Unknown',
      mostCommonCondition: 'Unknown'
    };

    // Skip calculations if no trials
    if (this.trials.length === 0) return;

    // Calculate phase distribution
    const phaseCount: {[key: string]: number} = {};
    let maxPhaseCount = 0;
    
    this.trials.forEach(trial => {
      const phase = trial.phase || 'Unknown';
      phaseCount[phase] = (phaseCount[phase] || 0) + 1;
      
      if (phaseCount[phase] > maxPhaseCount) {
        maxPhaseCount = phaseCount[phase];
        this.summary.mostCommonPhase = phase;
      }
    });
    
    // Calculate condition distribution
    const conditionCount: {[key: string]: number} = {};
    let maxConditionCount = 0;
    
    this.trials.forEach(trial => {
      const condition = trial.condition || 'Unknown';
      conditionCount[condition] = (conditionCount[condition] || 0) + 1;
      
      if (conditionCount[condition] > maxConditionCount) {
        maxConditionCount = conditionCount[condition];
        this.summary.mostCommonCondition = condition;
      }
    });
    
    // Convert counts to percentages
    Object.keys(phaseCount).forEach(phase => {
      this.summary.phaseDistribution[phase] = {
        count: phaseCount[phase],
        percentage: (phaseCount[phase] / this.trials.length) * 100
      };
    });
    
    Object.keys(conditionCount).forEach(condition => {
      this.summary.conditionDistribution[condition] = {
        count: conditionCount[condition],
        percentage: (conditionCount[condition] / this.trials.length) * 100
      };
    });
  }
  
  getTopPhases(count: number): string[] {
    return Object.entries(this.summary.phaseDistribution)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, count)
      .map(entry => entry[0]);
  }
}