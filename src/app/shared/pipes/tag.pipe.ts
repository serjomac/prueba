import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagformart'
})
export class TagPipe implements PipeTransform {

  transform(value: string): any {
    return '#' + value;
  }

}
