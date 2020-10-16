import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'macAddr'
})
export class MacAddrPipe implements PipeTransform {

  transform(value: string, sep: string = ':'): string {
    return value.replace(/\W/g, sep);
  }

}
