import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-deals',
  imports: [MatCardModule, MatIconModule],
  template: `
    <h1>Сделки</h1>
    <mat-card>
      <mat-card-content>
        <div class="empty-state">
          <mat-icon>handshake</mat-icon>
          <p>Список сделок и калькулятор рассрочки появятся здесь в Фазе 3</p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px;
      color: var(--mat-sys-on-surface-variant);
      mat-icon { font-size: 48px; width: 48px; height: 48px; margin-bottom: 16px; }
    }
  `],
})
export class DealsComponent {}
