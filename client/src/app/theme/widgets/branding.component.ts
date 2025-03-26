import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="branding" href="/">
      <img src="images/matero.png" class="branding-logo" alt="logo" />
      @if (showName) {
        <div>
          <span class="branding-name"></span>
        </div>
      }
    </a>
  `,
  styles: `
    .branding {
      display: flex;
      align-items: center;
      margin: 0 0.5rem;
      text-decoration: none;
      white-space: nowrap;
      color: inherit;
      border-radius: 50rem;
    }

    .branding-logo {
      width: 8rem;
      height: 4rem;
      // border-radius: 50rem;
    }

    .branding-name {
      margin: 0 0.5rem;
      font-size: 1rem;
      font-weight: 500;
    }
  `,
  standalone: true,
})
export class BrandingComponent {
  @Input() showName = false;
}
