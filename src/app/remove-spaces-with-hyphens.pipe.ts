import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpacesWithHyphens'
})
export class RemoveSpacesWithHyphensPipe implements PipeTransform {

  transform(value: any, args: any) : any {
  return value = value.replace(/\s+/g, '-').toLowerCase();
  }

}
