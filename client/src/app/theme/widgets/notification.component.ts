import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { VoicechatComponent } from 'app/voicechat/voicechat.component';

@Component({
  selector: 'app-notification',
  template: `
    <button mat-icon-button (click)="openChat()">
      <mat-icon matBadge="0" matBadgeColor="warn" aria-hidden="false" >notifications</mat-icon>
    </button>
  `,
  styles: `
    :host ::ng-deep .mat-badge-content {
      --mat-badge-background-color: #ef0000;
      --mat-badge-text-color: #fff;
    }
  `,
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatListModule, MatMenuModule],
})
export class NotificationComponent {
  private dialog = inject(MatDialog);
  openChat() {
    const dialogRef = this.dialog.open(VoicechatComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this GIS object?',
        username:"Scenario Manager"
      },
    });
  }
}
