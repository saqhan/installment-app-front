import { Injectable, signal } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';

export type Role = 'owner' | 'investor' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

const TOKEN_KEY = 'auth_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  constructor() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      const decoded = this.decodeToken(token);
      if (decoded) this._user.set(decoded);
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  login(email: string, _password: string): Observable<void> {
    // Mock: роль определяется по email пока нет бэкенда
    const role: Role = email.includes('owner')
      ? 'owner'
      : email.includes('investor')
        ? 'investor'
        : 'employee';
    const user: User = { id: '1', name: 'Demo User', email, role };
    const token = this.createMockToken(user);
    localStorage.setItem(TOKEN_KEY, token);
    this._user.set(user);
    return of(void 0).pipe(delay(400));
  }

  register(
    _inviteToken: string,
    name: string,
    email: string,
    _password: string,
  ): Observable<void> {
    // Mock: принимаем любой invite-токен
    const user: User = { id: '2', name, email, role: 'employee' };
    const token = this.createMockToken(user);
    localStorage.setItem(TOKEN_KEY, token);
    this._user.set(user);
    return of(void 0).pipe(delay(400));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this._user.set(null);
  }

  private createMockToken(user: User): string {
    const payload = btoa(JSON.stringify(user));
    return `mock.${payload}.signature`;
  }

  private decodeToken(token: string): User | null {
    try {
      const [, payload] = token.split('.');
      return JSON.parse(atob(payload)) as User;
    } catch {
      return null;
    }
  }
}
