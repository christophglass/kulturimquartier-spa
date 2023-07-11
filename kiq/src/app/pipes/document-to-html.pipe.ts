import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';

@Pipe({
  name: 'documentToHtml'
})
export class DocumentToHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(documentToHtmlString(value as Document));
  }
}
