import {Component, computed, inject, signal} from '@angular/core';
import {HttpService} from '../services/http.service';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';


export interface Task {
  summary: string;
  issue_type: string;
  description: string;
  custom_field_platform_product: string;
  fix_version: string;
  assignee: string;
  reporter: string;
  custom_field_baseline_estimate: number;
}

export interface ParsedResult {
  topic: string;
  tasks: Task[];
}

@Component({
  selector: 'app-pdf-upload',
  templateUrl: './pdf-upload.component.html',
  imports: [
    NgIf,
    JsonPipe,
    NgForOf
  ],
  standalone: true
})
export class PdfUploadComponent {
  // Inject httpService
  private http = inject(HttpService);

  // Signals
  selectedFile = signal<File | null>(null);
  pdfText = signal<string>('');
  loading = signal<boolean>(false);
  result = signal<ParsedResult | null>(null);
  selected = signal<Set<Task>>(new Set());

  selectedCount = computed(() => this.selected().size);


  // Handle file input change
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile.set(input.files?.[0] ?? null);
  }

  // Upload PDF and get tasks
  uploadPdf() {
    const file = this.selectedFile();
    if (!file) return;
    this.loading.set(true);
    this.http.uploadPdf(file).subscribe({
      next: (res) => {
        this.loading.set(false);
        // Assuming http returns { tasks: Task[] }
        const completionText = res?.results?.[0]?.completion;
        console.log(res);

        try {
          // Parse the inner stringified JSON
          const parsed = JSON.parse(completionText) as ParsedResult;
          this.result.set(parsed);
        } catch {
          // Fallback if not valid JSON
          this.result.set(completionText);
        }
        // if (res.tasks) {
        //   this.tasks.set(res.tasks);
        //   this.pdfText.set(
        //     res.tasks.map((t: Task) => `${t.title}: ${t.description}`).join('\n\n')
        //   );
        // } else {
        //   this.pdfText.set('No tasks returned from http.');
        //   this.tasks.set([]);
        // }
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
        this.pdfText.set('Error uploading PDF.');
      },
    });
  }

  toggleSelection(task: Task) {
    const current = new Set(this.selected());
    current.has(task) ? current.delete(task) : current.add(task);
    this.selected.set(current);
  }

  createJiraTasks() {
    const tasksToCreate = Array.from(this.selected());
    console.log('Creating Jira tasks:', tasksToCreate);
    this.http.createJiraTasks().subscribe({});
    // TODO: Send tasksToCreate to your backend endpoint for Jira creation

  }


  protected readonly navigator = navigator;
}
