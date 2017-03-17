import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitcharacters'
})
export class LimitcharactersPipe implements PipeTransform {

  transform(value: string, args: string) : string {
    let limit = args ? parseInt(args, 10) : 10;
    let trail = '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}
