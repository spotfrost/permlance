import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'returnerrorfromjson'
})
export class ReturnerrorfromjsonPipe implements PipeTransform {

  transform(value: any={}) {
    if(value){
      return value.error;
    }
  }
}
