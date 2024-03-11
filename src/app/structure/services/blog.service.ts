import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateBlogDto } from '../entities/blog-create.dto';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
    private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  create(data:CreateBlogDto): Observable<any> {
    return this.http.post(`${this.apiUrl}blog`,data);
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}blog`);
  }
  searchBlogEntries(searchQuery: string) {
    return this.http.get<any[]>(`${this.apiUrl}blog/search`, {
      params: { search: searchQuery }
    });
  }
  
}
