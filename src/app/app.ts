import { Component } from '@angular/core';
import {PdfUploadComponent} from '../pdf-upload/pdf-upload.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    PdfUploadComponent,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
