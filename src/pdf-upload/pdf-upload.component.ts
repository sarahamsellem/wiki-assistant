import {Component, inject, signal} from '@angular/core';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-pdf-upload',
  templateUrl: './pdf-upload.component.html',
  standalone: true
})
export class PdfUploadComponent {
  // Inject httpService
  private http = inject(HttpService);

  // Signals
  selectedFile = signal<File | null>(null);
  pdfText = signal<string>('');

  // Handle file input change
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile.set(input.files?.[0] ?? null);
  }

  // Upload PDF and get tasks
  uploadPdf() {
    const file = this.selectedFile();
    if (!file) return;

    this.http.uploadPdf(file).subscribe({
      next: (res) => {
        // Assuming http returns { tasks: Task[] }
        console.log(res);
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
        this.pdfText.set('Error uploading PDF.');
      },
    });
  }
}
