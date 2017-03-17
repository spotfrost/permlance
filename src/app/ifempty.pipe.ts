import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ifempty'
})
export class IfemptyPipe implements PipeTransform {

  transform(value) {

    if(value){
      console.log('in if');
        if (value===undefined || value === null || value === '') {
              return '';
          }
          console.log('in else');
    }else{
    }
  }
}
