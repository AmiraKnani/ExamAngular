import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserApiService {
  private apiUrl = 'http://localhost:3000/Users';
  private users: Users[] = [];
  private currentUser: Users | undefined;

  constructor(private http: HttpClient) {}

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, user);
  }

  getUsers(): Users[] {
    return this.users;
  }

  authenticateUser(email: string, password: string): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        tap(users => {
          if (users && users.length > 0) {
            this.setCurrentUser(users[0]);
          }
        })
      );
  }

  getCurrentUser(): Users | undefined {
    return this.currentUser;
  }

  setCurrentUser(user: Users) {
    console.log('Setting current user:', user);
    this.currentUser = user;
    console.log('Current user:', this.currentUser);
  }
  
}
