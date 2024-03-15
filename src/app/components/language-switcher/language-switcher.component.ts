import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent {
  supportedLanguages = [
    { name: 'English', code: 'en' },
    { name: 'العربية', code: 'ar' },
    // Add more languages as needed
  ];

  constructor(private _translate: TranslateService) {}

  switchLanguage(languageCode: any) {
    console.log(languageCode.value);
    
    this._translate.use(languageCode.value);
  }
}
