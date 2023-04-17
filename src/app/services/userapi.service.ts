import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  apiurl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }
  private users: Users[] = [];
  
  getdata(): Observable<any> {
    return this.http.get<any>(this.apiurl);
  }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiurl);
  }

  postdata(user: any): Observable<any> {
    return this.http.post<any>(this.apiurl, user);
  }

  update(id: any, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/${id}`, user);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiurl}/${id}`);
  }
}
