import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hardSpace'
})
export class HardSpacePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    const replaceCallback = (match:string):string => {
      return ` ${match.trim()}&nbsp;`;
    }
     
    const re: any = /\s[a-zA-Z09]{1}\s/ig;
    const result: string = value.replace(re, replaceCallback);

    return `${result}`;
  }

}
