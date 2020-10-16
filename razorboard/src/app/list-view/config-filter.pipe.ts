import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'configFilter'
})
export class ConfigFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!filter) {
      return items;
    } else {
      let outputItems = items.filter(item => this.filterConfig(item, filter));
      return outputItems;
    }
  }

  filterConfig(config, filter: string): boolean {
    if (config.name.includes(filter)){
      return true;
    }
    return false;
  }
}
