import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertYesOrNo'
})
export class ConvertYesOrNoPipe implements PipeTransform {

  transform(value: number): any {
    if(value == 1){
      return "Oui";
    }
    else{
      return "Non"
    }
  }

}
