import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'factsFilter'
})
export class FactsFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!filter) {
      return items;
    } else {
      filter = filter.toLowerCase();
      return items.filter(item => item.key.toLowerCase().includes(filter) || String(item.value).toLowerCase().includes(filter));
    }
  }
}
