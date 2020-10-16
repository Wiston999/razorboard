import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hooksFilter'
})
export class HooksFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!filter) {
      return items;
    } else {
      const outputItems = items.filter(item => this.filterHook(item, filter));
      return outputItems;
    }
  }

  filterHook(hook, filter: string): boolean {
    if (hook.name.includes(filter)) {
      return true;
    }
    if (hook.hook_type && hook.hook_type.includes(filter)) {
      return true;
    }
    return false;
  }

}
