import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlLineBreaks',
  standalone: true
})
export class HtmlLineBreaksPipe implements PipeTransform {

  transform(text: string): string {
    // Yangi qatorni <br /> tagiga almashtirish
    return text.replace(/\n/g, '<br />');
  }

}
