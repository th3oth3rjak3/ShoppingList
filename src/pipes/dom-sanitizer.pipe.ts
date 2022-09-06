import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  constructor(private domSantizer: DomSanitizer) {
    
  }

  transform(html: string): SafeHtml {
    return this.domSantizer.bypassSecurityTrustHtml(html);
  }

}
