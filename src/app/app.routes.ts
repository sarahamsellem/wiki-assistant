import { Routes } from '@angular/router';
import {PdfUploadComponent} from '../pdf-upload/pdf-upload.component';


export const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: 'upload', component: PdfUploadComponent },
];
