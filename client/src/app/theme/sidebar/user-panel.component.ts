import { NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AuthService, User } from '@core/authentication';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel" routerLink="/profile/overview">
      <ng-container *ngIf="!imageError; else fallbackIcon">
          <img [src]="user.avatar" (error)="imageError = true" alt="avatar" width="64"/>
        </ng-container>
        <ng-template #fallbackIcon>
          <mat-icon >account_circle</mat-icon>
      </ng-template>
      <div class="matero-user-panel-info">
        <h4>{{ user.name }}</h4>
        <h5>{{ user.email }}</h5>
      </div>
    </div>
  `,
  styleUrl: './user-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatTooltipModule, TranslateModule,NgIf],
})
export class UserPanelComponent implements OnInit {
  private readonly auth = inject(AuthService);
  imageError: boolean = false;
  user!: User;

  ngOnInit(): void {
    this.auth.user().subscribe(user => (this.user = user));
  }
}
