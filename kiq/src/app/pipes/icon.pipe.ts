import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'icon',
  standalone: false
})
export class IconPipe implements PipeTransform {

  private readonly iconMapping = {
    home: 'home',
    news: 'new_releases',
    termine: 'calendar_today',
    default: 'broken_image'
  };

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {    
    return this._transform(this.iconMapping[value.toLowerCase() as keyof typeof this.iconMapping] || this.iconMapping.default);    
  }

  private _transform(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(`<mat-icon aria-hidden="false" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-label="${icon} icon" fontIcon="${icon}"></mat-icon>`);
  }
}