// export.service.ts
import { Injectable } from '@angular/core';

interface Trial {
  id: string;
  name: string;
  phase?: string;
  condition?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  /**
   * Converts trial data to CSV and triggers download
   * @param trials Array of trial objects
   * @param filename Name of the output file
   */
  exportToCSV(trials: Trial[], filename: string = 'clinical_trials'): void {
    if (!trials || trials.length === 0) {
      console.warn('No data to export');
      return;
    }

    // Define headers
    const headers = ['ID', 'Name', 'Phase', 'Medical Condition'];
    
    // Convert data to CSV rows
    const rows = trials.map(trial => {
      return [
        trial.id || '',
        this.escapeCSVValue(trial.name || ''),
        trial.phase || '',
        trial.condition || ''
      ];
    });
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Add timestamp to filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    const fullFilename = `${filename}_${timestamp}.csv`;
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fullFilename);
    link.style.visibility = 'hidden';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  /**
   * Export to JSON format
   * @param trials Array of trial objects
   * @param filename Name of the output file
   */
  exportToJSON(trials: Trial[], filename: string = 'clinical_trials'): void {
    if (!trials || trials.length === 0) {
      console.warn('No data to export');
      return;
    }
    
    const jsonContent = JSON.stringify(trials, null, 2);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    const fullFilename = `${filename}_${timestamp}.json`;
    
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fullFilename);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  /**
   * Escape special characters for CSV
   * @param value String to escape
   * @returns Escaped string
   */
  private escapeCSVValue(value: string): string {
    // If value contains comma, newline or double-quote, enclose in double-quotes
    if (/[",\n]/.test(value)) {
      // Replace double-quotes with two double-quotes
      value = value.replace(/"/g, '""');
      return `"${value}"`;
    }
    return value;
  }
}