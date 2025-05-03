import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateLangService {
  private readonly translate = inject(TranslateService);
  private readonly settings = inject(SettingsService);

  load() {
    return new Promise<void>(resolve => {
      const browserLang = navigator.language;
      const defaultLang = 'fa-ir';//browserLang.match(/en-US|zh-CN|zh-TW|fa-ir/) ? browserLang : 'fa-ir';

      this.settings.setLanguage(defaultLang);
      this.translate.setDefaultLang(defaultLang);
      this.translate.use(defaultLang).subscribe({
        next: () => console.log(`Successfully initialized '${defaultLang}' language.'`),
        error: () => console.error(`Problem with '${defaultLang}' language initialization.'`),
        complete: () => resolve(),
      });
    });
  }
}
