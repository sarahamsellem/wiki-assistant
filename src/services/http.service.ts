import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../pdf-upload/pdf-upload.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /**
   * Upload a PDF file to the backend.
   * @param file PDF File object
   * @returns Observable with server response
   */
  uploadPdf(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/upload-pdf`, formData);
  }

  createJiraTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/create-jira`);
  }

  /**
   * Simple GET example for root path
   */
  getRoot(): Observable<string> {
    return this.http.get(`${this.baseUrl}/`, { responseType: 'text' });
  }
}
